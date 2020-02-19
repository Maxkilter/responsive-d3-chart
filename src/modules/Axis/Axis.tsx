import * as d3Axis from 'd3-axis';
import { select as d3Select } from 'd3-selection';
import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import './Axis.css';

interface Props {
	orient: any;
	scale: any;
	tickSize: number;
	translate: string;
}

const Axis = (props: Props) => {
	let axisElement = null;
	
	const renderAxis = () => {
		const axisType = `axis${props.orient}`;
		const axis = d3Axis[axisType]()
			.scale(props.scale)
			.tickSize(-props.tickSize)
			.tickPadding([12])
			.ticks([4]);
		
		d3Select(axisElement).call(axis);
	};
	
	useEffect(renderAxis);
	
	return (
		<g
			className={`Axis Axis-${props.orient}`}
			ref={el => axisElement = el}
			transform={props.translate}
		/>
	);
};

export default Axis;
