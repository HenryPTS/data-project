/** @jsx jsx */
import React from 'react'
import SelectTitle from '../SelectTitle/SelectTitle'
import { Survey } from '../../types'
import { jsx } from '@emotion/core'

type Props = {
  surveys: Survey[],
  surveyIdSelected: number,
  selectSurvey: (surveyId: number) => void
}

const SurveySelector: React.FC<Props> = ({
  surveys,
  surveyIdSelected,
  selectSurvey
}) => {
  return (
    <div
      css={{
        display: 'flex',
        width: '700px',
        justifyContent: 'space-around',
        margin: '50px auto 0'
      }}
    >
      {surveys.map(survey => (
        <SelectTitle
          selectSurvey={() => selectSurvey(survey.surveyId)}
          selected={surveyIdSelected === survey.surveyId}
          key={survey.surveyId}
        >
          {survey.title}
        </SelectTitle>
      ))}
    </div>
  )
}

export default SurveySelector
