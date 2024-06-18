import { FormEvent, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import "./Edit.scss"

import InputField from "../InputField/InputField";
import Toast from "../Toast/Toast";

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

    // remove errors from inputs
    setInputError([]);

    const submit = document.querySelector("#formUpdateInvoice .btn-primary-custom") as HTMLButtonElement;
    const btnClose = document.getElementById("closeEdit") as HTMLButtonElement
    submit.disabled = true;

    const newErrors: string[] = [];

    // validate if the inputs are filled
    if (!name) newErrors.push("name")
    if (!value || value === "R$ 0,00") newErrors.push("value")

    setInputError(newErrors);

    if (newErrors.length) {
      submit.disabled = false;
      return
    }

    fetch(`${process.env.VITE_DEFAULT_URL}/bill`, {
      method: "PUT",
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...item,
        value,
        item: name
      }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error.message)

      // show success tooltip and update the component
      const { message } = data
      setMessage(message)
      setError(false)

      // reset inputs
      setName("")
      setValue("")
      btnClose.click()
      
      setTimeout(() => {
        submit.disabled = false;
        closeToast()
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

              <button style={{ marginTop: "24px" }}type="submit" className="btn-primary-custom">
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