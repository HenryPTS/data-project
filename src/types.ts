export type Text = "Strongly disagree"
| "Disagree"
| "Neither agree nor disagree"
| "Agree"
| "Strongly agree"


export interface AnswerOption {
  readonly answerOption: number
  readonly text: Text
  selectedByRespondents: number
}

export interface Question {
  questionId: number
  questionTitle: string
  answerOptions: AnswerOption[]
}

export interface Survey {
  surveyId: number
  title: string
  questions: Question[]
}

export type Visualisation = 'line' | 'pie' | 'none' | string