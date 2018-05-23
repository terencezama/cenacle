'use strict';
import PropTypes from 'prop-types';
import { NativeModules, requireNativeComponent, View } from 'react-native';

var iface = {
  name: 'ChapterSelector',
  propTypes: {
    order: PropTypes.number,
    viewType: PropTypes.number,
    // indeterminate: PropTypes.bool,
    ...View.propTypes // include the default view properties
  },
};
var ProgressBar = requireNativeComponent('ChapterSelector', iface);

export default ProgressBar;