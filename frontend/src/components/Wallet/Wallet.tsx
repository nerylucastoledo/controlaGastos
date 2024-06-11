import useLocalStorage from "../../hooks/useLocalStorage";
import { Bill } from "../../types";
import { formatCurrencyToNumber, parseMoney } from "../../utils/FormatValue";
import "./Wallet.scss"

import { FaWallet } from "react-icons/fa";

const Wallet = ({ bill }: { bill: Bill[] }) => {
  const [salary] = useLocalStorage("salary", "")

  const valueToPay = bill.reduce((acc, item) => {
    const value = formatCurrencyToNumber(item.value);
    return item.people === "Eu" ? acc + value : acc
  }, 0)
  
  const balance = formatCurrencyToNumber(salary) - valueToPay

  return (
    <div className="wallet">
      <h1>carteira</h1>

      <div className="wallet-content">
        <div className="wallet-content__balance">
          <div>
            <span><FaWallet size={24} color="#FFA8A8"/></span>
            <span>Saldo</span>
          </div>
          <p style={{ color: balance > 0 ? "#006400" : "#B22222" }}>
            {balance > 0 ? "+ " : "- "} {parseMoney(balance)}
          </p>
        </div>
        <div className="wallet-content__accounts">
          <div className="wallet-content__accounts-salary">
            <p>Salário</p>
            <p>{salary}</p>
          </div>
          <div className="wallet-content__accounts-divisor"></div>
          <div className="wallet-content__accounts-payable">
            <p>Contas</p>
            <p style={{ color: valueToPay !== 0 ? "#B22222" : "#595959"}}>
              {parseMoney(valueToPay)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet