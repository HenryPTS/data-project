import React, { FC, useRef, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

interface Response {
  readonly answerOption: number;
  readonly text: string;
  selectedByRespondents: number;
}

interface IProps {
  readonly data: Response[];
  readonly display?: boolean;
}

const MyD3Component: FC<IProps> = ({
  data: propData,
  display = false
}) => {
  const canvasRef = useRef(null);
  const [state, setState] = useState()
  useEffect(
    () => {
      if (propData && canvasRef.current) {
        const selected = propData.reduce<number[]>((prev, curr): number[] => prev.concat(curr.selectedByRespondents), [])
        setState(selected)
      }
    }, [propData])

  return (
    <Pie legend={{ display }} ref={canvasRef} data={getPieData(state)} width={400} height={400} />
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

export default MyD3Component