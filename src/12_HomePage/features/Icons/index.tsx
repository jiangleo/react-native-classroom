import React, {useState} from 'react';
import {StyleSheet, ScrollView, Dimensions, View} from 'react-native';
import {useQuery} from 'react-query';
import {iconsUrl, queryIcons, IconType} from '../../api/homeAPI';

import Grid from '../../components/Grid';

export interface CateIconType extends IconType {
  icon: string;
  text: string;
  onPress: () => void;
}

export interface RecyclerIcons {
  width: number;
  height: number;
  type: string;
  icons: CateIconType[];
}

interface CateIconsProps {
  row: RecyclerIcons;
}

const CateIcons: React.FC<CateIconsProps> = ({row}) => {
  const [indicator, setIndicator] = useState(0);

  const {icons, height, width} = row;

  const wrapperStyle = {height, width};
  const indicatorHeight = 5;
  const gridStyle = [styles.wrapper, {height: height - indicatorHeight, width}];
  const indicatorStyle = [];

  return (
    <View style={wrapperStyle}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={({nativeEvent}) => {
          if (nativeEvent.contentOffset.x < windowWidth) {
            setIndicator(0);
          } else {
            setIndicator(1);
          }
        }}
        showsHorizontalScrollIndicator={false}>
        <Grid
          data={icons}
          column={5}
          style={gridStyle}
          itemStyle={styles.itemStyle}
          iconStyle={styles.iconStyle}
          textStyle={styles.textStyle}
        />
        <Grid
          data={icons}
          column={5}
          style={gridStyle}
          itemStyle={styles.itemStyle}
          iconStyle={styles.iconStyle}
          textStyle={styles.textStyle}
        />
      </ScrollView>
      <View style={styles.indicatorBox}>
        <View
          style={indicator === 0 ? styles.activeIndicator : styles.indicator}
        />
        <View
          style={indicator === 1 ? styles.activeIndicator : styles.indicator}
        />
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const wrapperHeight = 200;

// RecyclerListView 需要提前计算各种宽高
// 因为 queryRecyclerIcons 主要是计算 CateIcons 的宽高，把它们俩放在一个文件中更好维护。
export const queryRecyclerIcons = async (): Promise<RecyclerIcons> => {
  const data = await queryIcons();

  const cateIcons: CateIconType[] = data?.map(icon => ({
    // 转为 Grid 组件的格式
    ...icon,
    onPress: () => {},
    icon: icon.image,
    text: icon.title,
  }));

  // // 转换为 RecyclerListView 需要的格式

  return {
    icons: cateIcons,
    width: windowWidth,
    height: wrapperHeight,
    type: 'ICONS',
  };
};

const styles = StyleSheet.create({
  contentContainer: {
    marginVertical: 12,
  },
  wrapper: {
    width: windowWidth,
    height: wrapperHeight, // 注意： wrapper.height > iconStyle.height*2
  },
  itemStyle: {
    height: 80,
  },
  iconStyle: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 12,
    color: '#636363',
  },
  indicatorBox: {
    flexDirection: 'row',
    height: 5,
    alignSelf: 'center',
    transform: [{translateY: -18}],
  },
  indicator: {
    height: 5,
    marginHorizontal: 5,
    width: 8,
    backgroundColor: '#A9A9A9',
    borderRadius: 5,
  },
  activeIndicator: {
    height: 5,
    width: 15,
    backgroundColor: '#FF4C39',
    borderRadius: 5,
  },
});

export default CateIcons;
