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
$ cd ios && USE_HERMES=1 RCT_NEW_ARCH_ENABLE=1 pod install && cd ../

# 在模拟器安装 App
$ yarn ios
```

## 运行 Android

```
yarn install-android-hermes
yarn android
```

Open the ReactNativeClassroom app in your emulator. If you want to use a physical device, run adb devices, then adb -s <device name> reverse tcp:8081 tcp:8081. See Running on Device for additional instructions on using a physical device.


