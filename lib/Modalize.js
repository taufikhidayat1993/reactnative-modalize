"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var utils_1 = require("./utils");
var Modalize_styles_1 = require("./Modalize.styles");
var StatusBarManager = react_native_1.NativeModules.StatusBarManager;
var screenHeight = react_native_1.Dimensions.get('window').height;
var AnimatedKeyboardAvoidingView = react_native_1.Animated.createAnimatedComponent(react_native_1.KeyboardAvoidingView);
var AnimatedFlatList = react_native_1.Animated.createAnimatedComponent(react_native_1.FlatList);
var AnimatedSectionList = react_native_1.Animated.createAnimatedComponent(react_native_1.SectionList);
var THRESHOLD = 150;
var Modalize = /** @class */ (function (_super) {
    __extends(Modalize, _super);
    function Modalize(props) {
        var _this = _super.call(this, props) || this;
        _this.snaps = [];
        _this.beginScrollYValue = 0;
        _this.contentAlreadyCalculated = false;
        _this.beginScrollY = new react_native_1.Animated.Value(0);
        _this.dragY = new react_native_1.Animated.Value(0);
        _this.translateY = new react_native_1.Animated.Value(screenHeight);
        _this.modal = React.createRef();
        _this.modalChildren = React.createRef();
        _this.modalContentView = React.createRef();
        _this.contentView = React.createRef();
        _this.modalOverlay = React.createRef();
        _this.modalOverlayTap = React.createRef();
        _this.willCloseModalize = false;
        _this.open = function () {
            var _a = _this.props, adjustToContentHeight = _a.adjustToContentHeight, onOpen = _a.onOpen;
            if (onOpen) {
                onOpen();
            }
            if (!adjustToContentHeight || _this.contentAlreadyCalculated) {
                _this.onAnimateOpen();
            }
            else {
                _this.setState({ isVisible: true });
            }
        };
        _this.close = function () {
            var onClose = _this.props.onClose;
            if (onClose) {
                onClose();
            }
            _this.onAnimateClose();
        };
        _this.scrollTo = function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.contentView.current) {
                (_a = _this.contentView.current.getNode()).scrollTo.apply(_a, args);
            }
        };
        _this.onAnimateOpen = function (alwaysOpen) {
            var _a = _this.props, onOpened = _a.onOpened, snapPoint = _a.snapPoint, useNativeDriver = _a.useNativeDriver, openAnimationConfig = _a.openAnimationConfig;
            var _b = openAnimationConfig, timing = _b.timing, spring = _b.spring;
            var _c = _this.state, overlay = _c.overlay, modalHeight = _c.modalHeight;
            var toValue = alwaysOpen ? modalHeight - alwaysOpen : snapPoint ? modalHeight - snapPoint : 0;
            react_native_1.BackHandler.addEventListener('hardwareBackPress', _this.onBackPress);
            _this.setState({
                isVisible: true,
                showContent: true,
            });
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(overlay, {
                    toValue: alwaysOpen ? 0 : 1,
                    duration: timing.duration,
                    easing: react_native_1.Easing.ease,
                    useNativeDriver: useNativeDriver,
                }),
                react_native_1.Animated.spring(_this.translateY, __assign({}, utils_1.getSpringConfig(spring), { toValue: toValue,
                    useNativeDriver: useNativeDriver })),
            ]).start(function () {
                if (onOpened) {
                    onOpened();
                }
            });
        };
        _this.onAnimateClose = function () {
            var _a = _this.props, onClosed = _a.onClosed, useNativeDriver = _a.useNativeDriver, snapPoint = _a.snapPoint, closeAnimationConfig = _a.closeAnimationConfig;
            var timing = closeAnimationConfig.timing;
            var overlay = _this.state.overlay;
            var lastSnap = snapPoint ? _this.snaps[1] : 0;
            react_native_1.BackHandler.removeEventListener('hardwareBackPress', _this.onBackPress);
            _this.beginScrollYValue = 0;
            _this.beginScrollY.setValue(0);
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(overlay, {
                    toValue: 0,
                    duration: timing.duration,
                    easing: react_native_1.Easing.ease,
                    useNativeDriver: useNativeDriver,
                }),
                react_native_1.Animated.timing(_this.translateY, {
                    duration: timing.duration,
                    easing: react_native_1.Easing.out(react_native_1.Easing.ease),
                    toValue: screenHeight,
                    useNativeDriver: useNativeDriver,
                }),
            ]).start(function () {
                if (onClosed) {
                    onClosed();
                }
                _this.setState({ showContent: false });
                _this.translateY.setValue(screenHeight);
                _this.dragY.setValue(0);
                _this.willCloseModalize = false;
                _this.setState({
                    lastSnap: lastSnap,
                    isVisible: false,
                });
            });
        };
        _this.onContentViewLayout = function (_a) {
            var nativeEvent = _a.nativeEvent;
            var _b = _this.props, adjustToContentHeight = _b.adjustToContentHeight, snapPoint = _b.snapPoint;
            var _c = _this.state, contentHeight = _c.contentHeight, modalHeight = _c.modalHeight;
            if (!adjustToContentHeight ||
                modalHeight <= nativeEvent.layout.height ||
                snapPoint ||
                _this.contentAlreadyCalculated) {
                if (modalHeight <= nativeEvent.layout.height) {
                    _this.onAnimateOpen();
                }
                return;
            }
            // @todo: modalHeight should be equal to the nativeEvent's height,
            // and not to the state's value which is 0 at the first mount
            _this.setState({
                contentHeight: nativeEvent.layout.height,
                modalHeight: contentHeight - _this.handleHeight,
            }, function () {
                _this.contentAlreadyCalculated = true;
                _this.onAnimateOpen();
            });
        };
        _this.onContentViewChange = function (keyboardHeight) {
            var adjustToContentHeight = _this.props.adjustToContentHeight;
            var _a = _this.state, contentHeight = _a.contentHeight, modalHeight = _a.modalHeight, headerHeight = _a.headerHeight, footerHeight = _a.footerHeight;
            var contentViewHeight = [];
            if (keyboardHeight) {
                var statusBarHeight = utils_1.isIphoneX() ? 48 : utils_1.isIos() ? 20 : StatusBarManager.HEIGHT;
                var height = screenHeight - keyboardHeight - headerHeight - footerHeight - _this.handleHeight - statusBarHeight;
                if (contentHeight > height) {
                    contentViewHeight.push({ height: height });
                    _this.setState({ keyboardEnableScroll: true });
                }
            }
            else if (!adjustToContentHeight) {
                var height = modalHeight - headerHeight - footerHeight;
                contentViewHeight.push({ height: height });
                _this.setState({ keyboardEnableScroll: false });
            }
            _this.setState({ contentViewHeight: contentViewHeight });
        };
        _this.onHandleComponent = function (_a) {
            var nativeEvent = _a.nativeEvent;
            if (nativeEvent.oldState === react_native_gesture_handler_1.State.BEGAN) {
                _this.beginScrollY.setValue(0);
            }
            _this.onHandleChildren({ nativeEvent: nativeEvent });
        };
        _this.onHandleChildren = function (_a) {
            var nativeEvent = _a.nativeEvent;
            var _b = _this.props, snapPoint = _b.snapPoint, useNativeDriver = _b.useNativeDriver, adjustToContentHeight = _b.adjustToContentHeight, alwaysOpen = _b.alwaysOpen, closeAnimationConfig = _b.closeAnimationConfig;
            var timing = closeAnimationConfig.timing;
            var _c = _this.state, lastSnap = _c.lastSnap, contentHeight = _c.contentHeight, modalHeight = _c.modalHeight, overlay = _c.overlay;
            var velocityY = nativeEvent.velocityY, translationY = nativeEvent.translationY;
            _this.setState({ enableBounces: _this.beginScrollYValue > 0 || translationY < 0 });
            if (nativeEvent.oldState === react_native_gesture_handler_1.State.ACTIVE) {
                var toValue = translationY - _this.beginScrollYValue;
                var destSnapPoint_1 = 0;
                if (snapPoint || alwaysOpen) {
                    var dragToss = 0.05;
                    var endOffsetY_1 = lastSnap + toValue + dragToss * velocityY;
                    _this.snaps.forEach(function (snap) {
                        var distFromSnap = Math.abs(snap - endOffsetY_1);
                        if (distFromSnap < Math.abs(destSnapPoint_1 - endOffsetY_1)) {
                            destSnapPoint_1 = snap;
                            _this.willCloseModalize = false;
                            if (alwaysOpen) {
                                destSnapPoint_1 = modalHeight - alwaysOpen;
                            }
                            if (snap === _this.snapEnd && !alwaysOpen) {
                                _this.willCloseModalize = true;
                                _this.close();
                            }
                        }
                    });
                }
                else if (translationY > (adjustToContentHeight ? contentHeight / 3 : THRESHOLD) &&
                    _this.beginScrollYValue === 0 &&
                    !alwaysOpen) {
                    _this.willCloseModalize = true;
                    _this.close();
                }
                if (_this.willCloseModalize) {
                    return;
                }
                _this.setState({ lastSnap: destSnapPoint_1 });
                _this.translateY.extractOffset();
                _this.translateY.setValue(toValue);
                _this.translateY.flattenOffset();
                _this.dragY.setValue(0);
                if (alwaysOpen) {
                    react_native_1.Animated.timing(overlay, {
                        toValue: Number(destSnapPoint_1 <= 0),
                        duration: timing.duration,
                        easing: react_native_1.Easing.ease,
                        useNativeDriver: useNativeDriver,
                    }).start();
                }
                react_native_1.Animated.spring(_this.translateY, {
                    tension: 50,
                    friction: 12,
                    velocity: velocityY,
                    toValue: destSnapPoint_1,
                    useNativeDriver: useNativeDriver,
                }).start();
            }
        };
        _this.onHandleOverlay = function (_a) {
            var nativeEvent = _a.nativeEvent;
            if (nativeEvent.oldState === react_native_gesture_handler_1.State.ACTIVE && !_this.willCloseModalize) {
                _this.close();
            }
        };
        _this.onBackPress = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, onBackButtonPress, alwaysOpen;
            return __generator(this, function (_b) {
                _a = this.props, onBackButtonPress = _a.onBackButtonPress, alwaysOpen = _a.alwaysOpen;
                if (alwaysOpen) {
                    return [2 /*return*/, false];
                }
                if (onBackButtonPress) {
                    onBackButtonPress();
                }
                else {
                    this.close();
                }
                return [2 /*return*/, true];
            });
        }); };
        _this.onKeyboardShow = function (event) {
            var height = event.endCoordinates.height;
            _this.setState({ keyboardToggle: true });
            _this.onContentViewChange(height);
        };
        _this.onKeyboardHide = function () {
            _this.setState({ keyboardToggle: false });
            _this.onContentViewChange();
        };
        _this.renderComponent = function (Component, name) {
            // @ts-ignore
            var element = React.isValidElement(Component) ? Component : <Component />;
            // We don't need to calculate header and footer if they are absolutely positioned
            if (Component && utils_1.hasAbsoluteStyle(Component)) {
                return element;
            }
            var onLayout = function (_a) {
                var _b;
                var nativeEvent = _a.nativeEvent;
                return _this.setState((_b = {}, _b[name + "Height"] = nativeEvent.layout.height, _b), _this.onContentViewChange);
            };
            return (<react_native_1.View style={Modalize_styles_1.default.component} onLayout={onLayout} pointerEvents="box-none">
        {element}
      </react_native_1.View>);
        };
        _this.renderHandle = function () {
            var _a = _this.props, handleStyle = _a.handleStyle, useNativeDriver = _a.useNativeDriver, withHandle = _a.withHandle;
            var handleStyles = [Modalize_styles_1.default.handle];
            var shapeStyles = [Modalize_styles_1.default.handle__shape, handleStyle];
            if (!withHandle) {
                return null;
            }
            if (!_this.isHandleOutside) {
                handleStyles.push(Modalize_styles_1.default.handleBottom);
                shapeStyles.push(Modalize_styles_1.default.handle__shapeBottom, handleStyle);
            }
            return (<react_native_gesture_handler_1.PanGestureHandler simultaneousHandlers={_this.modal} shouldCancelWhenOutside={false} onGestureEvent={react_native_1.Animated.event([{ nativeEvent: { translationY: _this.dragY } }], { useNativeDriver: useNativeDriver })} onHandlerStateChange={_this.onHandleComponent}>
        <react_native_1.Animated.View style={handleStyles}>
          <react_native_1.View style={shapeStyles}/>
        </react_native_1.Animated.View>
      </react_native_gesture_handler_1.PanGestureHandler>);
        };
        _this.renderHeader = function () {
            var _a = _this.props, useNativeDriver = _a.useNativeDriver, HeaderComponent = _a.HeaderComponent;
            if (!HeaderComponent) {
                return null;
            }
            if (utils_1.hasAbsoluteStyle(HeaderComponent)) {
                return _this.renderComponent(HeaderComponent, 'header');
            }
            return (<react_native_gesture_handler_1.PanGestureHandler simultaneousHandlers={_this.modal} shouldCancelWhenOutside={false} onGestureEvent={react_native_1.Animated.event([{ nativeEvent: { translationY: _this.dragY } }], { useNativeDriver: useNativeDriver })} onHandlerStateChange={_this.onHandleComponent}>
        <react_native_1.Animated.View style={Modalize_styles_1.default.component} pointerEvents="box-none">
          {_this.renderComponent(HeaderComponent, 'header')}
        </react_native_1.Animated.View>
      </react_native_gesture_handler_1.PanGestureHandler>);
        };
        _this.renderContent = function () {
            var _a = _this.props, children = _a.children, scrollViewProps = _a.scrollViewProps, flatListProps = _a.flatListProps, sectionListProps = _a.sectionListProps;
            var _b = _this.state, contentHeight = _b.contentHeight, enableBounces = _b.enableBounces, contentViewHeight = _b.contentViewHeight, keyboardEnableScroll = _b.keyboardEnableScroll;
            var scrollEnabled = contentHeight === 0 || keyboardEnableScroll;
            var keyboardDismissMode = utils_1.isIos() ? 'interactive' : 'on-drag';
            var opts = {
                ref: _this.contentView,
                style: contentViewHeight,
                bounces: enableBounces,
                onScrollBeginDrag: react_native_1.Animated.event([{ nativeEvent: { contentOffset: { y: _this.beginScrollY } } }], { useNativeDriver: false }),
                scrollEventThrottle: 16,
                onLayout: _this.onContentViewLayout,
                scrollEnabled: scrollEnabled,
            };
            if (flatListProps) {
                return (<AnimatedFlatList {...opts} {...flatListProps}/>);
            }
            if (sectionListProps) {
                return (<AnimatedSectionList {...opts} {...sectionListProps}/>);
            }
            return (<react_native_1.Animated.ScrollView {...opts} {...scrollViewProps} keyboardDismissMode={keyboardDismissMode}>
        {children}
      </react_native_1.Animated.ScrollView>);
        };
        _this.renderChildren = function () {
            var _a = _this.props, useNativeDriver = _a.useNativeDriver, adjustToContentHeight = _a.adjustToContentHeight, keyboardAvoidingBehavior = _a.keyboardAvoidingBehavior;
            var keyboardToggle = _this.state.keyboardToggle;
            var marginBottom = adjustToContentHeight ? 0 : keyboardToggle ? _this.handleHeight : 0;
            var enabled = utils_1.isIos() && !adjustToContentHeight;
            return (<react_native_gesture_handler_1.PanGestureHandler ref={_this.modalChildren} simultaneousHandlers={[_this.modalContentView, _this.modal]} shouldCancelWhenOutside={false} onGestureEvent={react_native_1.Animated.event([{ nativeEvent: { translationY: _this.dragY } }], { useNativeDriver: useNativeDriver })} onHandlerStateChange={_this.onHandleChildren}>
        <AnimatedKeyboardAvoidingView behavior={keyboardAvoidingBehavior || 'position'} style={{ marginBottom: marginBottom }} enabled={enabled}>
          <react_native_gesture_handler_1.NativeViewGestureHandler ref={_this.modalContentView} waitFor={_this.modal} simultaneousHandlers={_this.modalChildren}>
            {_this.renderContent()}
          </react_native_gesture_handler_1.NativeViewGestureHandler>
        </AnimatedKeyboardAvoidingView>
      </react_native_gesture_handler_1.PanGestureHandler>);
        };
        _this.renderFooter = function () {
            var FooterComponent = _this.props.FooterComponent;
            if (!FooterComponent) {
                return null;
            }
            return _this.renderComponent(FooterComponent, 'footer');
        };
        _this.renderOverlay = function () {
            var _a = _this.props, useNativeDriver = _a.useNativeDriver, overlayStyle = _a.overlayStyle, alwaysOpen = _a.alwaysOpen;
            var showContent = _this.state.showContent;
            var pointerEvents = alwaysOpen ? 'box-none' : 'auto';
            return (<react_native_gesture_handler_1.PanGestureHandler ref={_this.modalOverlay} simultaneousHandlers={[_this.modal, _this.modalOverlayTap]} shouldCancelWhenOutside={false} onGestureEvent={react_native_1.Animated.event([{ nativeEvent: { translationY: _this.dragY } }], { useNativeDriver: useNativeDriver })} onHandlerStateChange={_this.onHandleChildren}>
        <react_native_1.Animated.View style={Modalize_styles_1.default.overlay} pointerEvents={pointerEvents}>
          {showContent && (<react_native_gesture_handler_1.TapGestureHandler ref={_this.modalOverlayTap} waitFor={_this.modalOverlay} simultaneousHandlers={_this.modalOverlay} onHandlerStateChange={_this.onHandleOverlay}>
              <react_native_1.Animated.View style={[Modalize_styles_1.default.overlay__background, overlayStyle, _this.overlayBackground]} pointerEvents={pointerEvents}/>
            </react_native_gesture_handler_1.TapGestureHandler>)}
        </react_native_1.Animated.View>
      </react_native_gesture_handler_1.PanGestureHandler>);
        };
        _this.renderModalize = function () {
            var _a = _this.props, modalStyle = _a.modalStyle, adjustToContentHeight = _a.adjustToContentHeight, keyboardAvoidingBehavior = _a.keyboardAvoidingBehavior, alwaysOpen = _a.alwaysOpen;
            var _b = _this.state, isVisible = _b.isVisible, lastSnap = _b.lastSnap, showContent = _b.showContent;
            var enabled = utils_1.isIos() && adjustToContentHeight;
            var pointerEvents = alwaysOpen ? 'box-none' : 'auto';
            if (!isVisible) {
                return null;
            }
            return (<react_native_1.View style={Modalize_styles_1.default.modalize} pointerEvents={pointerEvents}>
        <react_native_gesture_handler_1.TapGestureHandler ref={_this.modal} maxDurationMs={100000} maxDeltaY={lastSnap}>
          <react_native_1.View style={Modalize_styles_1.default.modalize__wrapper} pointerEvents="box-none">
            {showContent && (<AnimatedKeyboardAvoidingView style={[Modalize_styles_1.default.modalize__content, _this.modalizeContent, modalStyle]} behavior={keyboardAvoidingBehavior || 'padding'} enabled={enabled}>
                {_this.renderHandle()}
                {_this.renderHeader()}
                {_this.renderChildren()}
                {_this.renderFooter()}
              </AnimatedKeyboardAvoidingView>)}

            {_this.renderOverlay()}
          </react_native_1.View>
        </react_native_gesture_handler_1.TapGestureHandler>
      </react_native_1.View>);
        };
        _this.renderReactModal = function (child) {
            var useNativeDriver = _this.props.useNativeDriver;
            var isVisible = _this.state.isVisible;
            return (<react_native_1.Modal supportedOrientations={['landscape', 'portrait', 'portrait-upside-down']} onRequestClose={_this.onBackPress} hardwareAccelerated={useNativeDriver} visible={isVisible} transparent>
        {child}
      </react_native_1.Modal>);
        };
        var fullHeight = utils_1.isIos() ? screenHeight : screenHeight - 10;
        var computedHeight = fullHeight - _this.handleHeight - (utils_1.isIphoneX() ? 34 : 0);
        var modalHeight = props.modalHeight || computedHeight;
        if (props.withReactModal) {
            console.warn('[react-native-modalize] `withReactModal` is set to `true`. Modal from react-native is going ' +
                'to be moved out of the core in the future. I\'d recommend migrating to something like ' +
                'react-navigation or react-native-navigation\'s to wrap Modalize. Check out the documentation ' +
                'for more informations.');
        }
        if ((props.scrollViewProps || props.children) && props.flatListProps) {
            console.error('[react-native-modalize] `flatListProps` You can\'t use the ScrollView and the FlatList at the ' +
                'same time. As soon as you use `flatListProps` it will replaces the default ScrollView with ' +
                'a FlatList component. Remove the `children` and/or `scrollViewProps` to fix the error.');
        }
        if ((props.scrollViewProps || props.children) && props.sectionListProps) {
            console.error('[react-native-modalize] `sectionListProps` You can\'t use the ScrollView and the SectionList at the ' +
                'same time. As soon as you use `sectionListProps` it will replaces the default ScrollView with ' +
                'a SectionList component. Remove the `children` and/or `scrollViewProps` to fix the error.');
        }
        if (props.snapPoint) {
            _this.snaps.push(0, modalHeight - props.snapPoint, modalHeight);
        }
        else {
            _this.snaps.push(0, modalHeight);
        }
        _this.snapEnd = _this.snaps[_this.snaps.length - 1];
        _this.state = {
            lastSnap: props.snapPoint ? modalHeight - props.snapPoint : 0,
            isVisible: false,
            showContent: true,
            overlay: new react_native_1.Animated.Value(0),
            modalHeight: modalHeight,
            contentHeight: 0,
            headerHeight: 0,
            footerHeight: 0,
            enableBounces: true,
            contentViewHeight: [],
            keyboardEnableScroll: false,
            keyboardToggle: false,
        };
        _this.beginScrollY.addListener(function (_a) {
            var value = _a.value;
            return _this.beginScrollYValue = value;
        });
        _this.reverseBeginScrollY = react_native_1.Animated.multiply(new react_native_1.Animated.Value(-1), _this.beginScrollY);
        return _this;
    }
    Modalize.prototype.componentDidMount = function () {
        this.onContentViewChange();
        if (this.props.alwaysOpen) {
            this.onAnimateOpen(this.props.alwaysOpen);
        }
        react_native_1.Keyboard.addListener('keyboardWillShow', this.onKeyboardShow);
        react_native_1.Keyboard.addListener('keyboardWillHide', this.onKeyboardHide);
    };
    Modalize.prototype.componentWillUnmount = function () {
        react_native_1.Keyboard.removeListener('keyboardWillShow', this.onKeyboardShow);
        react_native_1.Keyboard.removeListener('keyboardWillHide', this.onKeyboardHide);
    };
    Object.defineProperty(Modalize.prototype, "isHandleOutside", {
        get: function () {
            var handlePosition = this.props.handlePosition;
            return handlePosition === 'outside';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Modalize.prototype, "handleHeight", {
        get: function () {
            var withHandle = this.props.withHandle;
            if (!withHandle) {
                return 20;
            }
            return this.isHandleOutside ? 35 : 20;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Modalize.prototype, "modalizeContent", {
        get: function () {
            var modalHeight = this.state.modalHeight;
            var valueY = react_native_1.Animated.add(this.dragY, this.reverseBeginScrollY);
            return {
                height: modalHeight,
                transform: [{
                        translateY: react_native_1.Animated.add(this.translateY, valueY).interpolate({
                            inputRange: [0, this.snapEnd],
                            outputRange: [0, this.snapEnd],
                            extrapolate: 'clamp',
                        }),
                    }],
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Modalize.prototype, "overlayBackground", {
        get: function () {
            var overlay = this.state.overlay;
            return {
                opacity: overlay.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                }),
            };
        },
        enumerable: true,
        configurable: true
    });
    Modalize.prototype.render = function () {
        var withReactModal = this.props.withReactModal;
        if (withReactModal) {
            return this.renderReactModal(this.renderModalize());
        }
        return this.renderModalize();
    };
    Modalize.defaultProps = {
        handlePosition: 'outside',
        useNativeDriver: true,
        adjustToContentHeight: false,
        withReactModal: false,
        withHandle: true,
        openAnimationConfig: {
            timing: { duration: 280 },
            spring: { speed: 14, bounciness: 5 },
        },
        closeAnimationConfig: {
            timing: { duration: 280 },
            spring: { speed: 14, bounciness: 5 },
        },
    };
    return Modalize;
}(React.Component));
exports.default = Modalize;
//# sourceMappingURL=Modalize.js.map