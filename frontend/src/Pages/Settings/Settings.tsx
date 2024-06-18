import { FormEvent, useState } from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';

import "./Settings.scss"

import Header from '../../components/Header/Header';
import InputField from "../../components/InputField/InputField";

import { MdEditSquare, MdDeleteForever } from "react-icons/md";

import { useData } from "../../context/Data";
import Loading from "../../components/Loadig/Loading";
import Toast from "../../components/Toast/Toast";
import DeleteSettings from "../../components/DeleteSettings/DeleteSetings";
import EditSettings from "../../components/EditSettings/EditSettings";
import { Card, Category, People } from "../../types";
import useLocalStorage from "../../hooks/useLocalStorage";
import { formatCurrency } from "../../utils/FormatValue";

const Config = () => {
  const [username] = useLocalStorage("username", "")
  const [salary, setSalary] = useLocalStorage("salary", "")
  
  const { data, loading, error, setUpdate } = useData()
  const [inputError, setInputError] = useState(false)
  
  const [message, setMessage] = useState("")
  const [errorUpdate, setErrorUpdate] = useState(false)

  const [editItem, setEditItem] = useState<Category | People | Card | null>(null)
  const [deleteItem, setDeleteItem] = useState<Category | People | Card | null>(null)
  const [option, setOption] = useState<"pessoa" | "categoria" | "cartao">("pessoa")

  const handleSalary = (e: FormEvent) => {
    e.preventDefault()

    const btnSubmit = document.querySelector("#formSettings .btn-primary-custom") as HTMLButtonElement;
    btnSubmit.disabled = true;

    if (!salary || salary === "R$ 0,00") {
      btnSubmit.disabled = false;
      setInputError(true)
      return
    }

    fetch(`${process.env.VITE_DEFAULT_URL}/users`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, salary }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error.message)

      const { message } = data
      setErrorUpdate(false)
      setSalary(salary)
      setMessage(message)

      setTimeout(() => {
        btnSubmit.disabled = false;
        closeToast()
      }, 1000);
    })
    .catch((error) => {
      btnSubmit.disabled = false;
      setErrorUpdate(true)
      setMessage(error.message || "Ocorreu um erro interno!")
    });
  }

  const closeToast = () => {
    setMessage("")
    setErrorUpdate(false)
  }

  const handleEditOrDeletePeople = (index: number, param: "edit" | "delete") => {
    setOption("pessoa")
    if (param === "edit") {
      setEditItem(data?.peopleList[index] ?? null)
    } else {
      setDeleteItem(data?.peopleList[index] ?? null)
    }
  }

  const handleEditOrDeleteCategory = (index: number, param: "edit" | "delete") => {
    setOption("categoria")
    if (param === "edit") {
      setEditItem(data?.categoryList[index] ?? null)
    } else {
      setDeleteItem(data?.categoryList[index] ?? null)
    }
  }

  const handleEditOrDeleteCard= (index: number, param: "edit" | "delete") => {
    setOption("cartao")
    if (param === "edit") {
      setEditItem(data?.cardList[index] ?? null)
    } else {
      setDeleteItem(data?.cardList[index] ?? null)
    }
  }

  return (
    <>
      <Helmet>
        <title>controlaGastos - Configurações</title>
        <meta 
          name="description" 
          content="Faça a alteração do seu salário, suas categorias e pessoas que usam seu cartão no controlaGasto." 
        />
      </Helmet>

      <div className='settings'>
        <Header />

        {error || message && <Toast error={error ? true : false || errorUpdate} message={message} hideToast={closeToast}/> }

        <div className="settings__container">
          {loading && <Loading />}

          {!loading && !error && (
            <>
              <h1>Suas informações.</h1>

              <form id="formSettings" onSubmit={handleSalary}>
                <InputField
                  label="Seu salário" 
                  name="salary"
                  type="text"
                  placeholder="Seu salário"
                  value={salary}
                  onChange={({ currentTarget }) => setSalary(formatCurrency(currentTarget.value))}
                  errorMessage={inputError ?  "Salário não pode ser vazio!" : ""}
                />

                <button 
                  type="submit" 
                  className="btn-primary-custom" 
                  style={{ marginTop: "24px" }}
                >
                  Atualizar
                </button>
              </form>

              <div className="settings__container__items">
                <h2>pessoas</h2>
                <div className="settings__container__items__content">
                  {data?.peopleList.length ? data.peopleList.map(({ name }, index) => (
                    <div key={name} className="settings__container__items__content__info">
                      <p>{name}</p>
                      <div>
                        <button 
                          className="btnModal" 
                          type="button" 
                          data-bs-toggle="modal" 
                          data-bs-target="#updateSettings" 
                          onClick={() => handleEditOrDeletePeople(index, "edit")}
                        >
                          <MdEditSquare size={16} color="#007bff"/>
                        </button>
                        <button 
                          className="btnModal" 
                          type="button" 
                          data-bs-toggle="modal" 
                          data-bs-target="#deleteSettings" 
                          onClick={() => handleEditOrDeletePeople(index, "delete")}
                        >
                          <MdDeleteForever size={16} color="#dc3545" />
                        </button>
                      </div>
                    </div>
                  )) : <p>nenhuma pessoa cadastrada</p>}
                </div>
              </div>

              <div className="settings__container__items">
                <h2>categorias</h2>
                <div className="settings__container__items__content">
                  {data?.categoryList.length ? data.categoryList.map(({ name }, index) => (
                    <div key={name} className="settings__container__items__content__info">
                      <p>{name}</p>
                      <div>
                        <button  
                          className="btnModal" 
                          type="button" 
                          data-bs-toggle="modal" 
                          data-bs-target="#updateSettings" 
                          onClick={() => handleEditOrDeleteCategory(index, "edit")}
                        >
                          <MdEditSquare size={16} color="#007bff"/>
                        </button>
                        <button 
                          className="btnModal" 
                          type="button" 
                          data-bs-toggle="modal" 
                          data-bs-target="#deleteSettings" 
                          onClick={() => handleEditOrDeleteCategory(index, "delete")}
                        >
                          <MdDeleteForever size={16} color="#dc3545" />
                        </button>
                      </div>
                    </div>
                  )) : <p>nenhuma categoria cadastrada</p>}
                </div>
              </div>

              <div className="settings__container__items">
                <h2>cartões</h2>
                <div className="settings__container__items__content">
                  {data?.cardList.length ? data.cardList.map(({ name }, index) => (
                    <div key={name} className="settings__container__items__content__info">
                      <p>{name}</p>
                      <div>
                        <button  
                          className="btnModal" 
                          type="button" 
                          data-bs-toggle="modal" 
                          data-bs-target="#updateSettings" 
                          onClick={() => handleEditOrDeleteCard(index, "edit")}
                        >
                          <MdEditSquare size={16} color="#007bff"/>
                        </button>

                        <button 
                          className="btnModal" 
                          type="button" 
                          data-bs-toggle="modal" 
                          data-bs-target="#deleteSettings" 
                          onClick={() => handleEditOrDeleteCard(index, "delete")}
                        >
                          <MdDeleteForever size={16} color="#dc3545" />
                        </button>
                      </div>
                    </div>
                  )) : <p>nenhum cartão cadastrado</p>}
                </div>
              </div>
            </>
          )}
          <EditSettings 
            item={editItem} 
            setUpdate={setUpdate} 
            option={option} 
          />

          <DeleteSettings 
            item={deleteItem} 
            setUpdate={setUpdate} 
            option={option }
          />
        </div>
      </div>
    </>
  )
}

export default Config;