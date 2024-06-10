import { IoIosAirplane } from "react-icons/io";

import "./RecentExpenses.scss"

const RecentExpenses = () => {
  return (
    <div className="recent-expenses">
      <h1>últimos gastos</h1>

      <div className="recent-expenses__container">
        <div className="recent-expenses__container-content">
          <div className="recent-expenses__container-item">
            <div className="recent-expenses__container-item__info">
              <span><IoIosAirplane /></span>
              <div>
                <p>Passagem a guarlhos de salvador</p>
                <p>Alessa</p>
              </div>
            </div>
            <p>- R$ 249,90</p>
          </div>
          <div className="recent-expenses__container-item">
            <div className="recent-expenses__container-item__info">
              <span><IoIosAirplane /></span>
              <div>
                <p>Passagem</p>
                <p>Alessa</p>
              </div>
            </div>
            <p>- R$ 249,90</p>
          </div>
          <div className="recent-expenses__container-item">
            <div className="recent-expenses__container-item__info">
              <span><IoIosAirplane /></span>
              <div>
                <p>Passagem a guarlhos de salvador</p>
                <p>Alessa</p>
              </div>
            </div>
            <p>- R$ 249,90</p>
          </div>
          <div className="recent-expenses__container-item">
            <div className="recent-expenses__container-item__info">
              <span><IoIosAirplane /></span>
              <div>
                <p>Passagem</p>
                <p>Alessa</p>
              </div>
            </div>
            <p>- R$ 249,90</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentExpenses