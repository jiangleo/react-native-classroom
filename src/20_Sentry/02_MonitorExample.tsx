// import * as Sentry from '@sentry/react-native';
import React, { ErrorInfo } from 'react';
import {Text, View} from 'react-native';
import MoniterSDK from './MonitorSDK';

const moniter = new MoniterSDK();

// https://github.com/getsentry/sentry-javascript/blob/master/packages/react/src/errorboundary.tsx
export default class MonitorExample extends React.Component<{}, {hasError: boolean ,renderError: boolean}> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {hasError: false, renderError: false};
  }

  // 渲染备用 UI
  static getDerivedStateFromError() {
    return {hasError: true};
  }

  // 打印错误信息
  componentDidCatch(error: Error, info: ErrorInfo) {
    moniter.logComponentStack(error, info);
  }

  render() {
    if (this.state.hasError)  return <Text>JSX 报错了</Text>;

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>herems: {(!!global.HermesInternal).toString()}</Text>
        <Text
          onPress={() => {
            throw new Error('My first Sentry error!2222');
          }}>
          throw js error
        </Text>
        <Text onPress={() =>{
            new Promise((resolve, reject) => {
              setTimeout(() => {
                reject(new Error('抛出 Promise 报错'));
              }, 0 );
            })
        }}>throw promise error</Text>
        <Text
          onPress={() => {
            this.setState({renderError: true});
          }}>
          throw JSX error
        </Text>
        {this.state.renderError && <div></div>}
      </View>
    );
  }
}
