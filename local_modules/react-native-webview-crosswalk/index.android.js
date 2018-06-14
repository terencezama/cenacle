'use strict';

import React, { Component } from 'react';
import ReactNative, { requireNativeComponent, View } from 'react-native';
import PropTypes from 'prop-types'

var {
    // addons: { PureRenderMixin },
    NativeModules: { UIManager, CrosswalkWebViewManager: { JSNavigationScheme } }
} = ReactNative;

var resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');

var WEBVIEW_REF = 'crosswalkWebView';
var NativeCrosswalkWebView = requireNativeComponent('CrosswalkWebView', CrosswalkWebView, {
    nativeOnly: {
        messagingEnabled: PropTypes.bool,
    },
});

class CrosswalkWebView extends Component {


    static defaultProps = { localhost: false }

    static propTypes = {
        injectedJavaScript: PropTypes.string,
        localhost: PropTypes.bool.isRequired,
        onError: PropTypes.func,
        onMessage: PropTypes.func,
        onNavigationStateChange: PropTypes.func,
        onProgress: PropTypes.func,
        source: PropTypes.oneOfType([
            PropTypes.shape({
                uri: PropTypes.string,  // URI to load in WebView
            }),
            PropTypes.shape({
                html: PropTypes.string, // static HTML to load in WebView
            }),
            PropTypes.number,           // used internally by React packager
        ]),
        url: PropTypes.string,
        ...View.propTypes
    }
    render() {
        var source = this.props.source || {};
        if (this.props.url) {
            source.uri = this.props.url;
        }
        var nativeProps = Object.assign({}, this.props, {
            messagingEnabled: typeof this.props.onMessage === 'function',
            onCrosswalkWebViewNavigationStateChange: this.onNavigationStateChange,
            onCrosswalkWebViewError: this.onError,
            onCrosswalkWebViewProgress: this.onProgress
        });
        return (
            <NativeCrosswalkWebView
                {...nativeProps}
                ref={WEBVIEW_REF}
                source={resolveAssetSource(source)}
            />
        );
    }
    getWebViewHandle() {
        return ReactNative.findNodeHandle(this.refs[WEBVIEW_REF]);
    }
    onNavigationStateChange = (event) => {
        var { onNavigationStateChange } = this.props;
        if (onNavigationStateChange) {
            onNavigationStateChange(event.nativeEvent);
        }
    }
    onError = (event) => {
        var { onError } = this.props;
        if (onError) {
            onError(event.nativeEvent);
        }
    }
    onProgress = (event) => {
        var { onProgress } = this.props;
        if (onProgress) {
            onProgress(event.nativeEvent.progress / 100);
        }
    }
    goBack() {
        UIManager.dispatchViewManagerCommand(
            this.getWebViewHandle(),
            UIManager.CrosswalkWebView.Commands.goBack,
            null
        );
    }
    goForward() {
        UIManager.dispatchViewManagerCommand(
            this.getWebViewHandle(),
            UIManager.CrosswalkWebView.Commands.goForward,
            null
        );
    }
    reload() {
        UIManager.dispatchViewManagerCommand(
            this.getWebViewHandle(),
            UIManager.CrosswalkWebView.Commands.reload,
            null
        );
    }
    postMessage = (data) => {
        UIManager.dispatchViewManagerCommand(
            this.getWebViewHandle(),
            UIManager.CrosswalkWebView.Commands.postMessage,
            [String(data)]
        );
    }

    onMessage = (event) => {
        var { onMessage } = this.props;
        onMessage && onMessage(event);
    }
}




export default CrosswalkWebView;
