import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import NewPeople from '../NewPeople';

const navigate = jest.fn()

jest.mock('../../../../.env', () => ({
  __esModule: true,
  ...jest.requireActual('../../../../.env')
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate
}))

describe("New people component", () => {
  it('should render input on screen', () => {
    render(<NewPeople />)

    const peopleInput = screen.getByPlaceholderText('Nome da pessoa')

    expect(peopleInput).toBeInTheDocument()
  })

  it('should render button on screen', () => {
    render(<NewPeople />)

    const addPeopleBtn = screen.getByText('Cadastrar')

    expect(addPeopleBtn).toBeInTheDocument()
  })

  // Deveria trocar o valor dos inputs quando o usuario digitar
  it('should change input values ​​when typing', () => {
    render(<NewPeople />)

    const peopleInputElement = screen.getByPlaceholderText('Nome da pessoa') as HTMLInputElement

    expect(peopleInputElement.value).toEqual("")

    fireEvent.change(peopleInputElement, { target: { value: 'Teste' } })
    
    expect(peopleInputElement.value).toBe('Teste')
  })

  it('should return error in both inputs when clicking submit without filling them', () => {
    render(<NewPeople />)

    const addPeopleBtn = screen.getByText('Cadastrar')
    fireEvent.click(addPeopleBtn)

    const inputError = screen.getByText('Nome não pode ser vazio!')
    
    expect(inputError).toBeInTheDocument()
  })
})