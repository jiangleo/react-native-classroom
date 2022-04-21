import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';

import Grid from '../index';

export default class NormalGrid extends Component {
  static defaultProps = {
    data: [
      {
        // url or base64
        icon: 'http://placeimg.com/640/480/animals',
        text: '招聘',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
      {
        icon: 'http://placeimg.com/640/480/animals',
        text: '房产',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
      {
        icon: 'http://placeimg.com/640/480/animals',
        text: '二手车新车',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
      {
        icon: 'http://placeimg.com/640/480/animals',
        text: '二手',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
      {
        icon: 'http://placeimg.com/640/480/animals',
        text: '宠物',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
      {
        icon: 'http://placeimg.com/640/480/animals',
        text: '兼职',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
      {
        icon: 'http://placeimg.com/640/480/animals',
        text: '本地',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
    ],
  };

  render() {
    return (
      <View>
        <Grid
          data={this.props.data}
          column={5}
          style={styles.wrapper}
          itemStyle={styles.itemStyle}
          iconStyle={styles.iconStyle}
          textStyle={styles.textStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemStyle: {
    height: 200 / 2,
  },
  iconStyle: {
    width: 50 / 2,
    height: 50 / 2,
  },
  textStyle: {
    color: '#0ac',
  },
});
