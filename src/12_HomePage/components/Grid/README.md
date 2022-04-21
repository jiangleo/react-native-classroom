## 功能

老代码，先不用 TypeScript 重写了

基础功能：

- 宫格布局
- icon + text
- 回调点击

## 接口设计

| 属性       | 默认值 |                        类型                        | 说明                                         |
| :--------- | :----: | :------------------------------------------------: | :------------------------------------------- |
| data       |   []   |            Array<{icon, text, onPress}>            | 传入的菜单数据，包括 icon、文字、回调函数    |
| column     |   4    |                      `number`                      | 列数。(行数 = Math.ceil(data.length/column)) |
| style      |   -    |                     View.style                     | 外部容器的样式。                             |
| itemStyle  |   -    |                     View.style                     | 格子的样式                                   |
| iconStyle  |   -    |                     View.style                     | 格子 icon 的样式                             |
| textStyle  |   -    |                     View.style                     | 格子 text 的样式                             |
| renderItem |   -    | ({icon, text, onPress}, index, data) => React.node | 自定义渲染每个格子的内容                     |
