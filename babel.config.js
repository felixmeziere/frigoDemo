module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          App: './src/App',
          components: './src/components',
          environment: './src/environment',
          'redux/app': './src/redux/app',
          'redux/types': './src/redux/types',
          services: './src/services',
        },
      },
    ],
  ],
};
