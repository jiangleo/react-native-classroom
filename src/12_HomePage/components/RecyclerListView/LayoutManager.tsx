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

export class WrapGridLayoutManager extends LayoutManager {
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
    // 有多个 item 并列的情况，因此需要找到非并列的上一个 item，从这个 item 开始计算。
    startIndex = this._locateFirstNeighbourIndex(startIndex);
    // 新 item x y 坐标
    let startX = 0;
    let startY = 0;
    let maxBound = 0;

    const startVal = this._layouts[startIndex];

    // 初始化新 item x y 坐标 = 上一个 item x y 坐标
    if (startVal) {
      startX = startVal.x;
      startY = startVal.y;
      // 初始化整体 scrollview 的高度
      this._pointDimensionsToRect(startVal);
    }

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
        itemDim.width = oldLayout.width;
      } else {
        // 调用 LayoutProvider 第二个入参函数，设置 itemDim
        // LayoutProvider(fn1,(type, itemDim, index) => { itemDim.width = 100;itemDim.height = 300;})
        this._layoutProvider.setComputedLayout(layoutType, itemDim, i);
      }
      // 保证当前 item 最大宽度不超过屏幕宽度
      this.setMaxBounds(itemDim);
      // 保证一行中所有的 item 宽度之和不超过屏幕宽度，超过就换行
      while (!this._checkBounds(startX, startY, itemDim, this._isHorizontal)) {
        if (this._isHorizontal) {
          startX += maxBound;
          startY = 0;
          this._totalWidth += maxBound;
        } else {
          startX = 0;
          startY += maxBound;
          this._totalHeight += maxBound;
        }
        maxBound = 0;
      }

      // 下一个 item 增加的 y 轴距离（如果是一行则不增加） = 当前一行最高 item 的高度
      // （当前一行会跳过 this._checkBounds && startY += maxBound，所以当前一行实际没有增加，只有下一行的 item 的 startY 会增加）
      maxBound = this._isHorizontal
        ? Math.max(maxBound, itemDim.width)
        : Math.max(maxBound, itemDim.height);

      //TODO: Talha creating array upfront will speed this up
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

      // 下一个 item 的初始化的 x 坐标
      if (this._isHorizontal) {
        startY += itemDim.height;
      } else {
        startX += itemDim.width;
      }
    }
    // 如果 list 的长度减少了，也就是商品数量减少了，
    if (oldItemCount > itemCount) {
      this._layouts.splice(itemCount, oldItemCount - itemCount);
    }
    // 设置 scrollview 的最终高度
    this._setFinalDimensions(maxBound);
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
