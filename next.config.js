// next.config.js
module.exports = {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.(mp3|wav|m4a)$/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/audio/",
            outputPath: "static/audio/",
            name: "[name].[ext]",
          },
        },
      });
      return config;
    },
  };