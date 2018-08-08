///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import {PanelCtrl} from 'app/plugins/sdk';
import $ from 'jquery';
import _ from 'lodash';

class TestDynamicHeightCtrl extends PanelCtrl {
  static templateUrl = 'partials/module.html';
  static scrollable = true;

  wrap: any = null; // DOMElement
  running: boolean = false;
  destination = 0;

  /** @ngInject */
  constructor($scope, $injector) {
    super($scope, $injector);

    _.defaults(this.panel, {
      loop: true,
      min: 100,
      max: 400,
      duration: 5000,
      border: '2px solid #FF0',
    });

    this.events.on('panel-initialized', this.onPanelInitalized.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('render', this.onRender.bind(this));
  }

  onPanelInitalized() {
    this.running = false;
    this.wrap.css('height', this.panel.min);
    this.configChanged();
    if (this.panel.loop) {
      this.toggleAnimation();
    }
  }

  onRender() {
    this.renderingCompleted();
  }

  configChanged() {
    this.wrap.css('border', this.panel.border);
    if (this.running) {
      this.wrap.clearQueue().stop();
      this.running = false;
      this.toggleAnimation();
    }
  }

  toggleAnimation() {
    if (this.running) {
      this.wrap.clearQueue().stop();
      this.running = false;
      return;
    }

    const diff = this.panel.max - this.panel.min;
    const half = this.panel.min + diff / 2;
    const h = this.wrap.outerHeight(true);
    this.destination = h < half ? this.panel.max : this.panel.min;

    // Animate
    this.running = true;
    this.wrap.animate(
      {
        height: this.destination,
      },
      {
        queue: false,
        duration: this.panel.duration,
        complete: () => {
          this.running = false;
          if (this.panel.loop) {
            this.toggleAnimation(); // Will send it the other direction
          }
        },
      }
    );
  }

  onInitEditMode() {
    this.addEditorTab(
      'Options',
      'public/plugins/' + this.pluginId + '/partials/editor.options.html',
      1
    );
    this.editorTabIndex = 1;
  }

  link(scope, elem, attrs, ctrl) {
    this.wrap = $(elem.find('.wrap')[0]);
    this.wrap.css('padding', '10px');

    console.log('WRAP', this.wrap);
  }
}

export {TestDynamicHeightCtrl, TestDynamicHeightCtrl as PanelCtrl};
