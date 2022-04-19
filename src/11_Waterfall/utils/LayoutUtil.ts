import {LayoutProvider, GridLayoutProvider, Dimension, WrapGridLayoutManager, Layout} from 'recyclerlistview';
import {Dimensions} from 'react-native';
import { WaterfallLayoutProvider } from '../lib/RecyclerListView/WaterfallLayoutProvider'

const halfWindowWidth = Dimensions.get('window').width / 2;
export class LayoutUtil {
  static getWindowWidth() {
    // To deal with precision issues on android
    return Math.round(Dimensions.get('window').width * 1000) / 1000 - 6; //Adjustment for margin given to RLV;
  }

  static getLayoutProvider(type: number) {
    switch (type) {
      case 0:
        return new WaterfallLayoutProvider(
          index => {
            return index % 5 == 0 ? 'VSEL' : 'SECOND'; //Since we have just one view type
          },
          (type, dim, index) => {
            switch (type) {
              case 'VSEL':
                dim.width = halfWindowWidth;
                dim.height = ((index % 9) + 4) * 23;
                break;
              case 'SECOND':
                dim.width = halfWindowWidth;
                dim.height = ((index % 2) + 3) * 29;
                break;
              default:
                dim.width = halfWindowWidth;
                dim.height = 0;
            }
          },
        );
      case 1:
        return new WaterfallLayoutProvider(
          () => {
            return 'VSEL';
          },
          (type, dim) => {
            switch (type) {
              case 'VSEL':
                dim.width = halfWindowWidth;
                dim.height = 250;
                break;
              default:
                dim.width = halfWindowWidth;
                dim.height = 200;
            }
          },
        );
      case 2:
      default:
        return new WaterfallLayoutProvider(
          () => {
            return 'VSEL';
          },
          (type, dim) => {
            switch (type) {
              case 'VSEL':
                dim.width = halfWindowWidth;
                dim.height = 300;
                break;
              default:
                dim.width = halfWindowWidth;
                dim.height = 0;
            }
          },
        );
    }
  }
}
