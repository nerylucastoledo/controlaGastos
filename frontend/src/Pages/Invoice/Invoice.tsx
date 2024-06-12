import { useEffect, useState } from "react";

import "./Invoice.scss"

import { Header } from "../../components/Header/Header";
import Edit from "../../components/Edit/Edit";
import Delete from "../../components/Delete/Delete";
import Loading from "../../components/Loadig/Loading";
import InvoicePeople from "../../components/InvoicePeople/InvoicePeople";
import InvoiceItem from "../../components/InvoiceItem/InvoiceItem";

import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/Data";
import { Bill } from "../../types";

import { IoArrowBack } from "react-icons/io5";
import Toast from "../../components/Toast/Toast";

const Invoice = () => {
  const navigate = useNavigate()
  const { name_card } = useParams()
  const { data, loading, error, setUpdate } = useData()

  const [dataFilter, setDataFilter] = useState<Bill[]>([])
  const [peopleSelected, setPeopleSelected] = useState('Eu')
  const [peoples, setPeoples] = useState<string[]>([])
  const [colorCard, setColorCard] = useState("")
  const [editItem, setEditItem] = useState<Bill | null>(null)
  const [deleteItem, setDeleteItem] = useState<Bill | null>(null)

  useEffect(() => {
    if (data?.billList) {
      const { color } = data.cardList.filter(card => card.name === name_card)[0]
      const filteredData = data.billList.filter(item => item.card === name_card);
      const uniquePeoples = [...new Set(
        filteredData
        .filter(item => item.people !== "Eu")
        .map(item => item.people)
      )];
      
      setColorCard(color)
      setDataFilter(filteredData);
      setPeoples(uniquePeoples);
    }
  }, [data])
  
  const handleBack = () => navigate("/")

  return (
    <div>
      <Header />
      <div className="invoice">
        <button className="invoice__back" onClick={handleBack}><IoArrowBack /> Voltar</button>

        {error && (
          <>
            <Toast error={true} message="Não foi possível buscar os dados!" hideToast={handleBack} />

            <p className="invoice__error">
              Ocorreu um erro! <span>tente novamente mais tarde</span>
            </p>
          </>
        )}

        {!error && loading && <Loading /> }

        {!error && !loading && (
          <div className="invoice__screen" style={{ backgroundColor: colorCard }}>
            <h2>{name_card}</h2>

            <div className="invoice__container">
              <InvoicePeople 
                peoples={peoples} 
                peopleSelected={peopleSelected}
                setPeopleSelected={setPeopleSelected}
              />

              <InvoiceItem 
                data={dataFilter} 
                peopleSelected={peopleSelected}
                setEditItem={setEditItem}
                setDeleteItem={setDeleteItem}
              />
            </div>
          </div>
        )}
      </div>

      <Edit item={editItem} setUpdate={setUpdate} />
      <Delete item={deleteItem} setUpdate={setUpdate}  />
    </div>
  )
}

export default Invoice