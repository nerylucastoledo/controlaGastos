import { FormEvent, useState } from "react";
import { IoMdClose } from "react-icons/io";

import "./Delete.scss"

import { Toast } from "../Toast/Toast";

import { Bill } from "../../types";

interface IProps {
  item: Bill | null;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Delete = ({ item, setUpdate}: IProps) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("")

  const closeToast = () => {
    setMessage("")
    setError(false)
  }

  const handleDelete = (e: FormEvent) => {
    e.preventDefault()

    const submit = document.querySelector("#formdeleteInvoice .btn-primary-custom") as HTMLButtonElement;
    const btnClose = document.getElementById("closeDelete") as HTMLButtonElement
    submit.disabled = true;

    fetch(`${process.env.VITE_DEFAULT_URL}/bill`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  _id: item?._id }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error.message)

      // show success tooltip and update the component
      const { message } = data
      setMessage(message)
      setError(false)
      
      setTimeout(() => {
        submit.disabled = false;
        closeToast()
        btnClose.click()
        setUpdate(true)
      }, 1000);
      
    })
    .catch((error) => {
      submit.disabled = false;
      setError(true)
      setMessage(error.message || "Ocorreu um erro interno!")
    });
  }

  return (
    <div className="modal fade" id="deleteInvoice" tabIndex={-1} aria-labelledby="deleteInvoiceLabel" aria-hidden="true">
      {message && <Toast message={message} error={error} hideToast={closeToast} />}

      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1>Deletar o gasto</h1>

            <button type="button" data-bs-dismiss="modal" aria-label="Close" id="closeDelete">
              <IoMdClose size={28} color="#595959"/>
            </button>
          </div>
          <div className="modal-body delete">
            <p data-testid="message-delete">Tem certeza que quer deletar <span>{item?.item}</span>?</p>

            <form id="formdeleteInvoice" onSubmit={handleDelete}>
              <button style={{ marginTop: "24px" }} type="submit" className="btn-primary-custom">
                Deletar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}