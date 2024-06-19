import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Statistics } from '../Statistics'

import { mockWithDataToStatistic, mockWithDataToStatisticWhithoutEu } from '../../../utils/mockTest'

describe("Statistics component", () => {
  it('deveria mostrar 2 categorias no ranking', () => {
    render(<Statistics bill={mockWithDataToStatistic} />)

    expect(screen.getByText("lazer")).toBeInTheDocument()
    expect(screen.getByText("R$ 300,00")).toBeInTheDocument()

    expect(screen.getByText("vestuario")).toBeInTheDocument()
    expect(screen.getByText("R$ 161,90")).toBeInTheDocument()
  })

  it('não deveria mostrar o component caso não tenha nenhum gasto para a pessoa "Eu"', () => {
    render(<Statistics bill={mockWithDataToStatisticWhithoutEu} />)

    expect(screen.queryByTestId('ranking')).toBeNull();
  })
})