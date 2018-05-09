System.register(["app/plugins/sdk", "jquery", "lodash"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var sdk_1, jquery_1, lodash_1, TestDynamicHeightCtrl;
    return {
        setters: [
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            TestDynamicHeightCtrl = (function (_super) {
                __extends(TestDynamicHeightCtrl, _super);
                function TestDynamicHeightCtrl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.wrap = null;
                    _this.running = false;
                    _this.destination = 0;
                    lodash_1.default.defaults(_this.panel, {
                        loop: true,
                        min: 100,
                        max: 400,
                        duration: 5000,
                        border: '2px solid #FF0'
                    });
                    _this.events.on('panel-initialized', _this.onPanelInitalized.bind(_this));
                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.events.on('render', _this.onRender.bind(_this));
                    return _this;
                }
                TestDynamicHeightCtrl.prototype.onPanelInitalized = function () {
                    this.running = false;
                    this.wrap.css('height', this.panel.min);
                    if (this.panel.loop) {
                        this.toggleAnimation();
                    }
                };
                TestDynamicHeightCtrl.prototype.onRender = function () {
                    this.renderingCompleted();
                };
                TestDynamicHeightCtrl.prototype.configChanged = function () {
                    if (this.running) {
                        this.wrap.clearQueue().stop();
                        this.running = false;
                        this.toggleAnimation();
                    }
                };
                TestDynamicHeightCtrl.prototype.toggleAnimation = function () {
                    var _this = this;
                    if (this.running) {
                        this.wrap.clearQueue().stop();
                        this.running = false;
                        return;
                    }
                    var diff = this.panel.max - this.panel.min;
                    var half = this.panel.min + diff / 2;
                    var h = this.wrap.outerHeight(true);
                    this.destination = (h < half) ? this.panel.max : this.panel.min;
                    this.running = true;
                    this.wrap.animate({
                        height: this.destination
                    }, {
                        queue: false,
                        duration: this.panel.duration,
                        complete: function () {
                            _this.running = false;
                            if (_this.panel.loop) {
                                _this.toggleAnimation();
                            }
                        }
                    });
                };
                TestDynamicHeightCtrl.prototype.onInitEditMode = function () {
                    this.addEditorTab('Options', 'public/plugins/' + this.pluginId + '/partials/editor.options.html', 1);
                    this.editorTabIndex = 1;
                };
                TestDynamicHeightCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    this.wrap = jquery_1.default(elem.find('.wrap')[0]);
                    this.wrap.css('border', this.panel.border);
                    this.wrap.css('padding', '10px');
                    console.log('WRAP', this.wrap);
                };
                TestDynamicHeightCtrl.templateUrl = 'partials/module.html';
                TestDynamicHeightCtrl.scrollable = true;
                return TestDynamicHeightCtrl;
            }(sdk_1.PanelCtrl));
            exports_1("TestDynamicHeightCtrl", TestDynamicHeightCtrl);
            exports_1("PanelCtrl", TestDynamicHeightCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map