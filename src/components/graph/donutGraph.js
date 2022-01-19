import React, { useEffect } from 'react';
import * as d3 from 'd3';
import {colorShadeGenerator} from '../../utils/utils';

const width = 550,
      height = 450;
      
const donut_data = [
    { name: 'name1', total: 12, count: 1, value: 1000, amount: 1300000, color: 'rgba(0,0,0,0.1)' },
    { name: 'name2', total: 34, count: 2, value: 1002, amount: 250000, color: 'rgba(0,0,0,0.5)' },
    { name: 'name3', total: 54, count: 3, value: 1003, amount: 800000, color: 'rgba(0,0,0,0.6)' },
    { name: 'name4', total: 11, count: 4, value: 1004, amount: 150000, color: 'rgba(0,0,0,0.2)' },
    { name: 'name5', total: 76, count: 5, value: 1005, amount: 175000, color: 'rgba(0,0,0,0.3)' },
    { name: 'name6', total: 55, count: 6, value: 1006, amount: 100000, color: 'rgba(0,0,0,0.4)' },
    { name: 'name7', total: 53, count: 7, value: 1007, amount: 500000, color: 'rgba(0,0,0,0.7)' },
    { name: 'name8', total: 31, count: 8, value: 1008, amount: 40000, color: 'rgba(0,0,0,0.2)' },
    { name: 'name9', total: 62, count: 9, value: 1009, amount: 375000, color: 'rgba(0,0,0,0.3)' },
    { name: 'name10', total: 69, count: 10, value: 1023, amount: 60000, color: 'rgba(0,0,0,0.4)' },
];

const DonutGraph = ({ set, wMark }) => {
    useEffect(() => {
        renderGraph(donut_data);
    }, [set, wMark]);
    
    const renderGraph = (data) => {
        // let graphMainText = dashboardData.graphMainText ? dashboardData.graphMainText : null;
        // let graphSubText = dashboardData.graphSubText ? dashboardData.graphSubText : null;

		const colorWheelRatio = Math.floor(360 / donut_data.length);

		const pieSvg = d3.select('#donut')
			.attr('width', width)
			.attr('height', height)
         	.attr('preserveAspectRatio','xMinYMin');
        console.log('pieSvg', pieSvg);
        const createGradients = (defs, colors, r) => {  
			let gradient = defs.selectAll('.gradient')
				.data(colors).enter().append("radialGradient")
				.attr("id", (d,i) => "gradient" + i)
				.attr("gradientUnits", "userSpaceOnUse")
				.attr("cx", "0").attr("cy", "0").attr("r", r).attr("spreadMethod", "pad");

			gradient.append("stop").attr("offset", "0%").attr("stop-color", (d) => d);

			gradient.append("stop").attr("offset", "30%")
			.attr("stop-color", (d) => d)
			.attr("stop-opacity", 1);

			gradient.append("stop").attr("offset", "80%")
			.attr("stop-color", (d) => 'black')
			.attr("stop-opacity", 1);
		};

		const pieWidth = pieSvg.attr('width');
		const pieHeight = pieSvg.attr('height');

		const radius = Math.min(pieWidth, pieHeight) / 2;

		pieSvg.html('');

		const g = pieSvg.append("g").attr("transform", "translate(" + pieWidth / 2 + "," + pieHeight / 2 + ")");
		
		createGradients(g.append("defs"), donut_data.map((d) => { return d.color; }), 2.5 * 200 );
		
		const pie = d3.pie().sort(null).value(d => d.total);

		const path = d3.arc().outerRadius(radius - 10).innerRadius(0).padAngle(0.02);

		const label = d3.arc().outerRadius(radius - 40).innerRadius(radius - 40);

		const arc = g.selectAll("#donut.arc")
		    .data(pie(donut_data))
		    .enter().append("g")
		    .attr("class", "arc");

        arc.append("path")
            .attr("d", path)
            .attr("fill", (d, index) => `hsl(${index*colorWheelRatio}, 40%, 50%)`);

		const innerCircle = g.append('circle');
		innerCircle.attr('r', radius - 70);
		innerCircle.attr('fill', '#fff');

		// if(graphMainText){
		// 	const upperTitle = g.append('text')
		// 	  .text(graphMainText.title)
		// 	  .attr('dy', graphSubText ? -20 : -25)
		// 	  .attr('class', 'graph-title');

		// 	const worthText = g.append('text')
		// 	  .text(graphMainText.amount)
		// 	  .attr('dy', graphSubText ? -20 : 25)
		// 	  .attr('class', 'graph-value');

		// 	const percentText = g.append('text')
		// 	  .text('')
		// 	  .attr('dy', -10)
		// 	  .attr('class', 'title')
		// }

		// if(graphSubText){
		// 	const line = g.append('line')
		// 	  .attr('x1', -radius / 2)
		// 	  .attr('y1', 0)
		// 	  .attr('x2', radius / 2)
		// 	  .attr('y2', 0)
		// 	  .attr('class', 'line')
		// 	  .attr('stroke', '#ddd')
		// 	  .attr('stroke-width', 2);

		// 	if(graphSubText){
		// 		const assetTitle = g.append('text')
		// 		  .text(graphSubText.title)
		// 		  .attr('dy', 35)
		// 		  .attr('class', 'graph-title');

		// 		const amountText = g.append('text')
		// 		  .text(graphSubText.amount)
		// 		  .attr('dy', 80)
		// 		  .attr('class', 'graph-value');
		// 	}
			
		// 	const bottomText = g.append('text')
		// 	  .text('')
		// 	  .attr('dy', 75)
		// 	  .attr('class', 'title')
		// }
    }

    return (
        <svg  
            id="donut"
            className={`pie`} 
            width="450" 
            height="350" 
            viewBox={`0 0 ${width} ${height}`} >
        </svg>
    )
}

export default DonutGraph;
