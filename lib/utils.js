"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var _a = react_native_1.Dimensions.get('window'), screenWidth = _a.width, screenHeight = _a.height;
exports.getSpringConfig = function (config) {
    var friction = config.friction, tension = config.tension, speed = config.speed, bounciness = config.bounciness, stiffness = config.stiffness, damping = config.damping, mass = config.mass;
    if (stiffness || damping || mass) {
        if (bounciness || speed || tension || friction) {
            console.error('[react-native-modalize] You can define one of bounciness/speed, tension/friction, ' +
                'or stiffness/damping/mass, but not more than one');
        }
        return {
            stiffness: stiffness,
            damping: damping,
            mass: mass,
        };
    }
    else if (bounciness || speed) {
        if (tension || friction || stiffness || damping || mass) {
            console.error('[react-native-modalize] You can define one of bounciness/speed, tension/friction, ' +
                'or stiffness/damping/mass, but not more than one');
        }
        return {
            bounciness: bounciness,
            speed: speed,
        };
    }
    return {
        tension: tension,
        friction: friction,
    };
};
exports.isIos = function () {
    return react_native_1.Platform.OS === 'ios';
};
exports.isIphoneX = function () {
    // @ts-ignore
    var isIphone = exports.isIos() && !react_native_1.Platform.isPad && !react_native_1.Platform.isTVOS;
    return isIphone && ((screenHeight === 812 || screenWidth === 812) || (screenHeight === 896 || screenWidth === 896));
};
exports.hasAbsoluteStyle = function (Component) {
    if (!React.isValidElement(Component)) {
        return false;
    }
    // @ts-ignore
    var element = typeof Component === 'object' ? Component : Component();
    var style = Component && react_native_1.StyleSheet.flatten(element.props.style);
    return style && style.position === 'absolute';
};
//# sourceMappingURL=utils.js.map