import React, {Component, useMemo} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import {RecyclerListView, DataProvider} from 'recyclerlistview';
import {WaterfallLayoutProvider} from '../../components/RecyclerListView/WaterfallLayoutProvider';

import {useInfiniteQuery, useQuery} from 'react-query';

import {iconsUrl, animalsUrl} from '../../api/homeAPI';

import {
  queryRecyclerAnimals,
  RecyclerNFTs,
  RecyclerNFT,
  recyclerQueryOption,
} from '../WaterFallCard';

import {queryRecyclerIcons, RecyclerIcons} from '../Icons';
import RowRenderer from './RowRenderer';

const App: React.FC = () => {
  const {
    status,
    data: recyclerNFTs,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<RecyclerNFTs>(
    animalsUrl,
    queryRecyclerAnimals,
    recyclerQueryOption,
  );

  const {
    isLoading,
    isError,
    data: recyclerIcons,
    error,
  } = useQuery<RecyclerIcons>(iconsUrl, queryRecyclerIcons);

  // 格式处理
  const nfts = recyclerNFTs?.pages.reduce<RecyclerNFT[]>(
    (accumulator, page) => {
      return accumulator.concat(
        page.items.reduce<RecyclerNFT[]>((all, group) => all.concat(group), []),
      );
    },
    [],
  );

  // RLV 的模板代码
  let dp = new DataProvider((r1, r2) => {
    return r1 !== r2;
  });

  // 都请求回来时才渲染
  if (recyclerIcons && nfts) {
    dp = dp.cloneWithRows([recyclerIcons, ...nfts]);

    console.log('recyclerIcons', recyclerIcons);
  }

  // RLV 的模板代码
  const layoutProvider = new WaterfallLayoutProvider(
    index => dp.getDataForIndex(index).type,
    (type, dim, index) => {
      dim.width = dp.getDataForIndex(index).width;
      dim.height = dp.getDataForIndex(index).height;
    },
  );

  const Footer = () => (
    <Text style={styles.footer}>
      {isFetchingNextPage
        ? '加载中...'
        : hasNextPage
        ? '加载中...'
        : '没有数据了'}
    </Text>
  );

  if (status === 'error') {
    return <Text>你的服务跑丢了</Text>;
  }

  if (status === 'loading') {
    return <Text>正在加载中...</Text>;
  }

  return (
    <View style={styles.container}>
      {dp.getSize() > 0 ? (
        <RecyclerListView
          onEndReached={()=> status === 'idle' && fetchNextPage()}
          dataProvider={dp}
          layoutProvider={layoutProvider}
          rowRenderer={RowRenderer}
          renderFooter={Footer}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FAFAFA'},
  liked: {fontSize: 12},
  footer: {height: 50},
});

export default App;
