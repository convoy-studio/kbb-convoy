const sassVars = require('!!sass-variables!../app/style/global/_variables.scss') // import the variables from scss
const protocol = location.protocol

export default {
  PAGE_ASSETS_LOADED: 'PAGE_ASSETS_LOADED',
  APP_START: 'APP_START',
  FILL_APP_WITH_INITIAL_DATA: 'FILL_APP_WITH_INITIAL_DATA',
  ADD_TO_CANVAS: 'ADD_TO_CANVAS',
  REMOVE_FROM_CANVAS: 'REMOVE_FROM_CANVAS',
  START_TICKER: 'START_TICKER',
  STOP_TICKER: 'STOP_TICKER',
  SIDE_BAR_WIDTH: parseInt(sassVars.SIDE_BAR_WIDTH, 10),
  ICON_WIDTH: parseInt(sassVars.ICON_WIDTH, 10),
  ICON_HEIGHT: parseInt(sassVars.ICON_HEIGHT, 10),
  OVERALL_MARGIN: parseInt(sassVars.OVERALL_MARGIN, 10),
  MEDIA_GLOBAL_W: parseInt(sassVars.MEDIA_GLOBAL_W, 10),
  MEDIA_GLOBAL_H: parseInt(sassVars.MEDIA_GLOBAL_H, 10),
  MQ_XXSMALL: parseInt(sassVars.MQ_XXSMALL, 10),
  MQ_XSMALL: parseInt(sassVars.MQ_XSMALL, 10),
  MQ_SMALL: parseInt(sassVars.MQ_SMALL, 10),
  MQ_MEDIUM: parseInt(sassVars.MQ_MEDIUM, 10),
  MQ_LARGE: parseInt(sassVars.MQ_LARGE, 10),
  MQ_XLARGE: parseInt(sassVars.MQ_XLARGE, 10),
  MQ_XXLARGE: parseInt(sassVars.MQ_XXLARGE, 10),
  BASE_WIDTH: parseInt(sassVars.MQ_XLARGE, 10),

  ENVIRONMENTS: {
    DEV: 'http://localhost:3000/',
    PROD: 'http://localhost:3000/'
  }
}
