import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import NewCard from '../NewCard';

const navigate = jest.fn()

jest.mock('../../../../.env', () => ({
  __esModule: true,
  ...jest.requireActual('../../../../.env')
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate
}))

describe("New card component", () => {
  it('should render 2 inputs on screen', () => {
    render(<NewCard />)

    const cardInputName = screen.getByPlaceholderText('Nome do cartão')
    const cardInputColor = screen.getByPlaceholderText('Selecione a cor')

    expect(cardInputName).toBeInTheDocument()
    expect(cardInputColor).toBeInTheDocument()
  })

  it('should render 2 buttons on screen', () => {
    render(<NewCard />)

    const addCardBtn = screen.getByText('Cadastrar')

    expect(addCardBtn).toBeInTheDocument()
  })

  // Deveria trocar o valor dos inputs quando o usuario digitar
  it('should change input values ​​when typing', () => {
    render(<NewCard />)

    const cardInputElement = screen.getByPlaceholderText('Nome do cartão') as HTMLInputElement
    const cardInputColorElement = screen.getByPlaceholderText('Selecione a cor') as HTMLInputElement

    expect(cardInputElement.value).toEqual("")
    expect(cardInputColorElement.value).toEqual("#000000")

    fireEvent.change(cardInputElement, { target: { value: 'Teste' } })
    fireEvent.change(cardInputColorElement, { target: { value: '#fefefe' } })
    
    expect(cardInputElement.value).toBe('Teste')
    expect(cardInputColorElement.value).toBe('#fefefe')
  })

  it('should return error in both inputs when clicking submit without filling them', () => {
    render(<NewCard />)

    const addCardBtn = screen.getByText('Cadastrar')
    fireEvent.click(addCardBtn)

    const inputNameError = screen.getByText('Nome não pode ser vazio!')
    const inputColorError = screen.getByText('Cor não pode ser vazia!')
    
    expect(inputNameError).toBeInTheDocument()
    expect(inputColorError).toBeInTheDocument()
  })
})