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

  const handleResetInput = () => {
    setMessage("")
    setName("")
    setError(false)
    setInputError(false)
  }

  const closeToast = () => {
    setMessage("")
    handleResetInput()
  }

  const handleCategory = (e: FormEvent) => {
    e.preventDefault()

    // remove error from input
    setInputError(false)

    const submit = document.querySelector("#formNewcategory .btn-primary-custom") as HTMLButtonElement;
    const btnClose = document.getElementById("closeCategory") as HTMLButtonElement
    submit.disabled = true;

    // validate if the inputs are filled
    if (!name) {
      submit.disabled = false;
      setInputError(true)
      return
    }

    fetch(`${process.env.VITE_DEFAULT_URL}/categorys`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error.message)
        
      // show success tooltip and update the component
      const { message } = data
      setMessage(message)
      setName("")
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
    <div className="modal fade" id="newCategory" tabIndex={-1} aria-labelledby="newCategoryLabel" aria-hidden="true">
      {message && <Toast message={message} error={error} hideToast={closeToast} />}
      
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1>Criar categoria</h1>

            <button 
              type="button" 
              data-bs-dismiss="modal" 
              aria-label="Close" 
              id="closeCategory"
              onClick={(() => handleResetInput())}
            >
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

              <button  style={{ marginTop: "24px" }} type="submit" className="btn-primary-custom">
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