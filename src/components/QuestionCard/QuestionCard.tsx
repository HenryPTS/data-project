import React, { FC } from 'react'
import styled from '@emotion/styled'

type CardContainerProps = {
  selected?: boolean
}
const CardContainer = styled('div')<CardContainerProps>`
  margin: 0 15px;
  border-radius: 6px;
  display: inline-flex;
  box-sizing: border-box;
  flex: 1 1 400px;
  align-items: center;
  padding: 18px 16px;
  justify-content: center;
  background: ${props => props.selected ? '#f4ffee' : '#F5F8FA'};
  cursor: pointer;
`
const Title = styled('span')`
  margin: 0;
  color: #525252;
  font-size: 14px;
  font-weight: 500;
`

type Props = {
  questionTitle: string
  selectQuestion: (e: any) => void
  selected: boolean
}

const QuestionCard: FC<Props> = ({
  questionTitle,
  selectQuestion,
  selected
}) => {
  return (
    <CardContainer selected={selected} onClick={selectQuestion}>
      <Title>{questionTitle}</Title>
    </CardContainer>
  )
}


export default QuestionCard;