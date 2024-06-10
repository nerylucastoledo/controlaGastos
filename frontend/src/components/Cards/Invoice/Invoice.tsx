import { MdEditSquare, MdDeleteForever } from "react-icons/md";

import "./Invoice.scss"

const Invoice = () => {
  return (
    <div className="invoice" style={{ display: "none" }}>
      <div className="invoice__screen" style={{ backgroundColor: `red`}}>
        <h2>Nubank</h2>

        <div className="invoice__container">
          <div className="invoice__container-names">
            <button className="active">Lucas</button>
            <button>Alexsander</button>
            <button>Guilherme</button>
            <button>Lucas</button>
          </div>

          <div className="invoice__container-content">
            <div className="container">
              <div className="container__item">
                <div className="container__item-info">
                  <p>Passagem</p>
                  <div className="container__item-info__actions">
                    <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#updateInvoice">
                      <MdEditSquare size={16} color="#007bff"/>
                    </button>
                    <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#deleteInvoice">
                      <MdDeleteForever size={16} color="#dc3545" />
                    </button>
                  </div>
                </div>
                <p className="container__item-value">R$ 249,90</p>
              </div>
              <div className="container__item">
                <div className="container__item-info">
                  <p>Passagem de guarulhos para salvador dia 13/09</p>
                  <div className="container__item-info__actions">
                    <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#updateInvoice">
                      <MdEditSquare size={16} color="#007bff"/>
                    </button>
                      <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#deleteInvoice">
                        <MdDeleteForever size={16} color="#dc3545" />
                      </button>
                  </div>
                </div>
                <p className="container__item-value">R$ 249,90</p>
              </div>
              <div className="container__item">
                <div className="container__item-info">
                  <p>Passagem</p>
                  <div className="container__item-info__actions">
                    <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#updateInvoice">
                      <MdEditSquare size={16} color="#007bff"/>
                    </button>
                    <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#deleteInvoice">
                      <MdDeleteForever size={16} color="#dc3545" />
                    </button>
                  </div>
                </div>
                <p className="container__item-value">R$ 249,90</p>
              </div>
              <div className="container__item">
                <div className="container__item-info">
                  <p>Passagem</p>
                  <div className="container__item-info__actions">
                    <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#updateInvoice">
                      <MdEditSquare size={16} color="#007bff"/>
                    </button>
                    <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#deleteInvoice">
                      <MdDeleteForever size={16} color="#dc3545" />
                    </button>
                  </div>
                </div>
                <p className="container__item-value">R$ 249,90</p>
              </div>
              <div className="container__item">
                <div className="container__item-info">
                  <p>Passagem</p>
                  <div className="container__item-info__actions">
                    <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#updateInvoice">
                      <MdEditSquare size={16} color="#007bff"/>
                    </button>
                    <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#deleteInvoice">
                      <MdDeleteForever size={16} color="#dc3545" />
                    </button>
                  </div>
                </div>
                <p className="container__item-value">R$ 249,90</p>
              </div>
              <div className="container__item">
                <div className="container__item-info">
                  <p>Passagem</p>
                  <div className="container__item-info__actions">
                    <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#updateInvoice">
                      <MdEditSquare size={16} color="#007bff"/>
                    </button>
                    <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#deleteInvoice">
                      <MdDeleteForever size={16} color="#dc3545" />
                    </button>
                  </div>
                </div>
                <p className="container__item-value">R$ 249,90</p>
              </div>
              <div className="container__item">
                <div className="container__item-info">
                  <p>Passagem</p>
                  <div className="container__item-info__actions">
                    <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#updateInvoice">
                      <MdEditSquare size={16} color="#007bff"/>
                    </button>
                    <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#deleteInvoice">
                      <MdDeleteForever size={16} color="#dc3545" />
                    </button>
                  </div>
                </div>
                <p className="container__item-value">R$ 249,90</p>
              </div>
              <div className="container__item">
                <div className="container__item-info">
                  <p>Passagem</p>
                  <div className="container__item-info__actions">
                    <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#updateInvoice">
                      <MdEditSquare size={16} color="#007bff"/>
                    </button>
                      <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#deleteInvoice">
                        <MdDeleteForever size={16} color="#dc3545" />
                      </button>
                  </div>
                </div>
                <p className="container__item-value">R$ 249,90</p>
              </div>
            </div>
          </div>
        </div>
        <p className="invoice__total">R$ 987,98</p>
      </div>
    </div>
  )
}

export default Invoice