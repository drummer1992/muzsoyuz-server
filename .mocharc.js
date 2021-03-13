const mocha = require('mocha')

global.assert = require('assert')
global.faker = require('faker')
global.describe = mocha.describe
global.it = mocha.it
global.before = mocha.before
global.after = mocha.after

module.exports = {
  timeout: 20000,
  plugins: ['@babel/register'],
  file   : ['./test/helpers/global-hook'],
}