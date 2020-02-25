import React, { FC, useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled'
import 'chart.js';
import ChartComponent, { Bar, LinearComponentProps } from 'react-chartjs-2';
import { AnswerOption } from '../../types';

const PieChartContainer = styled('div')`
  height: 600px;
  width: 900px;
  margin: 60px auto;
`

type IProps = {
  readonly data: AnswerOption[][];
  readonly display?: boolean;
}

const LineChart: FC<IProps> = ({
  data: propData,
  display = false,
}) => {
  const canvasRef = useRef<ChartComponent<LinearComponentProps>>(null);
  const [state, setState] = useState()
  useEffect(() => {
    if (propData && canvasRef.current) {
      const selected = propData.reduce((prev, curr) => {
        const reduced = curr.reduce((p, c) => p.concat(c.selectedByRespondents), [])
        return [...prev, reduced]
      }, [])
      setState(selected)
    }
  }, [propData])

  return (
    <PieChartContainer>
      <Bar
        legend={{ display }}
        ref={canvasRef}
        data={getPieData(state)}
        options={{
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                min: 0,
              }
            }]
          }
        }}
      />
    </PieChartContainer>
  );
}

function getPieData(data = []) {
  const colors = ['#CB4335', '#F1948A', '#AED6F1', '#58D68D', '#239B56']
  const mappedData = ({
    labels: [
      "Strongly disagree",
      "Disagree",
      "Neither agree nor disagree",
      "Agree",
      "Strongly agree",
    ],
    datasets: data.map((datum, i) => ({
      label: `Question #${i}`,
      data: datum,
      backgroundColor: colors[i]
    }))
  })
  return mappedData
}

export default LineChart