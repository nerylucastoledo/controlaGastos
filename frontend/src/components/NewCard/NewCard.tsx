import { FormEvent, useState } from "react"

import { IoMdClose } from "react-icons/io"

import InputField from "../InputField/InputField"
import useLocalStorage from "../../hooks/useLocalStorage"
import Toast from "../Toast/Toast"

const NewCard = () => {
  const [username] = useLocalStorage("username", "")
  const [name, setName] = useState("")
  const [color, setColor] = useState("")
  const [inputError, setInputError] = useState(false)
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("")

  const closeToast = () => {
    setMessage("")
    setError(false)
  }

  const handleCard = (e: FormEvent) => {
    e.preventDefault()

    const btnSubmit = document.querySelector("#formNewcard .btn-primary-custom") as HTMLButtonElement;
    btnSubmit.disabled = true;

    if (!name) {
      btnSubmit.disabled = false;
      setInputError(true)
      return
    }

    fetch(`${process.env.VITE_DEFAULT_URL}/cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        name,
        color,
        username, 
      }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error()
        
      const { message } = data
      setMessage(message)
      setError(false)
      
      setTimeout(() => {
        btnSubmit.disabled = false;
        closeToast()
      }, 1000);
    })
    .catch((error) => {
      btnSubmit.disabled = false;
      setError(true)
      setMessage(error.message || "Não foi possível cadastrar!")
    });
  }

  return (
    <div className="modal fade" id="newCard" tabIndex={-1} aria-labelledby="newCardLabel" aria-hidden="true">
      {message && <Toast message={message} error={error} hideToast={closeToast} />}
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1>Criar cartão</h1>
            <button type="button" data-bs-dismiss="modal" aria-label="Close">
              <IoMdClose size={28} color="#595959"/>
            </button>
          </div>
          <div className="modal-body">
            <form id="formNewcard" onSubmit={handleCard}>
              <InputField
                label="Digite o nome" 
                name="cardName"
                type="text"
                placeholder="Nome do cartão"
                value={name}
                onChange={({ currentTarget }) => setName(currentTarget.value)}
                errorMessage={inputError ?  "Nome não pode ser vazio!" : ""}
              />

              <InputField
                label="Selecione a cor" 
                name="cardColor"
                type="color"
                placeholder="Selecione a cor"
                value={color}
                onChange={({ currentTarget }) => setColor(currentTarget.value)}
                style={{ backgroundColor: color && `${color}`, borderRadius: "20px", height: "60px" }}
                errorMessage={inputError ?  "Cor não pode ser vazia!" : ""}
                />

              <button 
                type="submit" 
                className="btn-primary-custom" 
                style={{ marginTop: "24px" }}
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewCard