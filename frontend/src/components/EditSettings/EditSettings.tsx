import { FormEvent, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import "./EditSettings.scss"

import { InputField } from "../InputField/InputField";
import { Toast } from "../Toast/Toast";

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

export const EditSettings = ({ item, setUpdate, option }: IProps) => {
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
      setName(item.name || "")

      if (option === "cartao") {
        // @ts-ignore
        setColor(item.color || "")
      }
    }
  }, [item, option])

  const closeToast = () => {
    setMessage("")
    setError(false)
  }

  const handleEdit = (e: FormEvent) => {
    e.preventDefault()

    // remove error from input
    setInputError("");

    const submit = document.querySelector("#formUpdateSettings .btn-primary-custom") as HTMLButtonElement;
    const btnClose = document.getElementById("closeEdit") as HTMLButtonElement
    submit.disabled = true;

    const body: { name: string, color?: string} = { 
      name 
    }

    // validate if the inputs are filled
    if (!name) {
      submit.disabled = false;
      setInputError("name");
      return
    }

    if (option === "cartao") {
      body.color = color;
    }

    fetch(`${process.env.VITE_DEFAULT_URL}/${ENUM[option]}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: item?._id, ...body }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error.message)

      // show success tooltip and update the component
      const { message } = data
      setMessage(message)
      setError(false)
      setInputError("")
      
      setTimeout(() => {
        submit.disabled = false;
        btnClose.click()
        closeToast()
        setUpdate(true)
      }, 1000);
      
    })
    .catch((error) => {
      submit.disabled = false;
      setError(true)
      setMessage(error.message || "Ocorreu um erro interno!")
      
      setTimeout(() => closeToast(), 1000);
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
                data-testid={`test${option}`}
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

              <button  style={{ marginTop: "24px" }} type="submit" className="btn-primary-custom">
                Atualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}