import { FormEvent, useState } from "react";

import "./Delete.scss"

import Toast from "../Toast/Toast";

import { IoMdClose } from "react-icons/io";
import { Bill } from "../../types";

interface IProps {
  item: Bill | null;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const Delete = ({ item, setUpdate}: IProps) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("")

  const closeToast = () => {
    setMessage("")
    setError(false)
  }

  const handleDelete = (e: FormEvent) => {
    e.preventDefault()

    const btnSubmit = document.querySelector("#formUpdateInvoice .btn-primary-custom") as HTMLButtonElement;
    const btnClose = document.getElementById("closeDelete") as HTMLButtonElement
    btnSubmit.disabled = true;

    fetch(`${process.env.VITE_DEFAULT_URL}/bill`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        _id: item?._id
      }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error()

      const { message } = data
      setMessage(message)
      setError(false)
      btnClose.click()
      
      setTimeout(() => {
        btnSubmit.disabled = false;
        closeToast()
        setUpdate(true)
      }, 500);
      
    })
    .catch((error) => {
      btnSubmit.disabled = false;
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
            <p>Tem certeza que quer deletar <span>{item?.item}</span>?</p>
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