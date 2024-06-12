import "./Invoice.item.scss"

import { MdEditSquare, MdDeleteForever } from "react-icons/md";
import { parseMoney } from "../../utils/FormatValue";

import { Bill } from "../../types";

import { ImCool } from "react-icons/im";

const InvoiceItem = ({ data, peopleSelected }: { data: Bill[], peopleSelected: string }) => {
  const dataFilteredByPeople = data.filter(item => item.people === peopleSelected)

  return (
    <div className="invoice__item">
      <div className="invoice__item__container">
        {dataFilteredByPeople.length ? dataFilteredByPeople.map(({ item, value }, index) => (
          <div key={`${item}-${index}`} className="info">
            <div className="info__container">
              <p>{item}</p>
              <div className="info__container__actions">
                <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#updateInvoice">
                  <MdEditSquare size={16} color="#007bff"/>
                </button>
                <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#deleteInvoice">
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
      <p className="invoice__item__total">R$ 987,98</p>
    </div>
  )
}

export default InvoiceItem