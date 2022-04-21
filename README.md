本项目基于 React Native 0.68.0 版本开发，并通过命令或配置的方式开启了新架构。

启动本项目之前，请先按照[官方文档搭建环境](https://reactnative.cn/docs/environment-setup)。

**目前新架构还是预览版，仅供学习使用，请勿用于线上项目。**

# 启动方法

```
$ git clone https://github.com/jiangleo/react-native-classroom.git
$ cd react-native-classroom
$ yarn install
```

## 运行 iOS

需要 MacOS 和 Xcode

```
# 安装 iOS 依赖 
$ cd ios && RCT_NEW_ARCH_ENABLED=1 pod install && cd ../

# 在模拟器安装 App
$ yarn ios
```


## 运行 Android

```
yarn install-android-hermes
yarn android
```

Open the ReactNativeClassroom app in your emulator. If you want to use a physical device, run adb devices, then adb -s <device name> reverse tcp:8081 tcp:8081. See Running on Device for additional instructions on using a physical device.


## 已知问题

1. 动画或手势课程的 demo 中使用的 react-native-reanimated 找不到。

我在本地开发时遇到，在该项目中新架构和 react-native-reanimated 不能搭配一起使用，不然 iOS 就编译不通过，但老架构没问题， react-native-reanimated 官方提供的新架构 demo 跑起来也没有问题，目前没有定位到原因，所以先把 react-native-reanimated 库删了。
你可以参考 [react-native-reanimated 官方文档](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation) 自行安装。