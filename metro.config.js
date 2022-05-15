/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */


const Mcs = require('metro-code-split')

const mcs = new Mcs({
  output: {
    publicPath: 'https://a.cdn.com/a-rn-project',
  },
  dll: {
    entry: ['react-native', 'react'], // which three - party library into dll
    referenceDir: './public/dll', // the JSON address to reference for the build DLL file, also the npm run build:dllJson output directory
  },
  dynamicImports: {}, // DynamicImports can also be set to false to disable this feature if it is not required
})

const busineConfig = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
}

module.exports = process.env.NODE_ENV === 'production' ? mcs.mergeTo(busineConfig) : busineConfig

