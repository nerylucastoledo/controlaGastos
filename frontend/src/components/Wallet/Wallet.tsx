import "./Wallet.scss"

import { FaWallet } from "react-icons/fa";

const Wallet = () => {
  return (
    <div className="wallet">
      <h1>carteira</h1>

      <div className="wallet-content">
        <div className="wallet-content__balance">
          <div>
            <span><FaWallet size={24} color="#FFA8A8"/></span>
            <span>Saldo</span>
          </div>
          <p>+ R$ 1.714,90</p>
        </div>
        <div className="wallet-content__accounts">
          <div className="wallet-content__accounts-salary">
            <p>Salário</p>
            <p>+ R$ 3.500,00</p>
          </div>
          <div className="wallet-content__accounts-divisor"></div>
          <div className="wallet-content__accounts-payable">
            <p>Contas</p>
            <p>- R$ 1.890,97</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet