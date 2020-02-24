import React from 'react'
import styled from '@emotion/styled'
type TitleProps = {
  selected?: boolean
}

const Container = styled('div')`
  padding: 6px 3px;
  border-radius: 10%;
  cursor: pointer;
`
const Title = styled('span')<TitleProps>`
  font-size: 23px;
  color: ${props => props.selected ? 'rgb(214, 244, 70)' : 'rgb(48, 48, 48)'};
  font-weight: 600;
`

type Props = {
  selected: boolean
  selectSurvey: () => void
}

const SelectTitle: React.FC<Props> = ({ selected, children, selectSurvey }) => {
  return (
    <Container onClick={selectSurvey}>
      <Title selected={selected}>
        {children}
      </Title>
    </Container>
  )
}

export default SelectTitle
