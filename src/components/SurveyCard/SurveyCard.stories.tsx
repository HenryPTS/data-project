import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'
import SurveyCardC from './SurveyCard';

export const SurveyCard = () => (
  <SurveyCardC />
)

export default {
  title: 'SurveyCard',
  decorators: [withKnobs]
}