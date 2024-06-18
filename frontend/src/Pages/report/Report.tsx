import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { ImCool } from "react-icons/im";

import "./Report.scss"

import Header from '../../components/Header/Header'

import { monthsAndYears } from '../../utils/Date';
import { useFecth } from '../../hooks/useFetch';
import { IData } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';
import Loading from '../../components/Loadig/Loading';
import SelectField from '../../components/SelectField/SelectField';
import { formatCurrencyToNumber, parseMoney } from '../../utils/FormatValue';

interface IReport {
  "people": string;
  "value": number;
}

const Report = () => {
  const [username] = useLocalStorage("username", "")

  const { currentMonth, currentYear, months, years } = monthsAndYears()

  const [month, setMonth] = useState(currentMonth)
  const [year, setYear] = useState(currentYear)
  const [report, setReport] = useState<IReport[]>([])

  const { data, loading, error } = useFecth<IData>(
    `${process.env.VITE_DEFAULT_URL}/bill?username=${username}&date=${month+year}`
  )

  useEffect(() => {
    setReport([])
    getValues()
  }, [data])

  const getValues = () => {
    const peoples = getPeoples()
    peoples.add("Eu")

    peoples.forEach((people) => {
      const value = data?.billList.reduce((total, transaction) => {
        if (transaction.people === people) {
          return Number(total) + Number(formatCurrencyToNumber(transaction.value))
        } else {
          return Number(total) + 0
        } 
      }, 0)

      const body: IReport = {
        people: people as string,
        value: value as number
      }

      setReport((previous) => [...previous, body])
    })
  }

  const getPeoples = () => {
    const peoples = new Set<string>()
    data?.peopleList.forEach(({ name }) => peoples.add(name))
    return peoples
  }

  return (
    <>
      <Helmet>
        <title>controlaGastos - Relatório</title>
        <meta 
          name="description" 
          content="Veja um relatório de quanto as pessoas tem para pagar dos seus cartões no controlaGasto." />
      </Helmet>
      
      <div className='report'>
        <Header />

        <div className='report__container'>
          <h1>Relatório</h1>
          <p className='report__container__subtitle'>Veja quanto as pessoas gastaram</p>

          {!error && loading && <Loading />}

          {!error && !loading && (
            <div className='report__container__content'>
              <div className='report__container__content__filter'>
                <SelectField 
                  label="Selecione o mês" 
                  name="month"
                  options={months}
                  defaultValue={month}   
                  onChange={({target}) => setMonth(target.value)}
                />

                <SelectField 
                  label="Selecione o ano" 
                  name="month"
                  options={years}
                  defaultValue={year}   
                  onChange={({target}) => setYear(target.value)}
                />
              </div>

              <div className='report__container__content__expense'>
                {report?.length ? report.map((item, index) => (
                  <>
                    {item.value ? (
                      <div key={`${item.people} - ${index}`}>
                        <p>{item.people}</p>
                        <p>{parseMoney(item.value)}</p>
                      </div>
                    ) : null}
                  </>
                )) : (
                  <div className='report__container__content__expense__empty'>
                    <i>Boooa! <br /> Seu cartão esta zerado <ImCool size={14} /></i>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Report
