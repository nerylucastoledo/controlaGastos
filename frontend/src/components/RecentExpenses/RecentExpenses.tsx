import { IoIosAirplane } from "react-icons/io";

import "./RecentExpenses.scss"
import { Bill } from "../../types";

const RecentExpenses = ({ bill }: { bill: Bill[] }) => {
  const lastExpenses = bill.reverse().slice(0, 9)

  console.log(lastExpenses)

  return (
    <div className="recent-expenses">
      <h1>últimos gastos</h1>

      <div className="recent-expenses__container">
        <div className="recent-expenses__container-content">
          {lastExpenses?.length && lastExpenses.map((expense, index) => (
            <div key={`${expense.item}-${index}`} className="recent-expenses__container-item">
              <div className="recent-expenses__container-item__info">
                <span><IoIosAirplane /></span>
                <div>
                  <p>{expense.item}</p>
                  <p>{expense.people}</p>
                </div>
              </div>
              <p>- {expense.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentExpenses