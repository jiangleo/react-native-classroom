import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  ViewPropTypes,
  Image,
  TouchableHighlight,
  Text,
  Platform,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

export default class Grid extends PureComponent {
  static propTypes = {
    /**
     * 传入的菜单数据，包括 icon、文字、点击回调函数
     */
    data: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        text: PropTypes.string,
        onPress: PropTypes.func,
      }),
    ),
    /**
     * 列数。(行数 =  Math.ceil(data.length/column))
     */
    column: PropTypes.number,
    /**
     * 外部容器的样式
     */
    style: ViewPropTypes.style,
    /**
     * 每个格子的样式
     */
    itemStyle: ViewPropTypes.style,
    /**
     * 格子 icon 的样式
     */
    iconStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    /**
     * 格子 text 的样式
     */
    textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    /**
     * 自定义渲染每个格子的内容
     */
    renderItem: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    column: 4,
  };

  handleItemPress({icon, text, onPress}, index, data) {
    return () => onPress({icon, text}, index, data);
  }

  renderItem = ({icon, text, onPress}, index, data) => {
    const {itemStyle, iconStyle, textStyle, column} = this.props;
    const width = Dimensions.get('window').width / column;
    const height = icon ? 150 / 2 : 80 / 2;

    return (
      <TouchableHighlight
        key={index}
        activeOpacity={1}
        underlayColor={'#f5f5f5'}
        onPress={this.handleItemPress({icon, text, onPress}, index, data)}>
        <View style={[styles.item, {width, height}, itemStyle]}>
          {icon && (
            <Image style={[styles.icon, iconStyle]} source={{uri: icon}} />
          )}
          <Text style={[styles.text, textStyle]}>{text}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const {data, style, renderItem} = this.props;
    const items = data.map(renderItem || this.renderItem);

    return <View style={[styles.wrapper, style]}>{items}</View>;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: Dimensions.get('window').width / 4,
    height: 150 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 76 / 2,
    height: 76 / 2,
    marginBottom: 10 / 2,
  },
  text: {
    height: 24 / 2,
    fontSize: 24 / 2,
    color: '#333333',
  },
});
