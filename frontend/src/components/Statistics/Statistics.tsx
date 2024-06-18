import { FaMedal } from "react-icons/fa";

import "./Statistics.scss"

import { Bill } from "../../types";
import { formatCurrencyToNumber, parseMoney } from "../../utils/FormatValue";

interface IRankingCategory {
  name_category: string;
  total: number;
}

const Statistics = ({ bill }: { bill: Bill[] }) => {
  const ranking: IRankingCategory[] = []
  
  const getCategorys = () => {
    const categorys = new Set<string>()
    bill.forEach((item) => item.people === 'Eu' && categorys.add(item.category))
    return categorys
  }
  const categorys = getCategorys()

  categorys.forEach((name_category: string) => {
    const total = bill
      .filter((item) => item.people === 'Eu')
      .filter((item) => item.category === name_category)
      .reduce((total, item) => Number(total) + Number(formatCurrencyToNumber(item.value)), 0)

    ranking.push({ name_category, total })
  })

  if (ranking.length) {
    ranking.sort((item, nextitem) => item.total < nextitem.total ? 1 : -1)
  }

  return (
    <div className="statistics">
      <div className="ranking">
        {ranking?.length ? ranking.map(item => (
          <div key={item.name_category} data-testid="ranking">
            <FaMedal />
            <p className="ranking-title">{item.name_category}</p>
            <p className="ranking-value">{parseMoney(item.total)}</p>
          </div>
        )) : null}
      </div>
    </div>
  )
}

export default Statistics