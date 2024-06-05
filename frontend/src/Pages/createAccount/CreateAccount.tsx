import { useState } from 'react'

import "./CreateAccount.scss"

import HeaderLoggedOut from '../../components/HeaderLoggedOut/HeaderLoggedOut'
import InputField from '../../components/InputField/InputField'

const CreateAccount = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [salary, setSalary] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  return (
    <>
      <HeaderLoggedOut />
      <div className="introduction">
        <div className="introduction__container">
          <h1 className="introduction__title">controlaGastos</h1>
          <p className="introduction__subtitle">Um webapp para você conseguir fazer o controle dos seus gastos e entender para onde seu dinheiro esta indo</p>
        </div>

        <div>
          <h1>Crie sua conta</h1>

          <form action="">
            <InputField
              label="E-mail" 
              name="mail"
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={({ currentTarget }) => setEmail(currentTarget.value)}
            />

            <InputField
              label="Nome" 
              name="name"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={({ currentTarget }) => setName(currentTarget.value)}
            />

            <InputField
              label="Salário (líquido)" 
              name="salary"
              type="text"
              placeholder="Seu salário"
              value={salary}
              onChange={({ currentTarget }) => setSalary(currentTarget.value)}
            />

            <InputField
              label="Senha" 
              name="password"
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={({ currentTarget }) => setPassword(currentTarget.value)}
            />

            <InputField
              label="Confirmar senha" 
              name="confirmPassword"
              type="password"
              placeholder="Digite novamente a senha"
              value={confirmPassword}
              onChange={({ currentTarget }) => setConfirmPassword(currentTarget.value)}
            />

            <button 
              type="submit" 
              className="btn-primary-custom" 
              style={{ marginTop: "24px" }}
            >
              Criar conta
            </button>

            <p className='has-account'>Já possui uma conta? <a href="/login">Acesse aqui</a></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateAccount