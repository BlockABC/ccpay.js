const pkg = require('./package.json')
module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: pkg.name,
      script: 'node_modules/.bin/webpack-dev-server',
      args: '--mode=production --config webpack.conf.js',
      instances: 1,
      watch: false,
      error_file: `logs/${pkg.name}.stderr.log'`,
      out_file: `logs/${pkg.name}.stdout.log`,
      log_date_format: 'MM-DD HH:mm:ss',
      env: {
        PORT: 9200
      }
    }
  ]
}
