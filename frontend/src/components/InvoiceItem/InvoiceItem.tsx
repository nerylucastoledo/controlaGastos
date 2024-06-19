import { MdEditSquare, MdDeleteForever } from "react-icons/md";
import { ImCool } from "react-icons/im";

import "./Invoice.item.scss"

import { formatCurrencyToNumber, parseMoney } from "../../utils/FormatValue";
import { Bill } from "../../types";

interface IProps {
  data: Bill[];
  peopleSelected: string;
  setEditItem: React.Dispatch<React.SetStateAction<Bill | null>>;
  setDeleteItem: React.Dispatch<React.SetStateAction<Bill | null>>;
}

export const InvoiceItem = ({ data, peopleSelected, setEditItem, setDeleteItem }: IProps) => {
  const dataFilteredByPeople = data.filter(item => item.people === peopleSelected)

  const valueToPay = dataFilteredByPeople.reduce((acc, item) => {
    const value = formatCurrencyToNumber(item.value);
    return acc + value
  }, 0)

  return (
    <div className="invoice__item">
      <div className="invoice__item__container">
        {dataFilteredByPeople.length ? dataFilteredByPeople.map(({ item, value }, index) => (
          <div key={`${item}-${index}`} className="info">
            <div className="info__container">
              <p>{item}</p>

              <div className="info__container__actions">
                <button 
                  className="btnModal" 
                  type="button" 
                  data-bs-toggle="modal" 
                  data-bs-target="#updateInvoice" 
                  data-testid="modalUpdate"
                  onClick={() => setEditItem(dataFilteredByPeople[index])}
                >
                  <MdEditSquare size={16} color="#007bff"/>
                </button>

                <button 
                  className="btnModal" 
                  type="button" 
                  data-bs-toggle="modal" 
                  data-bs-target="#deleteInvoice"
                  data-testid="modalDelete"
                  onClick={() => setDeleteItem(dataFilteredByPeople[index])}
                >
                  <MdDeleteForever size={16} color="#dc3545" />
                </button>
              </div>
            </div>
            <p className="info__value">{parseMoney(value)}</p>
          </div>
        )) : (
          <p className="invoice__item__empty">fatura vazia <ImCool size={16} /></p>
        )}
      </div>
      
      <p className="invoice__item__total" data-testid="total">{parseMoney(valueToPay)}</p>
    </div>
  )
}