import { scaleBand, scaleLinear } from 'd3-scale';
import { h } from 'preact';
import { useEffect, useState, useMemo } from 'preact/hooks';
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
import Axes from '../Axes';
import Bars from '../Bars';
import { Data } from '../types';

import './Chart.css';

const iconsObj = {
	like,
	love,
	sad,
	wow,
	angry,
	haha
};

const Chart = () => {
	let xScale = scaleBand();
	let yScale = scaleLinear();
	
	const [data, setData] = useState([]);
	const [width, setWidth] = useState(null);
	const [height, setHeight] = useState(null);
	
	useMemo( async () => {
		const response = await fetch(
			'http://www.mocky.io/v2/5e44b5b03000004e006145bd',
		);
		if (response.ok) {
			const data = await response.json();
			const formattedData = data
				.map(bar => ({
					title: Object.keys(bar)[0],
					value: Object.values(bar)[0],
					color: Object.values(bar)[1]
				}))
				.sort((a: Data, b: Data) => b.value - a.value);
				
			setData(formattedData);
		}
		else {
			console.log(response.status);
			alert("Oops, seems like the server doesn't respond :-(");
		}
	}, []);
	
	useEffect(() => {
		window.addEventListener('resize', updateDimensions);
		
		return function cleanup() {
			window.removeEventListener('resize', updateDimensions);
		};
	});
	
	const updateDimensions = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};
	
	const getPercentage = (percents, value) => percents * (value / 100);
	
	const	getWidth = (percents) => width
		? width - getPercentage(percents, width)
		: window.innerWidth - getPercentage(percents, window.innerWidth);
	
	const getHeight = (percents) => height
		? height - getPercentage(percents, height)
		: window.innerHeight - getPercentage(percents, window.innerHeight);
	
	const renderIcons = () => {
		const icons = [];
		data.map(obj => {
			const iconName = Object.values(obj)[0];
			for (const key in iconsObj) {
				if (key === iconName) {
					icons.push(iconsObj[iconName]);
				}
			}
		});
		
		const iconWidth = getWidth(97);
		const marginLeft = getWidth(91.3);
		
		return icons.map(icon => (
			<img
				className="icon"
				src={icon}
				alt={icon}
				style={{ marginLeft, width: iconWidth }}
			/>
		));
	};

	
	const margins = { top: 50, right: 20, bottom: 100, left: 60 };
	const svgDimensions = {
		width: getWidth(20),
		height: getHeight(30)
	};
	
	const maxValue = Math.max(...data.map((d: Data) => d.value));
		 xScale = xScale
		.padding(0.5)
		.domain(data.map(d => d.title))
		.range([margins.left, svgDimensions.width - margins.right]);
		
		 yScale = yScale
		.domain([0, maxValue])
		.range([svgDimensions.height - margins.bottom, margins.top]);
		
	return (
		<div
			className="chart-wrapper"
			style={{ width: svgDimensions.width, height: svgDimensions.height }}
		>
			<svg
				className="responsive-chart"
				width={svgDimensions.width}
				height={svgDimensions.height}
			>
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
				style={{
					width: svgDimensions.width,
					paddingLeft: getWidth(96.5)
				}}
			>
				{renderIcons()}
			</div>
		</div>
	);
};

export default Chart;
