import React, { FC, useEffect, useState } from 'react';
import QuestionCard from './components/QuestionCard/QuestionCard'
import styled from '@emotion/styled'
import axios from 'axios'
import { Survey, Question, Visualisation } from './types';
import SurveySelector from './components/SurveySelector/SurveySelector';
import LineChart from './components/LineChart/LineChart'
import PieChart from './components/PieChart/PieChart'

const AppContainer = styled('div')`
`

const ChartDetails = styled('div')`
  display: inline-block;
`

const CardsContainer = styled('div')`
  display: flex;
  padding: 0 380px;
  justify-content: center;
`

const ChartsContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 50px;
  justify-content: center;
`
const Select = styled('select')`
  width: 600px;
  margin: 20px auto;
  display: block;
  border: 1px solid black;
  background: #f4ffee;
  outline: transparent;
  padding: 17px;
  font-size: larger;
`

type State = {
  loading: boolean,
  surveys: Survey[],
  surveyIdSelected: number,
  questionIdsSelected: number[],
  visualisationType: Visualisation,
}

const App: FC = () => {
  const [state, setState] = useState<State>({
    loading: true,
    surveys: [],
    surveyIdSelected: 0,
    questionIdsSelected: [],
    visualisationType: 'line',
  })

  const selectSurveyHandler = (surveyId: number): void => {
    setState({ ...state, surveyIdSelected: surveyId, questionIdsSelected: [] })
  }

  const selectQuestionHandler = (questionId: number): void => {
    const { questionIdsSelected } = state
    if (questionIdsSelected.includes(questionId)) {
      const idx = questionIdsSelected.findIndex(q => q === questionId)
      questionIdsSelected.splice(idx, 1)
    } else {
      questionIdsSelected.push(questionId)
    }
    setState({
      ...state,
      questionIdsSelected,
    })
  }

  useEffect(() => {
    async function getData() {
      const { data: { surveys } } = await axios.get('https://my-json-server.typicode.com/focaldata/demo/db')
      const firstSurvey = surveys[0]
      setState({
        ...state,
        surveyIdSelected: firstSurvey.surveyId || 0,
        loading: false,
        surveys
      })
    }
    getData()
  }, [])

  const surveySelected = state.surveys.find(survey => survey.surveyId === state.surveyIdSelected)
  let questionSelected: Question[] = [];
  if (surveySelected) {
    questionSelected = surveySelected.questions.filter(q => state.questionIdsSelected.includes(q.questionId))
  }
  
  return (
    <AppContainer>
      {state.loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <SurveySelector
            surveyIdSelected={state.surveyIdSelected}
            surveys={state.surveys}
            selectSurvey={selectSurveyHandler}
          />
          <Select onChange={(e) => { setState({ ...state, visualisationType: e.target.value }) }}>
            <option value={'line'}>Line Chart</option>
            <option value={'pie'}>Pie Chart</option>
          </Select>
          <CardsContainer>
            {surveySelected?.questions.map(question => (
              <QuestionCard
                selectQuestion={() => selectQuestionHandler(question.questionId)}
                selected={state.questionIdsSelected.includes(question.questionId)}
                key={question.questionId}
                questionTitle={question.questionTitle}
              />
            ))}
          </CardsContainer>
          <ChartsContainer>
            {state.visualisationType === 'pie' && questionSelected?.map(q => (
              <ChartDetails key={q.questionId}>
                <PieChart
                  title={q.questionTitle}
                  width={300}
                  height={300}
                  data={q.answerOptions}
                  display={true}
                />
              </ChartDetails>
            ))}
            {state.visualisationType === 'line' && (
              <ChartDetails>
                <LineChart
                  data={questionSelected.map(q => ([...q.answerOptions]))}
                  display={true}
                />
              </ChartDetails>
            )}
          </ChartsContainer>
        </>
      )}
    </AppContainer>
  )
}

export default App;
