import {  LayoutManager,  Layout, BaseLayoutProvider } from "recyclerlistview";
import { WaterfallLayoutManager } from './WaterfallLayoutManager';

export class WaterfallLayoutProvider extends BaseLayoutProvider {

    private _getLayoutTypeForIndex: (index: number) => string | number;
    private _setLayoutForType: (type: string | number, dim: Dimension, index: number) => void;
    private _tempDim: Dimension;
    private _lastLayoutManager: WaterfallLayoutManager | undefined;

    constructor(getLayoutTypeForIndex: (index: number) => string | number, setLayoutForType: (type: string | number, dim: Dimension, index: number) => void) {
        super();
        this._getLayoutTypeForIndex = getLayoutTypeForIndex;
        this._setLayoutForType = setLayoutForType;
        this._tempDim = { height: 0, width: 0 };
    }

    public newLayoutManager(renderWindowSize: Dimension, isHorizontal?: boolean, cachedLayouts?: Layout[]): LayoutManager {
        this._lastLayoutManager = new WaterfallLayoutManager(this as any, renderWindowSize, isHorizontal, cachedLayouts);
        return this._lastLayoutManager;
    }

    //Provide a type for index, something which identifies the template of view about to load
    public getLayoutTypeForIndex(index: number): string | number {
        return this._getLayoutTypeForIndex(index);
    }

    //Given a type and dimension set the dimension values on given dimension object
    //You can also get index here if you add an extra argument but we don't recommend using it.
    public setComputedLayout(type: string | number, dimension: Dimension, index: number): void {
        return this._setLayoutForType(type, dimension, index);
    }

    public checkDimensionDiscrepancy(dimension: Dimension, type: string | number, index: number): boolean {
        const dimension1 = dimension;
        this.setComputedLayout(type, this._tempDim, index);
        const dimension2 = this._tempDim;
        if (this._lastLayoutManager) {
            this._lastLayoutManager.setMaxBounds(dimension2);
        }
        return dimension1.height !== dimension2.height || dimension1.width !== dimension2.width;
    }
}

export interface Dimension {
    height: number;
    width: number;
}
