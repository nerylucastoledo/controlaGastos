import { FormEvent, useEffect, useState } from "react";

import "./EditSettings.scss"

import Toast from "../Toast/Toast";
import InputField from "../InputField/InputField";

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
  cartao: "cards"
}

const EditSettings = ({ item, setUpdate, option }: IProps) => {
  const [name, setName] = useState("")
  const [color, setColor] = useState("")
  const [inputError, setInputError] = useState("")
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("")

  const handleResetInput = () => {
    setMessage("")
    setError(false)
    setInputError("")
  }

  useEffect(() => {
    if (item) {
      setName(item.name)

      if (option === "cartao") {
        setColor(item.color)
      }
    }
  }, [item])

  const closeToast = () => {
    setMessage("")
    setError(false)
  }

  const handleEdit = (e: FormEvent) => {
    e.preventDefault()
    const btnSubmit = document.querySelector("#formUpdateSettings .btn-primary-custom") as HTMLButtonElement;
    const btnClose = document.getElementById("closeEdit") as HTMLButtonElement
    btnSubmit.disabled = true;

    const body: { name: string, color?: string} = { name }

    if (!name) {
      btnSubmit.disabled = false;
      setInputError("name");
      return
    }

    if (option === "cartao") {
      body.color = color;
    }

    body.name = name

    fetch(`${process.env.VITE_DEFAULT_URL}/${ENUM[option]}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: item?._id, ...body }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error.message)

      const { message } = data
      setMessage(message)
      setError(false)
      setInputError("")
      
      setTimeout(() => {
        btnClose.click()
        closeToast()
        btnSubmit.disabled = false;
        setUpdate(true)
      }, 1000);
      
    })
    .catch((error) => {
      btnSubmit.disabled = false;
      setError(true)
      setMessage(error.message || "Ocorreu um erro interno!")
      
      setTimeout(() => {
        closeToast()
      }, 1000);
    });
  }

  return (
    <div className="modal fade" id="updateSettings" tabIndex={-1} aria-labelledby="updateSettingsLabel" aria-hidden="true">
      {message && <Toast message={message} error={error} hideToast={closeToast} />}

      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1>Editar {option === "cartao" ? "o cartão" : `a ${option}`}</h1>

            <button 
              type="button"
              data-bs-dismiss="modal" 
              aria-label="Close" 
              id="closeEdit"
              onClick={(() => handleResetInput())}
            >
              <IoMdClose size={28} color="#595959"/>
            </button>

          </div>
          <div className="modal-body edit">

            <form id="formUpdateSettings" onSubmit={handleEdit}>
              <InputField
                label={`Nome ${option === "cartao" ? "do cartão" : `da ${option}`}`}
                name="item"
                type="text"
                placeholder="Nome do item"
                value={name}
                onChange={({ currentTarget }) => setName(currentTarget.value)}
                errorMessage={inputError === "name" ?  `Nome ${option === "cartao" ? "do cartão não pode ser vazio!" : `da ${option} não pode ser vazia!`}` : ""}
              />

              {option === "cartao" && (
                <InputField
                  label="Selecione a cor" 
                  name="cardColor"
                  type="color"
                  placeholder="Selecione a cor"
                  value={color}
                  onChange={({ currentTarget }) => setColor(currentTarget.value)}
                  style={{ backgroundColor: color && `${color}`, borderRadius: "20px", height: "60px" }}
                  errorMessage={inputError === "color" ?  "Cor não pode ser vazia!" : ""}
                />
              )}

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

export default EditSettings