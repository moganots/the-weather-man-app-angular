export const environment = {
  production: true,
  api: {
    openweather: {
      apiKey: '14a89aa81928bfa773103434244f9cc7',
      protocol: 'https',
      host: 'api.openweathermap.org',
      port: null,
      relativePath: '/data/2.5/weather',
      queryPath: '?lat={lat}&lon={lon}&appid={apiKey}',
      iconUri: 'http://openweathermap.org/img/wn/{0}.png'
    }
  },
  localStorageBookmarks: 'weatherManBookmakrs'
};
