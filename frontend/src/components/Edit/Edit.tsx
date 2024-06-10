import { FormEvent, useState } from "react";

import "./Edit.scss"

import Toast from "../Toast/Toast";
import InputField from "../InputField/InputField";

import useLocalStorage from "../../hooks/useLocalStorage";
import { IoMdClose } from "react-icons/io";

const Edit = () => {
  const [username] = useLocalStorage("username", "")
  const [name, setName] = useState("")
  const [inputError, setInputError] = useState(false)
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("")

  const closeToast = () => {
    setMessage("")
    setError(false)
  }

  const handleEdit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="modal fade" id="updateInvoice" tabIndex={-1} aria-labelledby="updateInvoiceLabel" aria-hidden="true">
      {message && <Toast message={message} error={error} hideToast={closeToast} />}
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1>Editar o gasto</h1>
            <button type="button" data-bs-dismiss="modal" aria-label="Close">
              <IoMdClose size={28} color="#595959"/>
            </button>
          </div>
          <div className="modal-body edit">
            <form id="formupdateInvoice" onSubmit={handleEdit}>
              <InputField
                label="Atualizar o item" 
                name="item"
                type="text"
                placeholder="Nome do item"
                value={name}
                onChange={({ currentTarget }) => setName(currentTarget.value)}
                errorMessage={inputError ?  "Item não pode ser vazio!" : ""}
              />

              <InputField
                label="Atualizar o valor" 
                name="valueItem"
                type="text"
                placeholder="Valor do item"
                value={name}
                onChange={({ currentTarget }) => setName(currentTarget.value)}
                errorMessage={inputError ?  "Valor não pode ser vazio!" : ""}
              />

              <button 
                type="submit"
                className="btn-primary-custom" 
                style={{ marginTop: "24px" }}
              >
                Atualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit