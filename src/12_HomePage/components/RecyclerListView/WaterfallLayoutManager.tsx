/***
 * Computes the positions and dimensions of items that will be rendered by the list. The output from this is utilized by viewability tracker to compute the
 * lists of visible/hidden item.
 */
import {Dimension, LayoutProvider} from 'recyclerlistview';
import CustomError from './CustomError';

export abstract class LayoutManager {
  public getOffsetForIndex(index: number): Point {
    const layouts = this.getLayouts();
    if (layouts.length > index) {
      return {x: layouts[index].x, y: layouts[index].y};
    } else {
      throw new CustomError({
        message: 'No layout available for index: ' + index,
        type: 'LayoutUnavailableException',
      });
    }
  }

  //You can ovveride this incase you want to override style in some cases e.g, say you want to enfore width but not height
  public getStyleOverridesForIndex(index: number): object | undefined {
    return undefined;
  }

  //Return the dimension of entire content inside the list
  public abstract getContentDimension(): Dimension;

  //Return all computed layouts as an array, frequently called, you are expected to return a cached array. Don't compute here.
  public abstract getLayouts(): Layout[];

  //RLV will call this method in case of mismatch with actual rendered dimensions in case of non deterministic rendering
  //You are expected to cache this value and prefer it over estimates provided
  //No need to relayout which RLV will trigger. You should only relayout when relayoutFromIndex is called.
  //Layout managers can choose to ignore the override requests like in case of grid layout where width changes
  //can be ignored for a vertical layout given it gets computed via the given column span.
  public abstract overrideLayout(index: number, dim: Dimension): boolean;

  //Recompute layouts from given index, compute heavy stuff should be here
  public abstract relayoutFromIndex(
    startIndex: number,
    itemCount: number,
  ): void;
}

export class WaterfallLayoutManager extends LayoutManager {
  private _layoutProvider: LayoutProvider;
  private _window: Dimension;
  private _totalHeight: number;
  private _totalWidth: number;
  private _isHorizontal: boolean;
  private _layouts: Layout[];

  constructor(
    layoutProvider: LayoutProvider,
    renderWindowSize: Dimension,
    isHorizontal: boolean = false,
    cachedLayouts?: Layout[],
  ) {
    super();
    this._layoutProvider = layoutProvider;
    this._window = renderWindowSize;
    this._totalHeight = 0;
    this._totalWidth = 0;
    this._isHorizontal = !!isHorizontal;
    this._layouts = cachedLayouts ? cachedLayouts : [];
  }

  public getContentDimension(): Dimension {
    return {height: this._totalHeight, width: this._totalWidth};
  }

  public getLayouts(): Layout[] {
    return this._layouts;
  }

  public getOffsetForIndex(index: number): Point {
    if (this._layouts.length > index) {
      return {x: this._layouts[index].x, y: this._layouts[index].y};
    } else {
      throw new CustomError({
        message: 'No layout available for index: ' + index,
        type: 'LayoutUnavailableException',
      });
    }
  }

  public overrideLayout(index: number, dim: Dimension): boolean {
    const layout = this._layouts[index];
    if (layout) {
      layout.isOverridden = true;
      layout.width = dim.width;
      layout.height = dim.height;
    }
    return true;
  }

  public setMaxBounds(itemDim: Dimension): void {
    if (this._isHorizontal) {
      itemDim.height = Math.min(this._window.height, itemDim.height);
    } else {
      itemDim.width = Math.min(this._window.width, itemDim.width);
    }
  }

