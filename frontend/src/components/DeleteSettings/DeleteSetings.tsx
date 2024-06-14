import { FormEvent, useState } from "react";

import "./DeleteSettings.scss"

import Toast from "../Toast/Toast";

import { IoMdClose } from "react-icons/io";
import { Card, Category, People } from "../../types";

interface IProps {
  item: People | Category | Card | null;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  option: "pessoa" | "categoria" | "cartao";
}

const ENUM = {
  pessoa: "peoples",
  categoria: "categorys",
  cartao: "cards",
}

const DeleteSettings = ({ item, setUpdate, option }: IProps) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("")

    const closeToast = () => {
    setMessage("")
    setError(false)
  }

  const handleDelete = (e: FormEvent) => {
    e.preventDefault()

    const btnSubmit = document.querySelector("#formdeleteSettings .btn-primary-custom") as HTMLButtonElement;
    const btnClose = document.getElementById("closeDelete") as HTMLButtonElement
    btnSubmit.disabled = true;

    fetch(`${process.env.VITE_DEFAULT_URL}/${ENUM[option]}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_id: item?._id }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error.message)

      const { message } = data
      setMessage(message)
      setError(false)
      
      setTimeout(() => {
        btnSubmit.disabled = false;
        closeToast()
        btnClose.click()
        setUpdate(true)
      }, 1000);
      
    })
    .catch((error) => {
      btnSubmit.disabled = false;
      setError(true)
      setMessage(error.message || "Ocorreu um erro interno!")
    });
  }

  return (
    <div className="modal fade" id="deleteSettings" tabIndex={-1} aria-labelledby="deleteSettingsLabel" aria-hidden="true">
      {message && <Toast message={message} error={error} hideToast={closeToast} />}

      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1>Deletar {option === "cartao" ? "o cartão" : `a ${option}`}</h1>

            <button type="button" data-bs-dismiss="modal" aria-label="Close" id="closeDelete">
              <IoMdClose size={28} color="#595959"/>
            </button>

          </div>
          <div className="modal-body delete">
            {option === "cartao" && <p className="option_card">Todas as faturas desse cartão será deletada</p>}

            <p>Tem certeza que quer deletar o(a) <span>{item?.name}</span>?</p>

            <form id="formdeleteSettings" onSubmit={handleDelete}>
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

export default DeleteSettings