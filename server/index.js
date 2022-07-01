const { cwd, env: { NODE_ENV } = {} } = process;

if (NODE_ENV === 'development') {
  const Webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const webpackConfig = require('../webpack.config');
  const compiler = Webpack(webpackConfig);
  const devServerConfig = { ...webpackConfig.devServer, open: true };
  const server = new WebpackDevServer(devServerConfig, compiler);

  (async () => await server.start())();
} else {
  const cors = require('cors');
  const express = require('express');
  const server = express();

  server.use(cors());
  server.use(express.static('build'));
  server.get('/', (_, res) => {
    res.sendFile('build/index.html', { root: cwd() })
  });
  server.listen(3001, () => console.log('[INFO]: Server started on port 3001'));
}