  //TODO:Talha laziliy calculate in future revisions
  // startIndex：从第几个 item 开始有了更新，从这个 item 开始算，目的是为了减少计算量。默认：0
  // itemCount: 一共多个 item。
  // 以下注释只考虑垂直滚动，水平滚动同理。
  public relayoutFromIndex(startIndex: number, itemCount: number): void {
    // TODO: 性能优化
    // 每次都从头算，这样最简单。
    startIndex = 0;

    let startLeftY = 0; // 左边所有 item 的高度之和
    let startRightY = 0; // 右边所有 item 的高度之和

    let startX = 0; // 新增 item 的 X
    let startY = 0; // 新增 item 的 Y

    // 重新计算 scrollview 的高度
    this._totalHeight = 0;
    this._totalWidth = 0;

    const oldItemCount = this._layouts.length;
    // 初始化新 item 的宽高
    const itemDim = {height: 0, width: 0};

    let itemRect = null;
    let oldLayout = null;

    for (let i = startIndex; i < itemCount; i++) {
      // 旧 item 的layout（x/y/宽/高）
      oldLayout = this._layouts[i];
      // 调用 LayoutProvider 第一个入参函数
      // LayoutProvider( () => return 'type', fn2)
      const layoutType = this._layoutProvider.getLayoutTypeForIndex(i);
      // 在高度不确定的动态布局情况下，业务会开启 forceNonDeterministicRendering，此时 height、width 会计算两次，
      // 第一次取 LayoutProvider 第二个入参函数返回值（走 else），
      // 第二次 ViewRenderer _onViewContainerSizeChange 会调用 layoutManager 重写 height、width，这种情况下需要取重写的值。
      if (
        oldLayout &&
        oldLayout.isOverridden &&
        oldLayout.type === layoutType
      ) {
        itemDim.height = oldLayout.height;
        // 假设所有 Row 的宽度都是固定的，且 < 1/2 this._window.width
        itemDim.width = oldLayout.width;
      } else {
        // 调用 LayoutProvider 第二个入参函数，设置 itemDim
        // LayoutProvider(fn1,(type, itemDim, index) => { itemDim.height = 300;})
        this._layoutProvider.setComputedLayout(layoutType, itemDim, i);
      }

      if (itemDim.width <= this._window.width / 2) {
        // 在两列布局中，出去两列之外的剩余空间是三等分的
        const blankWidth = (this._window.width - itemDim.width * 2) / 3;

        // 保证一行中所有的 item 宽度之和不超过屏幕宽度，超过就换行
        if (startLeftY > startRightY) {
          startX = blankWidth * 2 + itemDim.width;
          startY = startRightY;
          startRightY += itemDim.height;
        } else {
          startX = blankWidth;
          startY = startLeftY;
          startLeftY += itemDim.height;
        }
      } else {
        // 一列布局中，是在 x=0 位置开始的（例如金刚区 + 瀑布流，金刚区是一列）
        startX = 0;
        startY = startLeftY;
        startLeftY += itemDim.height;
        startRightY += itemDim.height;
      }

      // 如果是 item 是新增的，在添加新的 layout
      if (i > oldItemCount - 1) {
        this._layouts.push({
          x: startX,
          y: startY,
          height: itemDim.height,
          width: itemDim.width,
          type: layoutType,
        });
        // 如果是 item 是已经渲染过一次的，已经记住原有 layout，重新赋值
      } else {
        itemRect = this._layouts[i];
        itemRect.x = startX;
        itemRect.y = startY;
        itemRect.type = layoutType;
        itemRect.width = itemDim.width;
        itemRect.height = itemDim.height;
      }
    }
    // 如果 list 的长度减少了，也就是商品数量减少了，
    if (oldItemCount > itemCount) {
      this._layouts.splice(itemCount, oldItemCount - itemCount);
    }
    // 设置 scrollview 的最终高度
    this._totalHeight = Math.max(startLeftY, startRightY);
    this._totalWidth = this._window.width;
  }

  private _pointDimensionsToRect(itemRect: Layout): void {
    if (this._isHorizontal) {
      this._totalWidth = itemRect.x;
    } else {
      this._totalHeight = itemRect.y;
    }
  }

  private _setFinalDimensions(maxBound: number): void {
    if (this._isHorizontal) {
      this._totalHeight = this._window.height;
      this._totalWidth += maxBound;
    } else {
      this._totalWidth = this._window.width;
      this._totalHeight += maxBound;
    }
  }

  private _locateFirstNeighbourIndex(startIndex: number): number {
    if (startIndex === 0) {
      return 0;
    }
    let i = startIndex - 1;
    for (; i >= 0; i--) {
      if (this._isHorizontal) {
        if (this._layouts[i].y === 0) {
          break;
        }
      } else if (this._layouts[i].x === 0) {
        break;
      }
    }
    return i;
  }

  private _checkBounds(
    itemX: number,
    itemY: number,
    itemDim: Dimension,
    isHorizontal: boolean,
  ): boolean {
    return isHorizontal
      ? itemY + itemDim.height <= this._window.height
      : itemX + itemDim.width <= this._window.width;
  }
}

export interface Layout extends Dimension, Point {
  isOverridden?: boolean;
  type: string | number;
}
export interface Point {
  x: number;
  y: number;
}
