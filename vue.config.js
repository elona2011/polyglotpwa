module.exports = {
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the manifest options
    manifestOptions: {
      display: 'landscape',
      background_color: '#42B883'
      // ...other Manifest options...
    },

    // configure the workbox plugin
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   // swSrc is required in InjectManifest mode.
    //   swSrc: 'dev/sw.js',
    //   // ...other Workbox options...
    // }
  },
  devServer: {
    // port: 38157
    proxy: {
      '/db': {
        target: 'http://localhost:8081',
        secure: false
      }
    }
  }
}