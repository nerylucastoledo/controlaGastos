import "./Dashboards.scss"

import { ImCool } from "react-icons/im";

import { useData } from "../../context/Data"

import { Header} from "../../components/Header/Header"
import DateFilter from "../../components/DateFilter/DateFilter"
import Statistics from "../../components/Statistics/Statistics"
import Wallet from "../../components/Wallet/Wallet"
import Cards from "../../components/Cards/Cards"
import RecentExpenses from "../../components/RecentExpenses/RecentExpenses"
import Chart from "../../components/Statistics/Chart/Chart"
import Loading from "../../components/Loadig/Loading";
import { useState } from "react";
import Toast from "../../components/Toast/Toast";

const Dashboard = () => {
  const { data, loading, error, setUpdate, setMonth, setYear, month, year } = useData()
  const [closeError, setCloseError] = useState(false)

  const closeToast = () => {
    setCloseError(true)
  }

  return (
    <div className="dashboard">
      <Header />

      {loading && <Loading />}

      {error && !closeError && <Toast error={true} message="Não foi possível buscar os dados! Reinicie o app" hideToast={closeToast}/>}
      
      <div className="dashboard__container">
        <div className="dashboard__container-content">
          <div className="dashboard__container-content-info">
            {!loading && (
              <>
                <h1>Olá, <strong>Lucas</strong></h1>
                <p>Gerencie seus gastos de forma simples e eficiente.</p>
    
                <DateFilter setMonth={setMonth} setYear={setYear} />
    
                {!loading && !error && data && data.length ? (  
                  <>
                    <div className="bill">
                      <Chart />
                      <Statistics />
                      <Wallet />
                    </div>
          
                    <Cards />
                    <RecentExpenses />
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

export default Dashboard