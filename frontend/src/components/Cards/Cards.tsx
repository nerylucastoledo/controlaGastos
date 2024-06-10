import { RiVisaLine } from "react-icons/ri";

import "./Cards.scss"

interface Card {
  name: string,
  color: string,
  value: string
}

const Cards = () => {
  const mock: Card[] = [
    {
      name: "Nubank",
      color: "#8E2C91",
      value: "R$ 3.568,90"
    },
    {
      name: "Samsung",
      color: "#000000",
      value: "R$ 2.899,97"
    },
    {
      name: "Picpay",
      color: "green",
      value: "R$ 689,97"
    },
  ]
  return (
    <div className="cards">
      <h1>cartões</h1>

      <div className="cards__container">
        {mock && mock.length && mock.map((card) => (
          <div className="cards__container-content" style={{ backgroundColor: `${card.color}`}}>
            <div>
              <p className="cards__container-content__payable">{card.value}</p>
              <RiVisaLine size={36}/>
            </div>
            <div>
              <p>{card.name}</p>
              <p>**** **** **** ****</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cards