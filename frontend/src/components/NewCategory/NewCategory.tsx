import { FormEvent, useState } from "react"

import { IoMdClose } from "react-icons/io"

import InputField from "../InputField/InputField"
import Toast from "../Toast/Toast"
import useLocalStorage from "../../hooks/useLocalStorage"

const NewCategory = () => {
  const [username] = useLocalStorage("username", "")
  const [name, setName] = useState("")
  const [inputError, setInputError] = useState(false)
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("")

  const closeToast = () => {
    setMessage("")
    setError(false)
  }

  const handleCategory = (e: FormEvent) => {
    e.preventDefault()

    const btnSubmit = document.querySelector("#formNewcategory .btn-primary-custom") as HTMLButtonElement;
    btnSubmit.disabled = true;

    if (!name) {
      btnSubmit.disabled = false;
      setInputError(true)
      return
    }

    fetch(`${process.env.VITE_DEFAULT_URL}/categorys`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        name, 
        username, 
      }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error()
        
      const { message } = data
      setMessage(message)
      setError(false)
      setName("")
      
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
    <div className="modal fade" id="newCategory" tabIndex={-1} aria-labelledby="newCategoryLabel" aria-hidden="true">
      {message && <Toast message={message} error={error} hideToast={closeToast} />}
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1>Criar categoria</h1>
            <button type="button" data-bs-dismiss="modal" aria-label="Close">
              <IoMdClose size={28} color="#595959"/>
            </button>
          </div>
          <div className="modal-body">
            <form id="formNewcategory" onSubmit={handleCategory}>
              <InputField
                label="Digite o nome" 
                name="categoryName"
                type="text"
                placeholder="Nome da categoria"
                value={name}
                onChange={({ currentTarget }) => setName(currentTarget.value)}
                errorMessage={inputError ?  "Nome não pode ser vazio!" : ""}
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

export default NewCategory