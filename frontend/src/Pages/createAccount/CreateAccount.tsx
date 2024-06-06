import { FormEvent, useState } from 'react'

import "./CreateAccount.scss"

import HeaderLoggedOut from '../../components/HeaderLoggedOut/HeaderLoggedOut'
import InputField from '../../components/InputField/InputField'
import { useNavigate } from 'react-router-dom'
import Toast from '../../components/Toast/Toast'
import { formatCurrency } from '../../utils/FormatValue'

const CreateAccount = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [salary, setSalary] = useState("0")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)

  const handleCreateAccount = (e: FormEvent) => {
    e.preventDefault()
    const btnSubmit = document.querySelector(".btn-primary-custom") as HTMLButtonElement;
    btnSubmit.disabled = true;

    const newErrors: string[] = [];

    if (!email) newErrors.push("email")
    if (!name) newErrors.push("name")
    if (!salary) newErrors.push("salary")
    if (!password) newErrors.push("password")
    if (!confirmPassword) newErrors.push("confirmPassword")
    if(confirmPassword !== password) newErrors.push("confirmPassword")

    setErrors(newErrors);

    if (newErrors.length) {
      btnSubmit.disabled = false;
      return
    }

    fetch(`${import.meta.env.VITE_DEFAULT_URL}/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        email, 
        password, 
        salary,
        name,
        username: `${name}${email}` 
      }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error()
      
      setMessage(data.message)
      setTimeout(() => navigate("/login"), 2000);
    })
    .catch(error => {
      btnSubmit.disabled = false;
      setError(true)
      setMessage(error)
    });
  }

  const closeToast = () => {
    setMessage("")
    setError(false)
  }
  
  return (
    <>
      <HeaderLoggedOut />

      {message && <Toast message={message} error={error} hideToast={closeToast} />}

      <div className="introduction">
        <div className="introduction__container">
          <h1 className="introduction__title">controlaGastos</h1>
          <p className="introduction__subtitle">Um webapp para você conseguir fazer o controle dos seus gastos e entender para onde seu dinheiro esta indo</p>
        </div>

        <div>
          <h1>Crie sua conta</h1>

          <form onSubmit={handleCreateAccount}>
            <InputField
              label="E-mail" 
              name="mail"
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={({ currentTarget }) => setEmail(currentTarget.value)}
              errorMessage={errors.includes("email") ?  "E-mail não pode ser vazio!" : ""}
            />

            <InputField
              label="Nome" 
              name="name"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={({ currentTarget }) => setName(currentTarget.value)}
              errorMessage={errors.includes("name") ?  "Nome não pode ser vazio!" : ""}
            />

            <InputField
              label="Salário (líquido)" 
              name="salary"
              type="text"
              placeholder="Seu salário"
              value={formatCurrency(salary)}
              onChange={({ currentTarget }) => setSalary(formatCurrency(currentTarget.value))}
              errorMessage={errors.includes("salary") ?  "Salário não pode ser vazio!" : ""}
            />

            <InputField
              label="Senha" 
              name="password"
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={({ currentTarget }) => setPassword(currentTarget.value)}
              errorMessage={errors.includes("password") ?  "Senha não pode ser vazia!" : ""}
            />

            <InputField
              label="Confirmar senha" 
              name="confirmPassword"
              type="password"
              placeholder="Digite novamente a senha"
              value={confirmPassword}
              onChange={({ currentTarget }) => setConfirmPassword(currentTarget.value)}
              errorMessage={errors.includes("confirmPassword") ?  "Senha diferente ou vazia!" : ""}
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