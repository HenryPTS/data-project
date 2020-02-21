import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'
import PieChartC from './PieChart';

const defaultdata = [
  {
    "answerOption": 1,
    "text": "Strongly disagree",
    "selectedByRespondents": 30
  },
  {
    "answerOption": 2,
    "text": "Disagree",
    "selectedByRespondents": 10
  },
  {
    "answerOption": 3,
    "text": "Neither agree nor disagree",
    "selectedByRespondents": 20
  },
  {
    "answerOption": 4,
    "text": "Agree",
    "selectedByRespondents": 10
  },
  {
    "answerOption": 5,
    "text": "Strongly agree",
    "selectedByRespondents": 30
  }
]


export const PieChart = () => (
  <div style={{ width: '500px', height: '500px' }}>
    <PieChartC data={defaultdata} />
  </div>
)

export default {
  title: 'PieChart',
  decorators: [withKnobs]
}