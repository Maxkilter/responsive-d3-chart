import { h, Component } from 'preact';
import {ScaleBand, scaleBand, ScaleLinear, scaleLinear} from 'd3-scale';
import './Chart.css'
import Axes from '../Axes';
import Bars from '../Bars';
import { Data }  from '../types';
//@ts-ignore
import angry from '../../assets/img/angry.svg';
//@ts-ignore
import haha from '../../assets/img/haha.svg';
//@ts-ignore
import like from '../../assets/img/like.svg';
//@ts-ignore
import love from '../../assets/img/love.svg';
//@ts-ignore
import sad from '../../assets/img/sad.svg';
//@ts-ignore
import wow from '../../assets/img/wow.svg';

const iconsObj = {
	like,
	love,
	sad,
	wow,
	angry,
	haha,
};

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
	
	getWidth(percents) {
		const { width } = this.state;
		return width ? width - this.getPercentage(percents, width)
		: window.innerWidth - this.getPercentage(percents, window.innerWidth)
	}
	
	getHeight(percents) {
		const { height } = this.state;
		return height ? height - this.getPercentage(percents, height)
		: window.innerHeight - this.getPercentage(percents, window.innerHeight)
	}
	
	renderIcons() {
		const icons = [];
			this.state.data.map(obj => {
				const iconName = Object.values(obj)[0];
						for(let key in iconsObj) {
							if (key === iconName) {
								icons.push(iconsObj[iconName])
							}
						}
				});
			
		const width = this.getWidth(97);
		const marginLeft = this.getWidth(91.3);
		
		return icons.map(icon => (
			<img
				className='icon'
				src={icon}
				alt={icon}
				style={{marginLeft, width}}
			/>
			)
		);
	}
	
	render() {
		const { data } = this.state;
		
		const margins = { top: 50, right: 20, bottom: 100, left: 60 };
		const svgDimensions = {
			width: this.getWidth(20),
			height: this.getHeight(30)
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
			<div className='chart-wrapper' style={{width: svgDimensions.width, height: svgDimensions.height}}>
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
				<div
					className="icons-block"
					style={{width: svgDimensions.width, paddingLeft: this.getWidth(96.5)}}>
					{this.renderIcons()}
				</div>
			</div>

		)
	}
}

export default Chart;
