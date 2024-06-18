import { FormEvent, useEffect, useState } from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';

import "./NewBill.scss"

import Header from "../../components/Header/Header";
import InputField from "../../components/InputField/InputField";
import Loading from "../../components/Loadig/Loading";
import SelectField from "../../components/SelectField/SelectField";
import Toast from "../../components/Toast/Toast";

import { monthsAndYears } from "../../utils/Date";
import { formatCurrency } from "../../utils/FormatValue";
import { useData } from "../../context/Data";
import useLocalStorage from "../../hooks/useLocalStorage";

const ENUM_CATEGORYS = {
  "Alimentação": "alimentacao",
  "Doação": "doacao",
  "Educação": "educacao",
  "Entretenimento": "entretenimento",
  "Imposto": "imposto",
  "Investimentos": "investimentos",
  "Lazer": "lazer",
  "Moradia": "moradia",
  "Nãoprevisto": "nao_previsto",
  "Outros": "outros",
  "Saúde": "saude",
  "Tecnologia": "tecnologia",
  "Transporte": "transporte",
  "Vestuário": "vestuario",
  "Viagens": "viagens"
}

const NewBill = () => {
  const [monthSelected, setMonthSelected] = useState("")
  const [yearSelected, setYearSelected] = useState("")
  const [peopleSelected, setPeopleSelected] = useState("")
  const [cardSelected, setCardSelected] = useState("")
  const [categorySelected, setCategorySelected] = useState("")
  const [installmentValue, setInstallmentValue] = useState(0)
  const [installmentInput, setInstallmentInput] = useState(false)
  const [item, setItem] = useState("")
  const [value, setValue] = useState("")

  const [peoples, setPeoples] = useState<string[]>([])
  const [cards, setCards] = useState<string[]>([])
  const [categorys, setCategorys] = useState<string[]>(Object.keys(ENUM_CATEGORYS))

  const [inputErrors, setInputErrors] = useState<string[]>([])
  const [errorToast, setErrorToast] = useState(true)
  const [message, setMessage] = useState("")

  const { data, loading, error, month, year, setUpdate } = useData()
  const [username] = useLocalStorage("username", "")
  const { months, years }= monthsAndYears()

  useEffect(() => {
    if (error) {
      setMessage(error)
      return;
    }

    if (data) {
      const { peopleList, cardList, categoryList } = data;

      setPeoples(peopleList.map(people => people.name))
      setPeopleSelected(peopleList[0].name)

      setCards(cardList.map(card => card.name))
      setCardSelected(cardList[0].name)
      
      const newCategorys = categoryList.map(category => category.name)
      setCategorys((prev) => [...prev, ...newCategorys])
      setCategorySelected(categoryList[0].name)

      setMonthSelected(month)
      setYearSelected(year)

      setErrorToast(false)
    }
  }, [data, error])

  const closeToast = () => {
    setMessage("")
    setErrorToast(false)
  }

  const createBody = (installment: number) => {
    if (installment > 1) {
      const body = []
      let yearToInsert = Number(year)
      let indexOfMonth = months.indexOf(month)

      for(let index = 0; index < installment; index++) {
        const numberOfMonths = 11

        if (indexOfMonth > numberOfMonths) {
          yearToInsert = yearToInsert + 1
          indexOfMonth = (indexOfMonth - 1) - numberOfMonths
        }

        const name = `${item} ${index + 1}-${installment}`
        const date = `${months[indexOfMonth]}${yearToInsert}`

        body.push({
          username,
          date,
          people: peopleSelected,
          // @ts-ignore
          category: ENUM_CATEGORYS[categorySelected.trim()] ?? "outros",
          value, 
          item: name,
          card: cardSelected,
        })

        indexOfMonth += 1
      }

      return body
    }

    return {
      username,
      date: `${monthSelected}${yearSelected}`,
      people: peopleSelected,
      // @ts-ignore
      category: ENUM_CATEGORYS[categorySelected.trim()] ?? "outros",
      value, 
      item,
      card: cardSelected,
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // remove errors from inputs
    setInputErrors([])

    const submit = document.querySelector(".new-bill-form .btn-primary-custom") as HTMLButtonElement;
    submit.disabled = true;

    const newErrors: string[] = [];

    // validate if the inputs are filled
    if (!item) newErrors.push("item")
    if (!value) newErrors.push("value")
    if (installmentInput && !installmentValue) newErrors.push("installment")

    setInputErrors(newErrors);

    if (newErrors.length) {
      submit.disabled = false;
      return
    }

    // create the body to be sent to the API
    const body = createBody(installmentValue)

    // send the registered expense
    fetch(`${process.env.VITE_DEFAULT_URL}/bill`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body, installment: installmentValue }) 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error.message)
      
      // show success tooltip and update the component
      setMessage(data.message)
      setUpdate(true)

      // reset inputs
      setItem("")
      setValue("")
      setInstallmentValue(0)
      setMonthSelected(month)
      setYearSelected(year)
      setPeopleSelected(peoples[0])
      setCardSelected(cards[0])
      setCategorySelected(categorySelected[0])
    })
    .catch(error => {
      submit.disabled = false;
      setErrorToast(true)
      setMessage(error.message || "Ocorreu um erro ao cadastrar o gasto!")
    });
  }

  return (
    <>
      <Helmet>
        <title>controlaGastos - Inserir gasto</title>
        <meta 
          name="description" 
          content="Ao inserir um gasto no controlagasto você fica com maior controle de quem gastou o que no seu cartão." />
      </Helmet>

      <div className="new-bill">
        <Header />

        {message && <Toast message={message} error={errorToast} hideToast={closeToast} />}

        <div className="new-bill__container">
          <h1>Cadastrar gasto</h1>

          <p className="new-bill__container__subtitle">
            Cadastre um novo gasto por aqui
          </p>

          {!error && loading && <Loading />}

          {!loading && !error && data && (
            <form action="" className="new-bill-form" onSubmit={handleSubmit}>
              <div className="new-bill-form__date">
                <SelectField 
                  label="Selecione o mês" 
                  name="month"
                  options={months}
                  defaultValue={month}   
                  onChange={({target}) => setMonthSelected(target.value)}
                />

                <SelectField 
                  label="Selecione o ano" 
                  name="year"
                  options={years}
                  defaultValue={year}
                  onChange={({target}) => setYearSelected(target.value)}
                />
              </div>

              <div>
                <label htmlFor="people">pessoa</label>
                <SelectField 
                  label="Selecione a pessoa" 
                  name="people"
                  options={peoples}
                  defaultValue={peoples[0]}
                  onChange={({target}) => setPeopleSelected(target.value)}
                />
              </div>

              <div>
                <label htmlFor="card">cartão</label>
                <SelectField 
                  label="Selecione o cartão" 
                  name="category"
                  options={cards}
                  defaultValue={cards[0]}
                  onChange={({target}) => setCardSelected(target.value)}
                />
              </div>

              <div>
                <label htmlFor="category">categoria</label>
                <SelectField 
                  label="Selecione a categoria" 
                  name="category"
                  options={categorys}
                  defaultValue={categorys[0]}
                  onChange={({target}) => setCategorySelected(target.value)}
                />
              </div>

              <InputField
                label="item"
                name="item"
                type="text"
                placeholder="Escreva o que é"
                value={item}
                onChange={({ currentTarget }) => setItem(currentTarget.value)}
                errorMessage={inputErrors.includes("item") ?  "Descrição não pode ser vazia!" : ""}
              />

              <div className="new-bill-form__installment">
                <input 
                  type="checkbox" 
                  name="installment" 
                  id="installment"
                  onChange={() => setInstallmentInput(!installmentInput)} 
                  checked={installmentInput} 
                  
                  />
                <label htmlFor="installment">Está parcelado?</label>
              </div>

              {installmentInput && (
                <InputField
                  label="Quantidade de parcelas"
                  name="installmentValue"
                  type="number"
                  placeholder="Digite a quantidade"
                  value={installmentValue}
                  onChange={({ currentTarget }) => setInstallmentValue(parseInt(currentTarget.value))}
                  errorMessage={inputErrors.includes("installment") ?  "Parcela deve ser maior que 1" : ""}
                />
              )}

              <InputField
                label="valor"
                name="value"
                type="text"
                placeholder="Digite o valor"
                value={value}
                onChange={({ currentTarget }) => setValue(formatCurrency(currentTarget.value))}
                errorMessage={inputErrors.includes("value") ?  "Valor não pode ser vazio!" : ""}
              />

              <button style={{ marginTop: "8px" }} type="submit" className="btn-primary-custom">
                Cadastrar
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default NewBill;