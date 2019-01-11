'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_SERVER: '"/api"' //'"https://api.dev.ohmynest.com/api"'
})
