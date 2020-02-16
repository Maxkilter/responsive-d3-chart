import * as d3Axis from 'd3-axis';
import { select as d3Select } from 'd3-selection';
import { Component, h } from 'preact';

import './Axis.css';

interface Props {
	orient: any;
	scale: any;
	tickSize: number;
	translate: string;
}

export default class Axis extends Component<Props> {
	private axisElement: HTMLElement;
	componentDidMount() {
		this.renderAxis();
	}
	
	componentDidUpdate() {
		this.renderAxis();
	}
	
	renderAxis() {
		const axisType = `axis${this.props.orient}`;
		const axis = d3Axis[axisType]()
			.scale(this.props.scale)
			.tickSize(-this.props.tickSize)
			.tickPadding([12])
			.ticks([4]);
		
		d3Select(this.axisElement).call(axis);
	}
	
	render() {
		return (
			<g
				className={`Axis Axis-${this.props.orient}`}
				ref={el => {
					this.axisElement = el;
				}}
				transform={this.props.translate}
			/>
		);
	}
}
