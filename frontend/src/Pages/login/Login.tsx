import { useState } from "react"
import HeaderLoggedOut from "../../components/HeaderLoggedOut/HeaderLoggedOut"
import InputField from "../../components/InputField/InputField"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  return (
    <>
      <HeaderLoggedOut />
      <div className="introduction">
        <div className="introduction__container">
          <h1 className="introduction__title">controlaGastos</h1>
          <p className="introduction__subtitle">Um webapp para você conseguir fazer o controle dos seus gastos e entender para onde seu dinheiro esta indo</p>
        </div>

        <div>
          <h1>Acesse sua conta</h1>

          <form action="">
            <InputField
              label="Digite seu e-mail" 
              name="mail"
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={({ currentTarget }) => setEmail(currentTarget.value)}
            />

            <InputField
              label="Digite sua senha" 
              name="mail"
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={({ currentTarget }) => setPassword(currentTarget.value)}
            />

            <button 
              type="submit" 
              className="btn-primary-custom" 
              style={{ marginTop: "24px" }}
            >
              Entrar
            </button>

            <a href="/create-account" className="btn-secondary-custom">Criar uma conta</a>
          </form>

        </div>
      </div>
    </>
  )
}

export default Login