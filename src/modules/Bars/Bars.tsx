import { h } from 'preact';

import { Data } from '../types';

interface Props {
	scales: any;
	margins: { top: number; bottom: number; left: number; right: number };
	data: Data[];
	svgDimensions: { height: number };
	maxValue: number;
}

const Bars = (props: Props) => {
	const { scales, margins, data, svgDimensions } = props;
	const { xScale, yScale } = scales;
	const { height } = svgDimensions;
	
	const bars = data.map((datum: Data) => (
		<rect
			key={datum.title}
			x={xScale(datum.title)}
			y={yScale(datum.value)}
			height={height - margins.bottom - scales.yScale(datum.value)}
			width={xScale.bandwidth()}
			fill={datum.color}
		/>
	));
	
	return <g>{bars}</g>;
};

export default Bars;
