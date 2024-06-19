import { useState } from "react";
import { ImCool } from "react-icons/im";
// @ts-ignore
import { Helmet } from 'react-helmet';

import "./Dashboards.scss"

import { Cards } from "../../components/Cards/Cards"
import { Chart } from "../../components/Chart/Chart"
import { DateFilter } from "../../components/DateFilter/DateFilter"
import { Header } from "../../components/Header/Header"
import { Loading } from "../../components/Loadig/Loading";
import { RecentExpenses } from "../../components/RecentExpenses/RecentExpenses"
import { Statistics } from "../../components/Statistics/Statistics"
import { Toast } from "../../components/Toast/Toast";
import { Wallet } from "../../components/Wallet/Wallet"

import { useData } from "../../context/Data"

export const Dashboard = () => {
  const { data, loading, error, setMonth, setYear, month, year } = useData()
  const [closeError, setCloseError] = useState(false)

  const closeToast = () => {
    setCloseError(true)
  }

  return (
    <div className="dashboard">
      <Helmet>
        <title>controlaGastos - Tela inicial</title>
        <meta 
          name="description" 
          content="Na tela inicial do controlaGastos você consegue visualizar o valor da fatura de cada cartão, o ranking de gasto por categoria e um gráfico da fatura por mês." />
      </Helmet>

      <Header />

      {error && !closeError && <Toast error={true} message="Não foi possível buscar os dados! Filtre novamente" hideToast={closeToast}/>}
      
      <div className="dashboard__container">
        <div className="dashboard__container-content">
          <div className="dashboard__container-content-info">
            <h1>Olá, <strong>Lucas</strong></h1>
            <p>Gerencie seus gastos de forma simples e eficiente.</p>

            <DateFilter 
              setMonth={setMonth} 
              setYear={setYear} 
              currentMonth={month} 
              currentYear={year} 
            />

            {loading && <Loading />}
    
            {!loading && (
              <>
                {!error && data && data.billList.length ? (  
                  <>
                    <div className="bill">
                      <Chart year={year} />
                      <Statistics bill={data.billList} />
                      <Wallet bill={data.billList} />
                    </div>
          
                    <Cards cards={data.cardList} bill={data.billList} />
                    <RecentExpenses bill={data.billList} />
                  </>
                ) : (
                  <div className="data-empty">
                    <h2>Maravilha em?! Nenhum gasto esse mês</h2>
                    <p>Não perca o foco, mantenha as contas em dia!</p>
                    <ImCool size={24} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}