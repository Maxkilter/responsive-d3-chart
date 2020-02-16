import { Component, h } from 'preact';

import Chart from '../Chart';

interface Props {
  path: any;
}

export default class Home extends Component<Props> {
  render = () => <Chart />;
}
