/// <reference types="react-native" />
import * as React from 'react';
import { IProps, IState } from './Options';
export default class Modalize<FlatListItem = any, SectionListItem = any> extends React.Component<IProps<FlatListItem, SectionListItem>, IState> {
    static defaultProps: {
        handlePosition: string;
        useNativeDriver: boolean;
        adjustToContentHeight: boolean;
        withReactModal: boolean;
        withHandle: boolean;
        openAnimationConfig: {
            timing: {
                duration: number;
            };
            spring: {
                speed: number;
                bounciness: number;
            };
        };
        closeAnimationConfig: {
            timing: {
                duration: number;
            };
            spring: {
                speed: number;
                bounciness: number;
            };
        };
    };
    private snaps;
    private snapEnd;
    private beginScrollYValue;
    private contentAlreadyCalculated;
    private beginScrollY;
    private dragY;
    private translateY;
    private reverseBeginScrollY;
    private modal;
    private modalChildren;
    private modalContentView;
    private contentView;
    private modalOverlay;
    private modalOverlayTap;
    private willCloseModalize;
    constructor(props: IProps<FlatListItem, SectionListItem>);
    componentDidMount(): void;
    componentWillUnmount(): void;
    open: () => void;
    close: () => void;
    scrollTo: (y?: number | {
        x?: number | undefined;
        y?: number | undefined;
        animated?: boolean | undefined;
    } | undefined, x?: number | undefined, animated?: boolean | undefined) => void;
    private readonly isHandleOutside;
    private readonly handleHeight;
    private readonly modalizeContent;
    private readonly overlayBackground;
    private onAnimateOpen;
    private onAnimateClose;
    private onContentViewLayout;
    private onContentViewChange;
    private onHandleComponent;
    private onHandleChildren;
    private onHandleOverlay;
    private onBackPress;
    private onKeyboardShow;
    private onKeyboardHide;
    private renderComponent;
    private renderHandle;
    private renderHeader;
    private renderContent;
    private renderChildren;
    private renderFooter;
    private renderOverlay;
    private renderModalize;
    private renderReactModal;
    render(): React.ReactNode;
}
