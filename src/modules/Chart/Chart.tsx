import { h, Component } from 'preact';
import {ScaleBand, scaleBand, ScaleLinear, scaleLinear} from 'd3-scale';
import './Chart.css'
import Axes from '../Axes';
import Bars from '../Bars';
import { Data }  from '../types';

interface State {
	data: Data | any[];
	width: number | null;
	height: number | null;
}
class Chart extends Component<{},State> {
	private xScale: ScaleBand<string>;
	private yScale:  ScaleLinear<number, number>;
	
	constructor() {
		super();
		this.xScale = scaleBand();
		this.yScale = scaleLinear();
	}
	
	state = {
		data: [],
		width: null,
		height: null,
	};
	
	async componentDidMount(): Promise<any> {
		const response =  await fetch('http://www.mocky.io/v2/5e44b5b03000004e006145bd');
		if (response.ok) {
			const data = await response.json();
				const formattedData = data.map((bar) => ({
						title: Object.keys(bar)[0],
						value: Object.values(bar)[0],
						color: Object.values(bar)[1]
					})).sort((a:Data,b:Data) => b.value - a.value);
			
			this.setState({data: formattedData});
		} else {
			console.log(response.status);
			alert("Oops, seems like the server doesn't respond :-(");
		}
		window.addEventListener('resize', this.updateDimensions);
	}
	
	updateDimensions = () => {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	};
	
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}
	
	getPercentage(percents, value) {
		return percents * (value/100)
	}
	
	getWidth() {
		const percents = 20;
		const { width } = this.state;
		return width ? width - this.getPercentage(percents, width)
		: window.innerWidth - this.getPercentage(percents, window.innerWidth)
	}
	
	getHeight() {
		const percents = 30;
		const { height } = this.state;
		return height ? height - this.getPercentage(percents, height)
		: window.innerHeight - this.getPercentage(percents, window.innerHeight)
	}
	
	render() {
		const { data } = this.state;
		
		const margins = { top: 50, right: 20, bottom: 100, left: 60 };
		const svgDimensions = {
			width: this.getWidth(),
			height: this.getHeight()
		};
		
		const maxValue = Math.max(...data.map((d:Data) => d.value));
		const xScale = this.xScale
			.padding(0.5)
			.domain(data.map(d => d.title))
			.range([margins.left, svgDimensions.width - margins.right]);

		const yScale = this.yScale
			.domain([0, maxValue])
			.range([svgDimensions.height - margins.bottom, margins.top]);
	
		return (
			<svg
				className="responsive-chart"
				width={svgDimensions.width}
				height={svgDimensions.height}>
			<Axes
				scales={{ xScale, yScale }}
				margins={margins}
				svgDimensions={svgDimensions}
			/>
			<Bars
				scales={{ xScale, yScale }}
				margins={margins}
				data={data}
				maxValue={maxValue}
				svgDimensions={svgDimensions}
			/>
		</svg>
		)
	}
}

export default Chart;
