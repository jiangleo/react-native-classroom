import React from 'react';
import {
  Text,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import ICON_BASE64 from './ICON_BASE64';

// alert(require('./log.js').log);
alert(require('./dianxin.jpg'));
alert(require('./dianxin.jpg'));

export default function Images() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        {/* default image: use defaultSource. （ ios 可以使用 uri 图片, android 只能使用 native 图片，跨平台性差，因此不推荐使用） */}
        {/* base64 加载快， http 还需要再加载一次 */}
        <Text style={{fontSize: 30}}>default image: use defaultSource</Text>
        <Image
          style={{width: 200, height: 200}}
          source={require('./dianxin.jpg')}
          defaultSource={{uri: ICON_BASE64}}
        />
        <Image
          style={{width: 200, height: 200}}
          source={{
            uri: 'http://b-ssl.duitang.com/uploads/item/201812/05/20181205150834_uqkso.jpg',
          }}
          defaultSource={{uri: ICON_BASE64}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
