import * as React from 'react';
import { ISpringProps } from './Options';
export declare const getSpringConfig: (config: ISpringProps) => {
    stiffness: number | undefined;
    damping: number | undefined;
    mass: number | undefined;
    bounciness?: undefined;
    speed?: undefined;
    tension?: undefined;
    friction?: undefined;
} | {
    bounciness: number | undefined;
    speed: number | undefined;
    stiffness?: undefined;
    damping?: undefined;
    mass?: undefined;
    tension?: undefined;
    friction?: undefined;
} | {
    tension: number | undefined;
    friction: number | undefined;
    stiffness?: undefined;
    damping?: undefined;
    mass?: undefined;
    bounciness?: undefined;
    speed?: undefined;
};
export declare const isIos: () => boolean;
export declare const isIphoneX: () => boolean;
export declare const hasAbsoluteStyle: (Component: React.ReactNode) => boolean;
