const configs = {
  development: {
    apiUrl: 'https://webapi.pixofarm.com/api',
    proxyUrl: 'https://cors-anywhere.herokuapp.com/',
    googleAnalytics: {
      trackingId: 'xxxx',
    },
    passwordLength: 10,
    passwordCharsString: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    googleMaps: {
      apiKey: 'AIzaSyC6Ymhf4-41lJD3dAWE3MVr8GI6BodCLjQ',
      defaultCenter: {
        lat: 58.28365,
        long: 12.28864
      },
      defaultZoom: 18
    },
    validate: {
      imageupload: {
        types: ['image/png', 'image/jpeg', 'image/gif'],
        sizemax: 150000,
      }
    }
  },
  staging: {
    apiUrl: 'https://webapi.pixofarm.com/api',
    googleAnalytics: {
      trackingId: 'xxxx',
    },
  },
  production: {
    apiUrl: 'https://webapi.pixofarm.com/api',
    proxyUrl: 'https://cors-anywhere.herokuapp.com/',
    googleAnalytics: {
      trackingId: 'xxxx',
    },
    passwordLength: 10,
    passwordCharsString: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  }
}

export const env = 'development'

// eslint-disable-next-line no-console
console.log(`Using environment "${env}".`)

export default configs[env]
