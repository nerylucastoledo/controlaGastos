import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

import HeaderLoggedOut from "../../components/HeaderLoggedOut/HeaderLoggedOut"
import InputField from "../../components/InputField/InputField"
import Toast from "../../components/Toast/Toast"

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)

  const addCookies = (accessToken: string, expirationTime: string) => {
    const expires = new Date(expirationTime);
    document.cookie = `access_token=${accessToken};`;
    document.cookie = `expires=${expires.toUTCString()};`;
  }

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    const btnSubmit = document.querySelector(".btn-primary-custom") as HTMLButtonElement;
    btnSubmit.disabled = true;

    const newErrors: string[] = [];

    if (!email) newErrors.push("email")
    if (!password) newErrors.push("password")

    setErrors(newErrors);

    if (newErrors.length) {
      btnSubmit.disabled = false;
      return
    }

    fetch(`${process.env.VITE_DEFAULT_URL}/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        email, 
        password, 
      }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error()

      const { accessToken, expirationTime } = data.userCredential.user.stsTokenManager;
      addCookies(accessToken, expirationTime)
      setMessage(data.message)
      setError(false)
      setTimeout(() => navigate("/"), 2000);
    })
    .catch((error) => {
      btnSubmit.disabled = false;
      setError(true)
      setMessage(error.message || "Usuário inválido ou não cadastrado!")
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
          <h1>Acesse sua conta</h1>

          <form onSubmit={handleLogin}>
            <InputField
              label="Digite seu e-mail" 
              name="mail"
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={({ currentTarget }) => setEmail(currentTarget.value)}
              errorMessage={errors.includes("email") ?  "E-mail não pode ser vazio!" : ""}
            />

            <InputField
              label="Digite sua senha" 
              name="password"
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={({ currentTarget }) => setPassword(currentTarget.value)}
              errorMessage={errors.includes("password") ?  "Senha não pode ser vazia!" : ""}
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