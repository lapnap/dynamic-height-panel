/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { PanelCtrl } from 'app/plugins/sdk';
declare class TestDynamicHeightCtrl extends PanelCtrl {
    static templateUrl: string;
    static scrollable: boolean;
    wrap: any;
    running: boolean;
    destination: number;
    constructor($scope: any, $injector: any);
    onPanelInitalized(): void;
    onRender(): void;
    configChanged(): void;
    toggleAnimation(): void;
    onInitEditMode(): void;
    link(scope: any, elem: any, attrs: any, ctrl: any): void;
}
export { TestDynamicHeightCtrl, TestDynamicHeightCtrl as PanelCtrl };
