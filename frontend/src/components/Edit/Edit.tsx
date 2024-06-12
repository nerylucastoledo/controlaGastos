import { FormEvent, useEffect, useState } from "react";

import "./Edit.scss"

import Toast from "../Toast/Toast";
import InputField from "../InputField/InputField";

import { IoMdClose } from "react-icons/io";
import { Bill } from "../../types";
import { formatCurrency } from "../../utils/FormatValue";

interface IProps {
  item: Bill | null;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const Edit = ({ item, setUpdate }: IProps) => {
  const [name, setName] = useState("")
  const [value, setValue] = useState("")
  const [inputError, setInputError] = useState<string[]>([])
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (item) {
      setName(item.item)
      setValue(item.value)
    }
  }, [item])

  const closeToast = () => {
    setMessage("")
    setError(false)
  }

  const handleEdit = (e: FormEvent) => {
    e.preventDefault()
    const btnSubmit = document.querySelector("#formUpdateInvoice .btn-primary-custom") as HTMLButtonElement;
    const btnClose = document.getElementById("closeEdit") as HTMLButtonElement
    btnSubmit.disabled = true;

    const newErrors: string[] = [];

    if (!name) newErrors.push("name")
    if (!value || value === "R$ 0,00") newErrors.push("value")

    setInputError(newErrors);

    if (newErrors.length) {
      btnSubmit.disabled = false;
      return
    }

    fetch(`${process.env.VITE_DEFAULT_URL}/bill`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        ...item,
        value,
        item: name
      }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error()

      const { message } = data
      setMessage(message)
      setError(false)
      setName("")
      setValue("")
      setInputError([])
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
    <div className="modal fade" id="updateInvoice" tabIndex={-1} aria-labelledby="updateInvoiceLabel" aria-hidden="true">
      {message && <Toast message={message} error={error} hideToast={closeToast} />}
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1>Editar o gasto</h1>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" id="closeEdit">
              <IoMdClose size={28} color="#595959"/>
            </button>
          </div>
          <div className="modal-body edit">
            <form id="formUpdateInvoice" onSubmit={handleEdit}>
              <InputField
                label="Atualizar o item" 
                name="item"
                type="text"
                placeholder="Nome do item"
                value={name}
                onChange={({ currentTarget }) => setName(currentTarget.value)}
                errorMessage={inputError.includes("name") ?  "Item não pode ser vazio!" : ""}
              />

              <InputField
                label="Atualizar o valor" 
                name="valueItem"
                type="text"
                placeholder="Valor do item"
                value={value}
                onChange={({ currentTarget }) => setValue(formatCurrency(currentTarget.value))}
                errorMessage={inputError.includes("value") ?  "Valor não pode ser vazio!" : ""}
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