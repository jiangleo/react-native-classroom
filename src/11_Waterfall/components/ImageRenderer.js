import React from 'react';
import {Image, Platform, View} from 'react-native';

const isIOS = Platform.OS === 'ios';

export class ImageRenderer extends React.Component {
  shouldComponentUpdate(newProps) {
    return this.props.imageUrl !== newProps.imageUrl;
  }
  componentWillUpdate() {
    //On iOS while recycling till the new image is loaded the old one remains visible. This forcefully hides the old image.
    //It is then made visible onLoad
    // 新架构这段代码跑不起来。
    if (isIOS && this.imageRef) {
      this.imageRef.setNativeProps({
        opacity: 0,
      });
    }
  }
  handleOnLoad = () => {
    // 新架构这段代码跑不起来。
    if (isIOS && this.imageRef) {
      this.imageRef.setNativeProps({
        opacity: 1,
      });
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          margin: 3,
          backgroundColor: 'lightgrey',
        }}>
        <Image
          ref={ref => {
            this.imageRef = ref;
          }}
          style={{
            flex: 1,
          }}
          onLoad={this.handleOnLoad}
          source={{uri: this.props.imageUrl}}
        />
      </View>
    );
  }
}
