import {PanelPlugin} from '@grafana/ui';

import {DynamicHeightEditor} from './DynamicHeightEditor';
import {DynamicHeightPanel} from './DynamicHeightPanel';
import {Options, defaults} from './types';

export const plugin = new PanelPlugin<Options>(DynamicHeightPanel)
  .setDefaults(defaults)
  .setEditor(DynamicHeightEditor);
