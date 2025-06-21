import{j as a}from"./index-DrhACB-D.js";import{useMDXComponents as y}from"./index-DmqVK_gK.js";import{S as r}from"./docs-CJ9d-umt.js";import{B as m,ab as C,G as v,L as g,a as f,P as L,S as b}from"./Upload-ChF5xKSK.js";const A=[{name:"A",value1:4e3,value2:2400,value3:2400},{name:"B",value1:3e3,value2:1398,value3:2210},{name:"C",value1:2e3,value2:9800,value3:2290},{name:"D",value1:2780,value2:3908,value3:2e3},{name:"E",value1:1890,value2:4800,value3:2181}],B=["#ff5869","#78909C","#39B4BF"],i=e=>a.jsx("div",{children:a.jsx(m,{data:A,xAxisDataKey:"name",barDataKeys:["value1","value2","value3"],colors:B,width:600,height:400,...e})});try{i.displayName="BarChartExample",i.__docgenInfo={description:"",displayName:"BarChartExample",props:{}}}catch{}const n={GaugeChart:[{language:"jsx",snippet:"<GaugeChart value={10} width={600} height={400} />",expandedSnippet:`
            import { GaugeChart } from './Charts';

            export const GaugeChartExample = (props) => {
                return <GaugeChart value={10} width={600} height={400} />;
            };

            `},{language:"tsx",snippet:"<GaugeChart value={10} width={600} height={400} />",expandedSnippet:`
            import { FC } from 'react';
            import { GaugeChart } from './Charts';

            export const GaugeChartExample: FC = (props: any) => {
                return <GaugeChart value={10} width={600} height={400} />;
            };
            `}],ScatterChart:[{language:"jsx",snippet:`
            <ScatterChart
                width={600}
                height={300}
                series={[
                    {
                        label: 'Series A',
                        data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
                    },
                    {
                        label: 'Series B',
                        data: data.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
                    },
                ]}
            />`,expandedSnippet:`
            import { ScatterChart } from './Charts';

            const data = [
                {
                    id: 'data-0',
                    x1: 329.39,
                    x2: 391.29,
                    y1: 443.28,
                    y2: 153.9,
                },
                {
                    id: 'data-1',
                    x1: 96.94,
                    x2: 139.6,
                    y1: 110.5,
                    y2: 217.8,
                },
                {
                    id: 'data-2',
                    x1: 336.35,
                    x2: 282.34,
                    y1: 175.23,
                    y2: 286.32,
                },
                {
                    id: 'data-3',
                    x1: 159.44,
                    x2: 384.85,
                    y1: 195.97,
                    y2: 325.12,
                },
                {
                    id: 'data-4',
                    x1: 188.86,
                    x2: 182.27,
                    y1: 351.77,
                    y2: 144.58,
                },
                {
                    id: 'data-5',
                    x1: 143.86,
                    x2: 360.22,
                    y1: 43.253,
                    y2: 146.51,
                },
                {
                    id: 'data-6',
                    x1: 202.02,
                    x2: 209.5,
                    y1: 376.34,
                    y2: 309.69,
                },
                {
                    id: 'data-7',
                    x1: 384.41,
                    x2: 258.93,
                    y1: 31.514,
                    y2: 236.38,
                },
                {
                    id: 'data-8',
                    x1: 256.76,
                    x2: 70.571,
                    y1: 231.31,
                    y2: 440.72,
                },
                {
                    id: 'data-9',
                    x1: 143.79,
                    x2: 419.02,
                    y1: 108.04,
                    y2: 20.29,
                },
                {
                    id: 'data-10',
                    x1: 103.48,
                    x2: 15.886,
                    y1: 321.77,
                    y2: 484.17,
                },
                {
                    id: 'data-11',
                    x1: 272.39,
                    x2: 189.03,
                    y1: 120.18,
                    y2: 54.962,
                },
                {
                    id: 'data-12',
                    x1: 23.57,
                    x2: 456.4,
                    y1: 366.2,
                    y2: 418.5,
                },
                {
                    id: 'data-13',
                    x1: 219.73,
                    x2: 235.96,
                    y1: 451.45,
                    y2: 181.32,
                },
                {
                    id: 'data-14',
                    x1: 54.99,
                    x2: 434.5,
                    y1: 294.8,
                    y2: 440.9,
                },
                {
                    id: 'data-15',
                    x1: 134.13,
                    x2: 383.8,
                    y1: 121.83,
                    y2: 273.52,
                },
                {
                    id: 'data-16',
                    x1: 12.7,
                    x2: 270.8,
                    y1: 287.7,
                    y2: 346.7,
                },
                {
                    id: 'data-17',
                    x1: 176.51,
                    x2: 119.17,
                    y1: 134.06,
                    y2: 74.528,
                },
                {
                    id: 'data-18',
                    x1: 65.05,
                    x2: 78.93,
                    y1: 104.5,
                    y2: 150.9,
                },
                {
                    id: 'data-19',
                    x1: 162.25,
                    x2: 63.707,
                    y1: 413.07,
                    y2: 26.483,
                },
                {
                    id: 'data-20',
                    x1: 68.88,
                    x2: 150.8,
                    y1: 74.68,
                    y2: 333.2,
                },
                {
                    id: 'data-21',
                    x1: 95.29,
                    x2: 329.1,
                    y1: 360.6,
                    y2: 422.0,
                },
                { id: 'data-22', x1: 390.62, x2: 10.01, y1: 330.72, y2: 488.06 },
            ];

            export const ScatterChartExample = (props) => {
                return (
                    <ScatterChart
                        width={600}
                        height={300}
                        series={[
                            {
                                label: 'Series A',
                                data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
                            },
                            {
                                label: 'Series B',
                                data: data.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
                            },
                        ]}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <ScatterChart
                width={600}
                height={300}
                series={[
                    {
                        label: 'Series A',
                        data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
                    },
                    {
                        label: 'Series B',
                        data: data.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
                    },
                ]}
            />`,expandedSnippet:`
            import { FC } from 'react';
            import { ScatterChart } from './Charts';

            const data = [
                {
                    id: 'data-0',
                    x1: 329.39,
                    x2: 391.29,
                    y1: 443.28,
                    y2: 153.9,
                },
                {
                    id: 'data-1',
                    x1: 96.94,
                    x2: 139.6,
                    y1: 110.5,
                    y2: 217.8,
                },
                {
                    id: 'data-2',
                    x1: 336.35,
                    x2: 282.34,
                    y1: 175.23,
                    y2: 286.32,
                },
                {
                    id: 'data-3',
                    x1: 159.44,
                    x2: 384.85,
                    y1: 195.97,
                    y2: 325.12,
                },
                {
                    id: 'data-4',
                    x1: 188.86,
                    x2: 182.27,
                    y1: 351.77,
                    y2: 144.58,
                },
                {
                    id: 'data-5',
                    x1: 143.86,
                    x2: 360.22,
                    y1: 43.253,
                    y2: 146.51,
                },
                {
                    id: 'data-6',
                    x1: 202.02,
                    x2: 209.5,
                    y1: 376.34,
                    y2: 309.69,
                },
                {
                    id: 'data-7',
                    x1: 384.41,
                    x2: 258.93,
                    y1: 31.514,
                    y2: 236.38,
                },
                {
                    id: 'data-8',
                    x1: 256.76,
                    x2: 70.571,
                    y1: 231.31,
                    y2: 440.72,
                },
                {
                    id: 'data-9',
                    x1: 143.79,
                    x2: 419.02,
                    y1: 108.04,
                    y2: 20.29,
                },
                {
                    id: 'data-10',
                    x1: 103.48,
                    x2: 15.886,
                    y1: 321.77,
                    y2: 484.17,
                },
                {
                    id: 'data-11',
                    x1: 272.39,
                    x2: 189.03,
                    y1: 120.18,
                    y2: 54.962,
                },
                {
                    id: 'data-12',
                    x1: 23.57,
                    x2: 456.4,
                    y1: 366.2,
                    y2: 418.5,
                },
                {
                    id: 'data-13',
                    x1: 219.73,
                    x2: 235.96,
                    y1: 451.45,
                    y2: 181.32,
                },
                {
                    id: 'data-14',
                    x1: 54.99,
                    x2: 434.5,
                    y1: 294.8,
                    y2: 440.9,
                },
                {
                    id: 'data-15',
                    x1: 134.13,
                    x2: 383.8,
                    y1: 121.83,
                    y2: 273.52,
                },
                {
                    id: 'data-16',
                    x1: 12.7,
                    x2: 270.8,
                    y1: 287.7,
                    y2: 346.7,
                },
                {
                    id: 'data-17',
                    x1: 176.51,
                    x2: 119.17,
                    y1: 134.06,
                    y2: 74.528,
                },
                {
                    id: 'data-18',
                    x1: 65.05,
                    x2: 78.93,
                    y1: 104.5,
                    y2: 150.9,
                },
                {
                    id: 'data-19',
                    x1: 162.25,
                    x2: 63.707,
                    y1: 413.07,
                    y2: 26.483,
                },
                {
                    id: 'data-20',
                    x1: 68.88,
                    x2: 150.8,
                    y1: 74.68,
                    y2: 333.2,
                },
                {
                    id: 'data-21',
                    x1: 95.29,
                    x2: 329.1,
                    y1: 360.6,
                    y2: 422.0,
                },
                { id: 'data-22', x1: 390.62, x2: 10.01, y1: 330.72, y2: 488.06 },
            ];

            export const ScatterChartExample: FC = (props: any) => {
                return (
                    <ScatterChart
                        width={600}
                        height={300}
                        series={[
                            {
                                label: 'Series A',
                                data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
                            },
                            {
                                label: 'Series B',
                                data: data.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
                            },
                        ]}
                        {...props}
                    />
                );
            };
            `}],BarChart:[{language:"jsx",snippet:`
            <BarChart
                data={data}
                xAxisDataKey="name"
                barDataKeys={['value1', 'value2', 'value3']}
                colors={colors}
                width={600}
                height={400}
            />`,expandedSnippet:`
            import React, { FC } from 'react';
            import { BarChart } from './BarChart';

            const data = [
                { name: 'A', value1: 4000, value2: 2400, value3: 2400 },
                { name: 'B', value1: 3000, value2: 1398, value3: 2210 },
                { name: 'C', value1: 2000, value2: 9800, value3: 2290 },
                { name: 'D', value1: 2780, value2: 3908, value3: 2000 },
                { name: 'E', value1: 1890, value2: 4800, value3: 2181 },
            ];

            const colors = ['#8884d8', '#82ca9d', '#ffc658'];

            export const BarChartExample: FC = (props: any) => {
                return (
                    <div>
                        <h2>Bar chart example</h2>
                        <BarChart
                            data={data}
                            xAxisDataKey="name"
                            barDataKeys={['value1', 'value2', 'value3']}
                            colors={colors}
                            width={600}
                            height={400}
                        />
                    </div>
                );
            };

            `},{language:"tsx",snippet:`
            <BarChart
                data={data}
                xAxisDataKey="name"
                barDataKeys={['value1', 'value2', 'value3']}
                colors={colors}
                width={600}
                height={400}
            />`,expandedSnippet:`
            import React, { FC } from 'react';
            import { BarChart } from './BarChart';

            const data = [
                { name: 'A', value1: 4000, value2: 2400, value3: 2400 },
                { name: 'B', value1: 3000, value2: 1398, value3: 2210 },
                { name: 'C', value1: 2000, value2: 9800, value3: 2290 },
                { name: 'D', value1: 2780, value2: 3908, value3: 2000 },
                { name: 'E', value1: 1890, value2: 4800, value3: 2181 },
            ];

            const colors = ['#8884d8', '#82ca9d', '#ffc658'];

            export const BarChartExample: FC = (props: any) => {
                return (
                    <div>
                        <h2>Bar chart example</h2>
                        <BarChart
                            data={data}
                            xAxisDataKey="name"
                            barDataKeys={['value1', 'value2', 'value3']}
                            colors={colors}
                            width={600}
                            height={400}
                        />
                    </div>
                );
            };
            `}],LorenzCurve:[{language:"jsx",snippet:`
            <LorenzCurve
                data={data}
                width={600}
                height={400}
                strokeColor="#39B4BF"
                xAxisLabel="Custom X-axis Label"
                yAxisLabel="Custom Y-axis Label"
            />`,expandedSnippet:`
            import React, { FC } from 'react';
            import { LorenzCurve } from './Charts';

            const data = [
                { percent: 0.1, value: 0.02 },
                { percent: 0.2, value: 0.06 },
                { percent: 0.3, value: 0.12 },
                { percent: 0.4, value: 0.22 },
                { percent: 0.5, value: 0.35 },
            ];

            export const LorenzCurveExample: FC = (props: any) => {
                return (
                    <div>
                        <LorenzCurve
                            data={data}
                            width={600}
                            height={400}
                            strokeColor="#39B4BF"
                            xAxisLabel="Custom X-axis Label"
                            yAxisLabel="Custom Y-axis Label"
                        />
                    </div>
                );
            };

            `},{language:"tsx",snippet:`
            <LorenzCurve
                data={data}
                width={600}
                height={400}
                strokeColor="#39B4BF"
                xAxisLabel="Custom X-axis Label"
                yAxisLabel="Custom Y-axis Label"
            />`,expandedSnippet:`
            import React, { FC } from 'react';
            import { LorenzCurve } from './Charts';

            const data = [
                { percent: 0.1, value: 0.02 },
                { percent: 0.2, value: 0.06 },
                { percent: 0.3, value: 0.12 },
                { percent: 0.4, value: 0.22 },
                { percent: 0.5, value: 0.35 },
            ];

            export const LorenzCurveExample: FC = (props: any) => {
                return (
                    <div>
                        <LorenzCurve
                            data={data}
                            width={600}
                            height={400}
                            strokeColor="#39B4BF"
                            xAxisLabel="Custom X-axis Label"
                            yAxisLabel="Custom Y-axis Label"
                        />
                    </div>
                );
            };
            `}],LineChart:[{language:"jsx",snippet:"return <LineChart series={data} width={600} height={400} />",expandedSnippet:`
            import { LineChart } from './Charts';

            const data = [
                {
                    label: 'element 1',
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    showMark: false,
                    stackOffset: 'diverging',
                    curve: 'natural',
                    connectNulls: true,
                },
                {
                    label: 'element 2',
                    data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
                    connectNulls: true,
                },
                {
                    label: 'element 3',
                    data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
                    connectNulls: true,
                },
            ];

            export const LineChartExample = (props) => {
                return <LineChart series={data} width={600} height={400} />;
            };
            `},{language:"tsx",snippet:"return <LineChart series={data} width={600} height={400} />",expandedSnippet:`
            import { FC } from 'react';
            import { LineChart, LineChartSeriesProps } from './Charts';

            const data: LineChartSeriesProps[] = [
                {
                    label: 'element 1',
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    showMark: false,
                    stackOffset: 'diverging',
                    curve: 'natural',
                    connectNulls: true,
                },
                {
                    label: 'element 2',
                    data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
                    connectNulls: true,
                },
                {
                    label: 'element 3',
                    data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
                    connectNulls: true,
                },
            ];

            export const LineChartExample: FC = (props: any) => {
                return <LineChart series={data} width={600} height={400} />;
            };
            `}],PieChart:[{language:"jsx",snippet:`
            <PieChart
                data={data}
                width={600}
                height={300}
                colors={colors}
                innerRadius={30}
                outerRadius={100}
                paddingAngle={5}
                cornerRadius={5}
                startAngle={-90}
                endAngle={180}
                cx={150}
                cy={150}
            />`,expandedSnippet:`
            import React, { FC } from 'react';
            import { PieChart } from './Charts';

            const data = [
                { name: 'Category A', value: 30 },
                { name: 'Category B', value: 15 },
                { name: 'Category C', value: 10 },
                { name: 'Category D', value: 5 },
                { name: 'Category E', value: 5 },
            ];

            const colors = ['#39b4bf', '#3098a1', '#277b83', '#1e5f64', '#154246'];

            export const PieChartExample: FC = (props: any) => {
                return (
                    <div>
                        <PieChart
                            data={data}
                            width={600}
                            height={300}
                            colors={colors}
                            innerRadius={30}
                            outerRadius={100}
                            paddingAngle={5}
                            cornerRadius={5}
                            startAngle={-90}
                            endAngle={180}
                            cx={150}
                            cy={150}
                        />
                    </div>
                );
            };
            `},{language:"tsx",snippet:`
            <PieChart
                data={data}
                width={600}
                height={300}
                colors={colors}
                innerRadius={30}
                outerRadius={100}
                paddingAngle={5}
                cornerRadius={5}
                startAngle={-90}
                endAngle={180}
                cx={150}
                cy={150}
            />`,expandedSnippet:`
            import React, { FC } from 'react';
            import { PieChart } from './Charts';

            const data = [
                { name: 'Category A', value: 30 },
                { name: 'Category B', value: 15 },
                { name: 'Category C', value: 10 },
                { name: 'Category D', value: 5 },
                { name: 'Category E', value: 5 },
            ];

            const colors = ['#39b4bf', '#3098a1', '#277b83', '#1e5f64', '#154246'];

            export const PieChartExample: FC = (props: any) => {
                return (
                    <div>
                        <PieChart
                            data={data}
                            width={600}
                            height={300}
                            colors={colors}
                            innerRadius={30}
                            outerRadius={100}
                            paddingAngle={5}
                            cornerRadius={5}
                            startAngle={-90}
                            endAngle={180}
                            cx={150}
                            cy={150}
                        />
                    </div>
                );
            };
            `}],ComposedChart:[{language:"jsx",snippet:`
            <LineBarAreaComposedChart
                data={data}
                xAxisKey="name"
                colors={{
                    cartesianGrid: {
                        strokeColor: '#fff',
                    },
                }}
            />`,expandedSnippet:`
            import React, { FC } from 'react';
            import {
                ILineBarAreaComposedChartData,
                LineBarAreaComposedChart,
            } from './Charts';

            export const LineBarAreaComposedChartExample: FC = (props: any) => {
                const data: ILineBarAreaComposedChartData = {
                    values: [
                        {
                            name: 'Page A',
                            uv: 590,
                            pv: 800,
                            amt: 1400,
                            cnt: 490,
                        },
                        {
                            name: 'Page B',
                            uv: 868,
                            pv: 967,
                            amt: 1506,
                            cnt: 590,
                        },
                        {
                            name: 'Page C',
                            uv: 1397,
                            pv: 1098,
                            amt: 989,
                            cnt: 350,
                        },
                        {
                            name: 'Page D',
                            uv: 1480,
                            pv: 1200,
                            amt: 1228,
                            cnt: 480,
                        },
                        {
                            name: 'Page E',
                            uv: 1520,
                            pv: 1108,
                            amt: 1100,
                            cnt: 460,
                        },
                        {
                            name: 'Page F',
                            uv: 1400,
                            pv: 680,
                            amt: 1700,
                            cnt: 380,
                        },
                    ],
                    config: [
                        {
                            chart: 'area',
                            dataKey: 'uv',
                            options: {
                                fill: 'green',
                                stroke: 'blue',
                                type: 'monotone',
                            },
                        },
                        {
                            chart: 'bar',
                            dataKey: 'pv',
                            options: {
                                stroke: 'yellow',
                                fill: 'yellow',
                            },
                        },
                        {
                            chart: 'line',
                            dataKey: 'amt',
                            options: {
                                stroke: 'purple',
                                fill: 'black',
                                type: 'monotone',
                            },
                        },
                        {
                            chart: 'scatter',
                            dataKey: 'cnt',
                            options: {
                                stroke: 'white',
                                strokeWidth: 5,
                                fill: 'red',
                            },
                        },
                    ],
                };

                return (
                    <LineBarAreaComposedChart
                        data={data}
                        xAxisKey="name"
                        colors={{
                            cartesianGrid: {
                                strokeColor: '#fff',
                            },
                        }}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <LineBarAreaComposedChart
                data={data}
                xAxisKey="name"
                colors={{
                    cartesianGrid: {
                        strokeColor: '#fff',
                    },
                }}
            />`,expandedSnippet:`
            import React, { FC } from 'react';
            import {
                ILineBarAreaComposedChartData,
                LineBarAreaComposedChart,
            } from './Charts';

            export const LineBarAreaComposedChartExample: FC = (props: any) => {
                const data: ILineBarAreaComposedChartData = {
                    values: [
                        {
                            name: 'Page A',
                            uv: 590,
                            pv: 800,
                            amt: 1400,
                            cnt: 490,
                        },
                        {
                            name: 'Page B',
                            uv: 868,
                            pv: 967,
                            amt: 1506,
                            cnt: 590,
                        },
                        {
                            name: 'Page C',
                            uv: 1397,
                            pv: 1098,
                            amt: 989,
                            cnt: 350,
                        },
                        {
                            name: 'Page D',
                            uv: 1480,
                            pv: 1200,
                            amt: 1228,
                            cnt: 480,
                        },
                        {
                            name: 'Page E',
                            uv: 1520,
                            pv: 1108,
                            amt: 1100,
                            cnt: 460,
                        },
                        {
                            name: 'Page F',
                            uv: 1400,
                            pv: 680,
                            amt: 1700,
                            cnt: 380,
                        },
                    ],
                    config: [
                        {
                            chart: 'area',
                            dataKey: 'uv',
                            options: {
                                fill: 'green',
                                stroke: 'blue',
                                type: 'monotone',
                            },
                        },
                        {
                            chart: 'bar',
                            dataKey: 'pv',
                            options: {
                                stroke: 'yellow',
                                fill: 'yellow',
                            },
                        },
                        {
                            chart: 'line',
                            dataKey: 'amt',
                            options: {
                                stroke: 'purple',
                                fill: 'black',
                                type: 'monotone',
                            },
                        },
                        {
                            chart: 'scatter',
                            dataKey: 'cnt',
                            options: {
                                stroke: 'white',
                                strokeWidth: 5,
                                fill: 'red',
                            },
                        },
                    ],
                };

                return (
                    <LineBarAreaComposedChart
                        data={data}
                        xAxisKey="name"
                        colors={{
                            cartesianGrid: {
                                strokeColor: '#fff',
                            },
                        }}
                    />
                );
            };
            `}]},d=e=>{const t={values:[{name:"Page A",uv:590,pv:800,amt:1400,cnt:490},{name:"Page B",uv:868,pv:967,amt:1506,cnt:590},{name:"Page C",uv:1397,pv:1098,amt:989,cnt:350},{name:"Page D",uv:1480,pv:1200,amt:1228,cnt:480},{name:"Page E",uv:1520,pv:1108,amt:1100,cnt:460},{name:"Page F",uv:1400,pv:680,amt:1700,cnt:380}],config:[{chart:"area",dataKey:"uv",options:{fill:"green",stroke:"blue",type:"monotone"}},{chart:"bar",dataKey:"pv",options:{stroke:"yellow",fill:"yellow"}},{chart:"line",dataKey:"amt",options:{stroke:"purple",fill:"black",type:"monotone"}},{chart:"scatter",dataKey:"cnt",options:{stroke:"white",strokeWidth:5,fill:"red"}}]};return a.jsx(C,{data:t,xAxisKey:"name",colors:{cartesianGrid:{strokeColor:"#fff"}},...e})};try{d.displayName="ComposedChartExample",d.__docgenInfo={description:"",displayName:"ComposedChartExample",props:{}}}catch{}const o=e=>a.jsx(v,{value:10,valueMax:12,cornerRadius:"50%",width:600,height:400,text:({value:t,valueMax:h})=>`${t} attempts / ${h} total`,...e});try{o.displayName="GaugeChartExample",o.__docgenInfo={description:"",displayName:"GaugeChartExample",props:{}}}catch{}const _=[{label:"element 1",data:[2,5.5,2,8.5,1.5,5],showMark:!1,stackOffset:"diverging",curve:"natural",connectNulls:!0,area:!0},{label:"element 2",data:[null,null,null,null,5.5,2,8.5,1.5,5],connectNulls:!0,area:!0},{label:"element 3",data:[7,8,5,4,null,null,2,5.5,1],connectNulls:!0,area:!0}],s=e=>a.jsx(g,{series:_,width:600,height:400,...e});try{s.displayName="LineChartExample",s.__docgenInfo={description:"",displayName:"LineChartExample",props:{}}}catch{}const S=[{percent:.1,value:.02},{percent:.2,value:.06},{percent:.3,value:.12},{percent:.4,value:.22},{percent:.5,value:.35}],l=e=>a.jsx(f,{data:S,width:600,height:400,strokeColor:"#39B4BF",xAxisLabel:"Custom X-axis Label",yAxisLabel:"Custom Y-axis Label",...e});try{l.displayName="LorenzCurveExample",l.__docgenInfo={description:"",displayName:"LorenzCurveExample",props:{}}}catch{}const w=[{name:"Category A",value:30},{name:"Category B",value:15},{name:"Category C",value:10},{name:"Category D",value:5},{name:"Category E",value:5}],E=["#39b4bf","#3098a1","#277b83","#1e5f64","#154246"],p=e=>a.jsx("div",{children:a.jsx(L,{data:w,width:600,height:300,colors:E,innerRadius:30,outerRadius:100,paddingAngle:5,cornerRadius:5,startAngle:-90,endAngle:180,cx:150,cy:150,...e})});try{p.displayName="PieChartExample",p.__docgenInfo={description:"",displayName:"PieChartExample",props:{}}}catch{}const c=[{id:"data-0",x1:329.39,x2:391.29,y1:443.28,y2:153.9},{id:"data-1",x1:96.94,x2:139.6,y1:110.5,y2:217.8},{id:"data-2",x1:336.35,x2:282.34,y1:175.23,y2:286.32},{id:"data-3",x1:159.44,x2:384.85,y1:195.97,y2:325.12},{id:"data-4",x1:188.86,x2:182.27,y1:351.77,y2:144.58},{id:"data-5",x1:143.86,x2:360.22,y1:43.253,y2:146.51},{id:"data-6",x1:202.02,x2:209.5,y1:376.34,y2:309.69},{id:"data-7",x1:384.41,x2:258.93,y1:31.514,y2:236.38},{id:"data-8",x1:256.76,x2:70.571,y1:231.31,y2:440.72},{id:"data-9",x1:143.79,x2:419.02,y1:108.04,y2:20.29},{id:"data-10",x1:103.48,x2:15.886,y1:321.77,y2:484.17},{id:"data-11",x1:272.39,x2:189.03,y1:120.18,y2:54.962},{id:"data-12",x1:23.57,x2:456.4,y1:366.2,y2:418.5},{id:"data-13",x1:219.73,x2:235.96,y1:451.45,y2:181.32},{id:"data-14",x1:54.99,x2:434.5,y1:294.8,y2:440.9},{id:"data-15",x1:134.13,x2:383.8,y1:121.83,y2:273.52},{id:"data-16",x1:12.7,x2:270.8,y1:287.7,y2:346.7},{id:"data-17",x1:176.51,x2:119.17,y1:134.06,y2:74.528},{id:"data-18",x1:65.05,x2:78.93,y1:104.5,y2:150.9},{id:"data-19",x1:162.25,x2:63.707,y1:413.07,y2:26.483},{id:"data-20",x1:68.88,x2:150.8,y1:74.68,y2:333.2},{id:"data-21",x1:95.29,x2:329.1,y1:360.6,y2:422},{id:"data-22",x1:390.62,x2:10.01,y1:330.72,y2:488.06}],x=e=>a.jsx(b,{width:600,height:300,series:[{label:"Series A",data:c.map(t=>({x:t.x1,y:t.y1,id:t.id}))},{label:"Series B",data:c.map(t=>({x:t.x1,y:t.y2,id:t.id}))}],...e});try{x.displayName="ScatterChartExample",x.__docgenInfo={description:"",displayName:"ScatterChartExample",props:{}}}catch{}function u(e){return a.jsxs("div",{className:"content",children:[a.jsxs("h1",{children:["Charts v",void 0]}),a.jsx("h3",{children:"Gauge chart"}),a.jsx(r,{snippets:n.GaugeChart,children:a.jsx(o,{})}),a.jsx("h3",{children:"Scatter chart"}),a.jsx(r,{snippets:n.ScatterChart,children:a.jsx(x,{})}),a.jsx("h3",{children:"Stacked bar chart"}),a.jsx(r,{snippets:n.BarChart,children:a.jsx(i,{})}),a.jsx("h3",{children:"Line chart"}),a.jsx(r,{snippets:n.LineChart,children:a.jsx(s,{})}),a.jsx("h3",{children:"Lorenz curve"}),a.jsx(r,{snippets:n.LorenzCurve,children:a.jsx(l,{})}),a.jsx("h3",{children:"Pie chart example with inner radius"}),a.jsx(r,{snippets:n.PieChart,children:a.jsx(p,{})}),a.jsx("h3",{children:"Dynamically composed chart"}),a.jsx(r,{snippets:n.ComposedChart,children:a.jsx(d,{})})]})}function D(e={}){const{wrapper:t}={...y(),...e.components};return t?a.jsx(t,{...e,children:a.jsx(u,{...e})}):u()}export{i as B,d as C,o as G,s as L,D as M,p as P,x as S,l as a};
