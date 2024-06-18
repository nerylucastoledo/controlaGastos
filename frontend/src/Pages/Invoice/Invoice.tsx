import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
// @ts-ignore
import { Helmet } from 'react-helmet';

import "./Invoice.scss"

import Delete from "../../components/Delete/Delete";
import Edit from "../../components/Edit/Edit";
import Header from "../../components/Header/Header";
import InvoiceItem from "../../components/InvoiceItem/InvoiceItem";
import InvoicePeople from "../../components/InvoicePeople/InvoicePeople";
import Loading from "../../components/Loadig/Loading";
import Toast from "../../components/Toast/Toast";

import { Bill } from "../../types";
import { useData } from "../../context/Data";

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
    <div className="invoice">
      <Helmet>
        <title>controlaGastos - Fatura {name_card}</title>
        <meta name="description" content="Na tela de invoice do controla Gastos você consegue visualizar todos os gastos da sua fatura separado por pessoa" />
      </Helmet>

      <Header />
      <div className="invoice__container">
        <button className="invoice__container__back" onClick={handleBack}><IoArrowBack /> Voltar</button>

        {error && (
          <>
            <Toast error={true} message="Não foi possível buscar os dados!" hideToast={handleBack} />

            <p className="invoice__container__error">
              Ocorreu um erro! <span>tente novamente mais tarde</span>
            </p>
          </>
        )}

        {!error && loading && <Loading /> }

        {!error && !loading && (
          <div className="invoice__container__screen" style={{ backgroundColor: colorCard }}>
            <h2>{name_card}</h2>

            <div className="invoice__container__content">
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