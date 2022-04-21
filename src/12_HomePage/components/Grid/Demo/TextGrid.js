import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';

import Grid from '../index';

export default class NormalGrid extends Component {
  static defaultProps = {
    data: [
      {
        text: '招聘',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
      {
        text: '房产',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
      {
        text: '二手车新车',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
      {
        text: '二手',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
      {
        text: '宠物',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
      {
        text: '兼职',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
      {
        text: '本地',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
      {
        text: '家政',
        onPress: ({icon, text}, index, data) =>
          console.log(icon, text, index, data),
      },
    ],
  };

  render() {
    return (
      <View>
        <Grid data={this.props.data} />
      </View>
    );
  }
}
