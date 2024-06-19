import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { Login } from '../Login'

const navigate = jest.fn()

jest.mock('../../../../.env', () => ({
  __esModule: true,
  ...jest.requireActual('../../../../.env')
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate
}))

describe("Login page", () => {
  it('should render with 2 inputs on screen', () => {
    render(<Login />)

    const emailInput = screen.getByPlaceholderText('Seu e-mail')
    const passwordInput = screen.getByPlaceholderText('Sua senha')

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  })

  it('should render with 2 buttons on screen', () => {
    render(<Login />)

    const loginBtn = screen.getByText('Entrar')
    const createAccountBtn = screen.getByText('Criar uma conta')

    expect(loginBtn).toBeInTheDocument()
    expect(createAccountBtn).toBeInTheDocument()
  })

  // Deveria trocar o valor dos inputs quando o usuario digitar
  it('should change input values ​​when typing', () => {
    render(<Login />)

    const emailInputElement = screen.getByPlaceholderText('Seu e-mail') as HTMLInputElement
    const passwordInputElement = screen.getByPlaceholderText('Sua senha') as HTMLInputElement

    expect(emailInputElement.value).toEqual("")
    expect(passwordInputElement.value).toEqual("")

    fireEvent.change(emailInputElement, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInputElement, { target: { value: '12345678' } })
    
    expect(emailInputElement.value).toBe('test@test.com')
    expect(passwordInputElement.value).toBe('12345678')
  })

  it('should return error in both inputs when clicking submit without filling them', () => {
    render(<Login />)

    const loginBtn = screen.getByText('Entrar')
    fireEvent.click(loginBtn)

    const emailError = screen.getByText('E-mail não pode ser vazio!')
    const passwordError = screen.getByText('Senha não pode ser vazia!')
    
    expect(emailError).toBeInTheDocument()
    expect(passwordError).toBeInTheDocument()
  })
})