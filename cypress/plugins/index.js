const dotenvPlugin = require('cypress-dotenv');

const dotenv = require('dotenv')

const dotEnvConfig = dotenv.config();

module.exports = (on, config) => {
  config = dotenvPlugin(config, dotEnvConfig, true)
  return config
}