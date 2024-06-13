import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import "./Chart.scss"

import { options} from "./config"
import useLocalStorage from '../../../hooks/useLocalStorage';
import { useFecth } from '../../../hooks/useFetch';
import { useEffect, useState } from 'react';
import Loading from '../../Loadig/Loading';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IProps {
  month: string;
  year: string;
}

interface IData {
  month: string;
  value: number;
}

const Chart = ({ year }: IProps) => {
  const [months, setMonths] = useState<string[]>([])
  const [values, setValues] = useState<number[]>([])
  const [username] = useLocalStorage("username", "")

  const { data, loading, error } = useFecth<IData[]>(
    `${process.env.VITE_DEFAULT_URL}/bill/${username}/${year}`
  )

  useEffect(() => {
    if (data?.length) {
      data.forEach(({ month, value }) => {
        setMonths((prev) => [...prev, month])
        setValues((prev) => [...prev, value])
      })
    }
  }, [data])

  const graph = {
    labels: months,
    datasets: [
      {
        label: 'Valor',
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: '#595959',
        borderWidth: 1,
        base: 0,
      },
    ],
  };


  return (
    <div className='chart'>
      <h1>estatísticas</h1>
      <div className='chart__container'>
       {loading && <Loading />}
       {!loading && <Bar options={options} data={graph} />}
      </div>
    </div>
  )
}

export default Chart