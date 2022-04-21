import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {FetchInfiniteQueryOptions} from 'react-query';

import {queryAnimals, NFTType, NFTQueryType} from '../../api/homeAPI';
import getNumberOfLine from '../../utils/getNumberOfLine';

export interface RecyclerNFT extends NFTType {
  screenImageHeight: number;
  screenImageWidth: number;
  numberOfLines: number;
  likedStr: string;
  width: number;
  height: number;
  type: string;
}

export interface RecyclerNFTs extends NFTQueryType {
  items: RecyclerNFT[];
}

interface WaterFallProps {
  row: RecyclerNFT;
}

const WaterFallCard: React.FC<WaterFallProps> = ({row}) => {
  const {screenImageHeight, screenImageWidth, numberOfLines} = row;

  // 一个 Row 的 height = 图片高度 + 图片和标题的间距 + numberOfLines*文字行高 + 标题和名字的间距 + 名字行高 + 名字和底部的间距 + 两个Row的上下间距
  return (
    <View style={styles.row}>
      <Image
        style={[
          styles.image,
          {
            width: screenImageWidth,
            height: screenImageHeight,
          },
        ]}
        source={{
          uri: row.image,
        }}
      />
      <Text numberOfLines={numberOfLines} style={styles.title}>
        {row.motto}
      </Text>
      <View style={styles.nameBox}>
        <Text style={styles.name}>{row.name}</Text>
        <Text style={styles.liked}>❤{row.likedStr}</Text>
      </View>
    </View>
  );
};

export const recyclerQueryOption: FetchInfiniteQueryOptions<RecyclerNFTs> = {
  // determining if there is more data to load and the information to fetch it
  getPreviousPageParam: firstPage => firstPage.requestId ?? false,
  getNextPageParam: lastPage => lastPage.requestId ?? false,
};

// RecyclerListView 需要提前计算各种宽高
// 因为 queryRecyclerAnimals 主要是计算 RowRender 的宽高，把它们俩放在一个文件中更好维护。
export const queryRecyclerAnimals = async ({pageParam = 0}) => {
  const data = await queryAnimals({pageParam});

  const items = data.items.map((item: any, index: number) => {
    // mock: 从服务端获取宽高
    const imageWidth = halfWindowWidth + ((index % 9) + 4);
    const imageHeight = ((index % 9) + 4) * 20;

    const width = (windowWidth - 3 * blankSpace) / 2;
    const titleWidth = width - titleSize * 2;

    // 最多 2 行
    const numberOfLines = Math.min(
      getNumberOfLine(item.motto, titleSize, titleWidth),
      2,
    );

    // 一个 Row 的 height = 图片高度 + 图片和标题的间距 + numberOfLines*文字行高 + 标题和名字的间距 + 名字行高 + 名字和底部的间距 + 两个Row的上下间距
    const screenImageHeight = (width * imageHeight) / imageWidth;
    const height =
      screenImageHeight +
      VerticalSpace +
      numberOfLines * titleLineHeight +
      VerticalSpace +
      titleSize +
      VerticalSpace +
      blankSpace;

    const likedStr =
      item.liked < 1000
        ? item.liked.toString()
        : Math.round(item.liked / 1000).toString() + 'k';

    return {
      ...item,
      screenImageHeight,
      screenImageWidth: width,
      width,
      height,
      numberOfLines,
      likedStr,
      type: 'CARD', // 瀑布流卡片
    };
  });
  return {...data, items};
};

const halfWindowWidth = Dimensions.get('window').width / 2;
const windowWidth = Dimensions.get('window').width;
const blankSpace = 8;
const titleSize = 14;
const titleLineHeight = 20;
const VerticalSpace = 12;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    backgroundColor: '#FFF',
    marginBottom: blankSpace,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    backgroundColor: '#0ca',
    marginBottom: VerticalSpace,
  },
  title: {
    fontWeight: 'bold',
    fontSize: titleSize,
    lineHeight: titleLineHeight,
    marginHorizontal: titleSize,
    marginBottom: VerticalSpace,
  },
  nameBox: {flexDirection: 'row', marginHorizontal: titleSize},
  name: {flex: 1, fontSize: 12},
  liked: {fontSize: 12},
});

export default WaterFallCard;
