import "./Dashboards.scss"

import { Header} from "../../components/Header/Header"
import DateFilter from "../../components/DateFilter/DateFilter"
import { useState } from "react"
import Statistics from "../../components/Statistics/Statistics"
import Wallet from "../../components/Wallet/Wallet"
import Cards from "../../components/Cards/Cards"
import RecentExpenses from "../../components/RecentExpenses/RecentExpenses"

const Dashboard = () => {
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard__container">
        <div className="dashboard__container-content">
          <div className="dashboard__container-content-info">
            <h1>Olá, <strong>Lucas</strong></h1>
            <p>Gerencie seus gastos de forma simples e eficiente.</p>
          </div>

          <DateFilter setMonth={setMonth} setYear={setYear} />
          <div>
            <Statistics />
            <Wallet />
          </div>

          <Cards />
          <RecentExpenses />
        </div>
      </div>
    </div>
  )
}

export default Dashboard