import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import CreateAccount from '../CreateAccount'

const navigate = jest.fn()

jest.mock('../../../../.env', () => ({
  __esModule: true,
  ...jest.requireActual('../../../../.env')
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate
}))

describe("CreateAccount page", () => {
  it('should render with 5 inputs on screen', () => {
    render(<CreateAccount />)

    const emailInput = screen.getByPlaceholderText('Seu e-mail')
    const nameInput = screen.getByPlaceholderText('Seu nome')
    const salaryInput = screen.getByPlaceholderText('Seu salário')
    const passwordInput = screen.getByPlaceholderText('Sua senha')
    const confirmPasswordInput = screen.getByPlaceholderText('Digite novamente a senha')

    expect(emailInput).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(salaryInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
  })

  it('should render with 2 buttons on screen', () => {
    render(<CreateAccount />)

    const createAccountBtn = screen.getByText('Criar conta')
    const loginBtn = screen.getByText('Acesse aqui')

    expect(createAccountBtn).toBeInTheDocument()
    expect(loginBtn).toBeInTheDocument()
  })

  // Deveria trocar o valor dos inputs quando o usuario digitar
  it('should change input values ​​when typing', () => {
    render(<CreateAccount />)

    const emailInputElement = screen.getByPlaceholderText('Seu e-mail') as HTMLInputElement
    const nameInputelement = screen.getByPlaceholderText('Seu nome') as HTMLInputElement
    const salaryInputElement = screen.getByPlaceholderText('Seu salário') as HTMLInputElement
    const passwordInputElement = screen.getByPlaceholderText('Sua senha') as HTMLInputElement
    const confirmPasswordInputElement = screen.getByPlaceholderText('Digite novamente a senha') as HTMLInputElement

    expect(emailInputElement.value).toEqual("")
    expect(nameInputelement.value).toEqual("")
    expect(salaryInputElement.value).toEqual("R$ 0,00")
    expect(passwordInputElement.value).toEqual("")
    expect(confirmPasswordInputElement.value).toEqual("")

    fireEvent.change(emailInputElement, { target: { value: 'test@test.com' } })
    fireEvent.change(nameInputelement, { target: { value: 'Lucas' } })
    fireEvent.change(salaryInputElement, { target: { value: 'R$ 5.000,00' } })
    fireEvent.change(passwordInputElement, { target: { value: '12345678' } })
    fireEvent.change(confirmPasswordInputElement, { target: { value: '12345678' } })
    
    expect(emailInputElement.value).toBe('test@test.com')
    expect(nameInputelement.value).toBe('Lucas')
    expect(salaryInputElement.value).toBe('R$ 5.000,00')
    expect(passwordInputElement.value).toBe('12345678')
    expect(confirmPasswordInputElement.value).toBe('12345678')
  })

  it('should return error in both inputs when clicking submit without filling them', () => {
    render(<CreateAccount />)

    const createAccountBtn = screen.getByText('Criar conta')
    fireEvent.click(createAccountBtn)

    const emailError = screen.getByText('E-mail não pode ser vazio!')
    const nameError = screen.getByText('Nome não pode ser vazio!')
    const salary = screen.getByText('E-mail não pode ser vazio!')
    const passwordError = screen.getByText('Nome não pode ser vazio!')
    const confirmPasswordError = screen.getByText('Senha diferente ou vazia!')
    
    expect(emailError).toBeInTheDocument()
    expect(nameError).toBeInTheDocument()
    expect(salary).toBeInTheDocument()
    expect(passwordError).toBeInTheDocument()
    expect(confirmPasswordError).toBeInTheDocument()
  })
})