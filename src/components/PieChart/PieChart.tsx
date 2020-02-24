import React, { ReactElement, useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled'
import 'chart.js';
import ChartComponent, { Pie, LinearComponentProps } from 'react-chartjs-2';
import { AnswerOption } from '../../types';

const PieChartContainer = styled('div')`
  margin: 60px auto;
`
const Legend = styled('h4')`
  padding: 0;
  margin: 0;
  color: #0c0c0cd9;
  text-align: center;
  box-sizing: border-box;
  position: relative;
  top: -7px;
  width: 380px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

`

type IProps = {
  readonly data: AnswerOption[];
  readonly display?: boolean;
  height: number;
  width: number;
  title?: string | undefined
}

function PieChart(props: IProps): ReactElement<IProps> {
  const {
    data: propData,
    display = false,
    height,
    width,
    title
  } = props
  const canvasRef = useRef<ChartComponent<LinearComponentProps>>(null);
  const [state, setState] = useState()

  useEffect(
    () => {
      if (propData) {
        const selected = propData.reduce<number[]>((prev, curr): number[] => prev.concat(curr.selectedByRespondents), [])
        setState(selected)
      }
    }, [propData])

  return (
    <PieChartContainer>
      <Pie
        legend={{ display }}
        ref={canvasRef}
        data={getPieData(state)}
        width={width}
        height={height}
        options={{
          maintainAspectRatio: false,
          responsive: true
        }}
      />
      <Legend>{title}</Legend>
    </PieChartContainer>
  );
}

function getPieData(data = []) {
  return ({
    labels: [
      "Strongly disagree",
      "Disagree",
      "Neither agree nor disagree",
      "Agree",
      "Strongly agree",
    ],
    datasets: [{
      data,
      backgroundColor: [
      '#CB4335',
      '#F1948A',
      '#AED6F1',
      '#58D68D',
      '#239B56'
      ]
    }]
  })
}

export default PieChart