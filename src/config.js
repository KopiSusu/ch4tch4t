require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  gatewayHost: process.env.GATEWAYHOST || 'localhost',
  gatewayPort: process.env.GATEWAYPORT,
  app: {
    title: 'Ch4tCh4t',
    description: 'Search products, manage chats, create shopping carts all in real time within the messaging thread.',
    head: {
      titleTemplate: 'Ch4tCh4t: %s',
      meta: [
        {name: 'description', content: 'Search products, manage chats, create shopping carts all in real time within the messaging thread.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Ch4tCh4t'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Ch4tCh4t'},
        {property: 'og:description', content: 'Conversations, Sales, Marketing.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@kopisusu'},
        {property: 'og:creator', content: '@kopisusu'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
