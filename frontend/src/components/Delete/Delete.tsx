import { FormEvent, useState } from "react";

import "./Delete.scss"

import Toast from "../Toast/Toast";

import useLocalStorage from "../../hooks/useLocalStorage";
import { IoMdClose } from "react-icons/io";

const Delete = () => {
  const [username] = useLocalStorage("username", "")
  const [name, setName] = useState("")
  const [inputError, setInputError] = useState(false)
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("")

  const closeToast = () => {
    setMessage("")
    setError(false)
  }

  const handleDelete = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="modal fade" id="deleteInvoice" tabIndex={-1} aria-labelledby="deleteInvoiceLabel" aria-hidden="true">
      {message && <Toast message={message} error={error} hideToast={closeToast} />}
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1>Deletar o gasto</h1>
            <button type="button" data-bs-dismiss="modal" aria-label="Close">
              <IoMdClose size={28} color="#595959"/>
            </button>
          </div>
          <div className="modal-body delete">
            <p>Tem certeza que quer deletar <span>Teste de compressão online</span>?</p>
            <form id="formdeleteInvoice" onSubmit={handleDelete}>
              <button 
                type="submit"
                className="btn-primary-custom" 
                style={{ marginTop: "24px" }}
              >
                Deletar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delete