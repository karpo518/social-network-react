const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#f2242e', '@layout-header-height': '55px' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};