// // Karma configuration
// // Generated on Tue Aug 13 2019 14:33:30 GMT+0800 (GMT+08:00)

// module.exports = function(config) {
//   config.set({
//     // base path that will be used to resolve all patterns (eg. files, exclude)
//     basePath: '',

//     // frameworks to use
//     // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
//     frameworks: ['mocha'],

//     // list of files / patterns to load in the browser
//     files: ['https://cdn.bootcss.com/jquery/2.2.4/jquery.js', 'node_modules/should/should.js', 'test/**.js'],

//     // list of files to exclude
//     exclude: [],

//     // preprocess matching files before serving them to the browser
//     // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
//     preprocessors: {},

//     // test results reporter to use
//     // possible values: 'dots', 'progress'
//     // available reporters: https://npmjs.org/browse/keyword/karma-reporter
//     reporters: ['progress'],

//     // web server port
//     port: 9876,

//     // enable / disable colors in the output (reporters and logs)
//     colors: true,

//     // level of logging
//     // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
//     logLevel: config.LOG_INFO,

//     // enable / disable watching file and executing tests whenever any file changes
//     autoWatch: true,

//     // start these browsers
//     // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
//     browsers: ['Chrome'],

//     // Continuous Integration mode
//     // if true, Karma captures browsers, runs the tests and exits
//     singleRun: false,

//     // Concurrency level
//     // how many browser should be started simultaneous
//     concurrency: Infinity,
//     plugins : [
//       'karma-chrome-launcher',
//       'karma-mocha',
//     ],
//   })
// }

const path = require('path');

let browsers = ['Chrome'];  
// trvis env

if (process.env.TRAVIS) {  
  browsers = ['Chrome_travis_ci'];
}


module.exports = function(config) {  
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      './tests/**/*.js'
    ],
    preprocessors: {
      // add webpack as preprocessor
      'src/**/*.js': ['webpack', 'sourcemap'],
      'tests/**/*.test.js': ['webpack', 'sourcemap']
    },
    // webpack file
    webpack: { 
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: path.resolve(__dirname, 'node_modules'),
            query: {
              presets: ['airbnb']
            }
          },
          {
            test: /\.json$/,
            loader: 'json',
          },
        ]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
    ],

    babelPreprocessor: {
      options: {
        presets: ['airbnb']
      }
    },
    // custom launchers 
    customLaunchers: {
        Chrome_travis_ci: {
            base: 'Chrome',
            flags: ['--no-sandbox']
        }
    },
    reporters: ['progress'],
    // port: 9002,
    logLevel: config.LOG_INFO,
    browsers: browsers,
    singleRun: false,
  })
};