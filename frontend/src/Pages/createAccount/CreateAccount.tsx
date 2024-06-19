import { FormEvent, useState } from 'react'
// @ts-ignore
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom'

import "./CreateAccount.scss"

import HeaderLoggedOut from '../../components/HeaderLoggedOut/HeaderLoggedOut'
import InputField from '../../components/InputField/InputField'
import Toast from '../../components/Toast/Toast'

import { formatCurrency } from '../../utils/FormatValue'

export const CreateAccount = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [salary, setSalary] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)

  const closeToast = () => {
    setMessage("")
    setError(false)
  }

  const handleCreateAccount = (e: FormEvent) => {
    e.preventDefault()

    // remove errors from inputs
    setErrors([]);

    const submit = document.querySelector("#formCreateAccount .btn-primary-custom") as HTMLButtonElement;
    submit.disabled = true;

    const newErrors: string[] = [];

    // validate if the inputs are filled
    if (!email) newErrors.push("email")
    if (!name) newErrors.push("name")
    if (!salary || salary === "R$ 0,00") newErrors.push("salary")
    if (!password) newErrors.push("password")
    if (!confirmPassword) newErrors.push("confirmPassword")
    if(confirmPassword !== password) newErrors.push("confirmPassword")

    setErrors(newErrors);

    if (newErrors.length) {
      submit.disabled = false;
      return
    }

    const id = Math.random().toString(16).slice(2)
    fetch(`${process.env.VITE_DEFAULT_URL}/register`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        password, 
        salary,
        name,
        username: `${name}${id}` 
      }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error.message)
      
      // show success tooltip and redirect
      setMessage(data.message)
      setError(false)
      setTimeout(() => navigate("/login"), 2000);
    })
    .catch(error => {
      submit.disabled = false;
      setError(true)
      setMessage(error.message || "Usuário inválido ou não cadastrado!")
    });
  }

  return (
    <>
      <Helmet>
        <title>controlaGastos - Criar conta</title>
        <meta 
          name="description" 
          content="Cadastre-se no controlaGasto e tenha um maior controle dos seus gastos." />
      </Helmet>
      <HeaderLoggedOut />

      {message && <Toast message={message} error={error} hideToast={closeToast} />}

      <div className="introduction">
        <div className="introduction__container">
          <h1 className="introduction__title">controlaGastos</h1>
          <p className="introduction__subtitle">Um webapp para você conseguir fazer o controle dos seus gastos e entender para onde seu dinheiro esta indo</p>
        </div>

        <div>
          <h1>Crie sua conta</h1>

          <form id='formCreateAccount' onSubmit={handleCreateAccount}>
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

            <button style={{ marginTop: "24px" }} type="submit" className="btn-primary-custom">
              Criar conta
            </button>

            <p className='has-account'>Já possui uma conta? <a href="/login">Acesse aqui</a></p>
          </form>
        </div>
      </div>
    </>
  )
};