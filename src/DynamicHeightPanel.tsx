// Libraries
import React, {PureComponent, CSSProperties} from 'react';

// Types
import {Options} from './types';
import {PanelProps} from '@grafana/ui';

export interface Props extends PanelProps<Options> {}

interface State {
  height: number;
  time: number;
  up: boolean;
  running: boolean;
}

export class DynamicHeightPanel extends PureComponent<Props, State> {
  frameId: number = 0;

  constructor(props: Props) {
    super(props);

    this.state = {
      height: props.options.min,
      time: Date.now(),
      up: true,
      running: false,
    };
  }

  componentDidMount() {
    this.startLoop();
  }

  componentWillUnmount() {
    this.stopLoop();
  }

  startLoop = () => {
    if (this.frameId == 0) {
      this.frameId = window.requestAnimationFrame(this.loop);
      this.setState({
        running: true,
      });
    }
  };

  stopLoop = () => {
    window.cancelAnimationFrame(this.frameId);
    this.frameId = 0;
    this.setState({
      running: true,
    });
  };

  loop = () => {
    const {height, time, up, running} = this.state;
    const {min, max, speed} = this.props.options;
    const now = Date.now();
    const elapsed = (now - time) / 1000; // in seconds
    const dist = elapsed * speed * (up ? 1 : -1);

    if (!running) {
      return;
    }

    let dir = up;
    let next = height + dist;
    if (next > max) {
      next = max;
      dir = !dir;
    } else if (next < min) {
      next = min;
      dir = !dir;
    }
    this.setState({
      height: next,
      up: dir,
      time: now,
    });

    // Set up next iteration of the loop\
    this.frameId = window.requestAnimationFrame(this.loop);
  };

  toggleRunning = () => {
    if (this.frameId) {
      this.stopLoop();
    } else {
      this.startLoop();
    }
  };

  render() {
    const {height, running} = this.state;

    const style: CSSProperties = {
      height,
      border: this.props.options.border,
      padding: '10px',
    };

    return (
      <div style={style}>
        <button className="btn btn-secondary" onClick={this.toggleRunning}>
          {running ? 'Stop' : 'Start'}
        </button>
        height: {height}
      </div>
    );
  }
}
