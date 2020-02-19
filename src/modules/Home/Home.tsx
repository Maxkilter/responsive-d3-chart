import { h } from 'preact';

import Chart from '../Chart';

interface Props {
  path: any;
}

// @ts-ignore
const Home = (props: Props) => <Chart path={props.path} />;

export default Home;
