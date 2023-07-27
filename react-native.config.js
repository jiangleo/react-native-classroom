module.exports = {
  project: {
    android: {
      // list of components that needs to be wrapped by the interop layer
      unstable_reactLegacyComponentNames: ['CustomView'],
    },
    ios: {
      // list of components that needs to be wrapped by the interop layer
      unstable_reactLegacyComponentNames: ['CustomView'],
    },
  },
};
