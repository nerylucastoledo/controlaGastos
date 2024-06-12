import { RiVisaLine } from "react-icons/ri";

import "./Cards.scss"

import { Bill, Card, ICard } from "../../types";
import { formatCurrencyToNumber, parseMoney } from "../../utils/FormatValue";
import { useNavigate } from "react-router-dom";

interface IInvoice extends ICard {
  total: number;
}

const Cards = ({ cards, bill }: { cards: Card[], bill: Bill[] }) => {
  const navigate = useNavigate()

  const getCardsOfMonth = () => {
    const cardsSet: Set<string> = new Set()
    bill.forEach((item) => cardsSet.add(item.card))
    return cardsSet
  }

  const generateInvoice = () => {
    const cardsOfMonth = Array.from(getCardsOfMonth())
    const invoices: IInvoice[] = []

    cardsOfMonth.forEach((name) => {
      const total = bill
        .filter((item) => item.card === name)
        .reduce((acc, item) => acc + formatCurrencyToNumber(item.value), 0)

      const { color } = cards.filter(card => card.name === name)[0]
      
      invoices.push({
        color,
        name,
        total
      })
    })

    return invoices;
  }

  const invoices = generateInvoice()

  const handlecard = (name: string) => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      navigate(`/invoice/${name}`)
    }, 200);
  }

  return (
    <div className="cards">
      <h1>cartões</h1>

      <div className="cards__container">
        {invoices.length && invoices.map(({ color, name, total}, index) => (
          <button 
            key={`${name}-${index}`} 
            className="cards__container-content" 
            style={{ backgroundColor: `${color}`}}
            onClick={() => handlecard(name)}
          >
            <div>
              <p className="cards__container-content__payable">{parseMoney(total)}</p>
              <RiVisaLine size={36} color="#fff" />
            </div>

            <div>
              <p>{name}</p>
              <p>**** **** **** ****</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Cards