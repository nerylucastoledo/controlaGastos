import { FormEvent, useState } from "react"
import { IoMdClose } from "react-icons/io"

import { InputField } from "../InputField/InputField"
import { Toast } from "../Toast/Toast"

import useLocalStorage from "../../hooks/useLocalStorage"

export const NewCard = () => {
  const [username] = useLocalStorage("username", "")
  const [name, setName] = useState("")
  const [color, setColor] = useState("")
  const [inputErrors, setInputinputErrors] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("")

  const handleResetInput = () => {
    setMessage("")
    setName("")
    setColor("")
    setError(false)
    setInputinputErrors([])
  }

  const closeToast = () => {
    setMessage("")
    handleResetInput()
  }

  const handleCard = (e: FormEvent) => {
    e.preventDefault()

    // remove error from input
    setInputinputErrors([])

    const submit = document.querySelector("#formNewcard .btn-primary-custom") as HTMLButtonElement;
    const btnClose = document.getElementById("closeCard") as HTMLButtonElement
    submit.disabled = true;

    const newinputErrors: string[] = [];

    // validate if the inputs are filled
    if (!name) newinputErrors.push("name")
    if (!color) newinputErrors.push("color")

    setInputinputErrors(newinputErrors);

    if (newinputErrors.length) {
      submit.disabled = false;
      return
    }

    fetch(`${process.env.VITE_DEFAULT_URL}/cards`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color, username }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error.message)
        
      // show success tooltip and update the component
      const { message } = data
      setMessage(message)
      setName("")
      setColor("")
      setError(false)
      
      setTimeout(() => {
        submit.disabled = false;
        btnClose.click()
        closeToast()
      }, 1000);
    })
    .catch((error) => {
      submit.disabled = false;
      setError(true)
      setMessage(error.message || "Não foi possível cadastrar!")

      setTimeout(() => closeToast(), 1000);
    });
  }

  return (
    <div className="modal fade" id="newCard" tabIndex={-1} aria-labelledby="newCardLabel" aria-hidden="true">
      {message && <Toast message={message} error={error} hideToast={closeToast} />}

      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1>Criar cartão</h1>
            
            <button 
              type="button" 
              data-bs-dismiss="modal" 
              aria-label="Close" 
              id="closeCard"
              onClick={(() => handleResetInput())}
            >
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
                errorMessage={inputErrors.includes("name") ?  "Nome não pode ser vazio!" : ""}
              />

              <InputField
                label="Selecione a cor" 
                name="cardColor"
                type="color"
                placeholder="Selecione a cor"
                value={color}
                onChange={({ currentTarget }) => setColor(currentTarget.value)}
                style={{ backgroundColor: color && `${color}`, borderRadius: "20px", height: "60px" }}
                errorMessage={inputErrors.includes("color") ?  "Cor não pode ser vazia!" : ""}
              />

              <button style={{ marginTop: "24px" }} type="submit" className="btn-primary-custom">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}