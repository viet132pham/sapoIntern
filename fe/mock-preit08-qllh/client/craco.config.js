const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // '@primary-color': '#cf1322',
              // '@link-color': '#cf1322', // link color
              // '@primary-color': '#28d38e',
              // '@link-color': '##28d38e', // link color
              "@success-color": "#52c41a", // success state color
              "@warning-color": "#faad14", // warning state color
              "@error-color": "#f5222d", // error state color
              "@table-row-hover-bg":"@shadow-color",
              // '@template-bg-color': '#00474f',
              // '@layout-header-background': '#f0f2f5',
              // '@layout-body-background': '#e6fffb',
              "@layout-trigger-background": "@layout-header-background",
              "@layout-footer-background": "@layout-header-background",
              // '@menu-dark-inline-submenu-bg': '#002329',
              // '@menu-collapsed-width': '40px !important',
              "@font-size-base": "14px", // major text font size
              "@heading-color": "rgba(0, 0, 0, 0.85)", // heading text color
              "@text-color": "rgba(0, 0, 0, 0.65)", // major text color
              "@text-color-secondary": "rgba(0, 0, 0, 0.45)", // secondary text color
              "@disabled-color": "rgba(0, 0, 0, 0.25)", // disable state color
              "@border-radius-base": "6px", // major border radius
              "@border-color-base": "#d9d9d9", // major border color
              "@box-shadow-base":
                "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)", // major shadow for layers
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
