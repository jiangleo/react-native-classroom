/*
 * RN 中并没有一个 FontMetrics 之类的方法，可以提前获取文字的高度。
 * 通过该 getNumberOfLines 可以简单的计算出行数，但并不完全精确（目测 100 条 < 5 条 算错）。
 * 输入： str 要展示的字符串
 * 输入： fontSize 字体大小
 * 输入： width 展示容器的的宽度
 * 输出： NumberOfLines 字符串自然排列的行数
 * */

export default function getNumberOfLines(
  str: string,
  fontSize: number,
  width: number,
) {
  if (!str) {
    return 0;
  }
  return Math.ceil(getStrWidth(str, fontSize) / width);
}

function getStrWidth(str: string, fontSize: number) {
  const scale = fontSize / 17;
  const capitalWidth = 11 * scale;
  const lowerWidth = 8.6 * scale;
  const spaceWidth = 4 * scale;
  const numberWidth = 9.9 * scale;
  const chineseWidth = 17.3 * scale;

  const width = Array.from(str).reduce(
    (sum, char) =>
      sum +
      getCharWidth(char, {
        capitalWidth,
        lowerWidth,
        spaceWidth,
        numberWidth,
        chineseWidth,
      }),
    0,
  );

  // 0.1 个字算 1 个字
  return Math.ceil(width / fontSize) * fontSize;
}

interface ChartWidthType {
  capitalWidth: number;
  lowerWidth: number;
  spaceWidth: number;
  numberWidth: number;
  chineseWidth: number;
}

export function getCharWidth(
  char: string,
  {
    capitalWidth,
    lowerWidth,
    spaceWidth,
    numberWidth,
    chineseWidth,
  }: ChartWidthType,
) {
  let width;

  // 大写字母
  if (/[A-Z]/.test(char)) {
    width = capitalWidth;
    // 小写字母 和部分常见符号
  } else if (/([a-z]|[\u0021-\u002F])/.test(char)) {
    width = lowerWidth;
    // 数字
  } else if (/\d/.test(char)) {
    width = numberWidth;
    // 空格
  } else if (/\s/.test(char)) {
    width = spaceWidth;
    // 汉字或其他
  } else {
    width = chineseWidth;
  }

  return width;
}
