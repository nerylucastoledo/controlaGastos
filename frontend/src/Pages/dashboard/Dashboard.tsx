import "./Dashboards.scss"

import { Header} from "../../components/Header/Header"
import DateFilter from "../../components/DateFilter/DateFilter"
import { useState } from "react"

const Dashboard = () => {
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard__container">
        <div className="dashboard__container-info">
          <h1>Olá, <strong>Lucas</strong></h1>
          <p>Gerencie seus gastos de forma simples e eficiente.</p>
        </div>

        <DateFilter setMonth={setMonth} setYear={setYear} />
      </div>
    </div>
  )
}

export default Dashboard