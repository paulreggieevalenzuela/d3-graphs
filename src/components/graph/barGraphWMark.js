import React, { useEffect } from 'react';
import * as d3 from 'd3';
import {colorShadeGenerator} from '../../utils/utils';

const bar_chart = [
    {name: 'Page A', total: 2400},
    {name: 'Page B', total: 1500},
    {name: 'Page C', total: 500},
    {name: 'Page D', total: 1200},
    {name: 'Page E', total: 3000},
];

const bar_chart2 = [
    {name: 'Name 1', total: 400},
    {name: 'Name 2', total: 300},
    {name: 'Name 4', total: 1200},
    {name: 'Name 3', total: 5000},
    {name: 'Name 5', total: 2200},
];

const BarGraphWithMark = ({ set, wMark }) => {
    useEffect(() => {
        renderGraph(set ? bar_chart : bar_chart2);
    }, [set, wMark]);
    
    const renderGraph = (data) => {
        const symbol = '$';
        const sum_assets = data.reduce((acc, curr) => acc + parseInt(curr.value || curr.total), 0);
        const graphData = data.map((d, i) => {
            let width = d.value || d.total / sum_assets * 100;

            return {
                ...d,
                color: colorShadeGenerator(data.length, i),
                name: d.name || 'No name',
                total: d.total || 0,
                width: width <= 5 ? 5 : width, 
            };
        })

        const selectBarContainer = d3.select('#barChart');
        selectBarContainer._groups[0][0].innerHTML = '';
        selectBarContainer.selectAll('.SpecialGraph__bar')
                .data(graphData)
                .enter()
                .append('div')
                .transition()
                .duration(1000)
                .attr('class', 'SpecialGraph__bar')
                .style('width', (d) => `${d.width}%`)
                .style('background-color', (d) => d.color)
                .style('border', (d) => `2px solid ${d.color}`)
                .delay(300);
        // append marks longest
        if (wMark) {
            const selectMarkContainer = d3.select('#barMark');
            selectMarkContainer._groups[0][0].innerHTML = '';
            selectMarkContainer.selectAll('.SpecialGraph__mark')
                .data(graphData)
                .enter()
                .append('div')
                .attr('class', 'SpecialGraph__mark')
                .style('width', (d) => `${d.width}%`)
                .style('border', '2px solid transparent')
                .style('border-left', (d, index) => {
                    return `2px solid ${d.color}`;
                })
                .style('height', (d, index) => {
                    if (index % 4 < 2) {
                        return '200%';
                    } else {
                        return '100%';
                    }
                })
                .style('top', (d, index) => {
                    switch (index % 4) {
                        case 0:
                            return '-180px';
                        case 2:
                            return '-120px';
                        default:
                            return '0';
                    }
                })
                .html((d, index) => {
                    if(index % 2 === 0) {
                        return `<div class="mark-label mark-label__top">
                                    <p class=mark-label__name>${d.name}</p>
                                    <p class=mark-label__price>${symbol} ${(d.total)}</p>
                                </div>`;
                    } else {
                        return `<div class="mark-label mark-label__bottom">
                                    <p class=mark-label__name>${d.name}</p>
                                    <p class=mark-label__price>${symbol} ${(d.total)}</p>
                                </div>`;
                    } 
                    
                });
        }
        
    }

    return (
        <div className="SpecialGraph">
            <div className="SpecialGraph__container">
                <div className="SpecialGraph__bar-container" id="barChart"></div>
                {wMark && (
                    <div className="SpecialGraph__mark-container" id="barMark"></div>
                )}
            </div>
        </div>
    )
}

export default BarGraphWithMark;
