import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import NewCategory from '../NewCategory';

const navigate = jest.fn()

jest.mock('../../../../.env', () => ({
  __esModule: true,
  ...jest.requireActual('../../../../.env')
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate
}))

describe("New caegory component", () => {
  it('should render input on screen', () => {
    render(<NewCategory />)

    const categoryInput = screen.getByPlaceholderText('Nome da categoria')

    expect(categoryInput).toBeInTheDocument()
  })

  it('should render button on screen', () => {
    render(<NewCategory />)

    const addCategoryBtn = screen.getByText('Cadastrar')

    expect(addCategoryBtn).toBeInTheDocument()
  })

  // Deveria trocar o valor dos inputs quando o usuario digitar
  it('should change input values ​​when typing', () => {
    render(<NewCategory />)

    const categoryInputElement = screen.getByPlaceholderText('Nome da categoria') as HTMLInputElement

    expect(categoryInputElement.value).toEqual("")

    fireEvent.change(categoryInputElement, { target: { value: 'Teste' } })
    
    expect(categoryInputElement.value).toBe('Teste')
  })

  it('should return error in both inputs when clicking submit without filling them', () => {
    render(<NewCategory />)

    const addPeopleBtn = screen.getByText('Cadastrar')
    fireEvent.click(addPeopleBtn)

    const inputError = screen.getByText('Nome não pode ser vazio!')
    
    expect(inputError).toBeInTheDocument()
  })
})