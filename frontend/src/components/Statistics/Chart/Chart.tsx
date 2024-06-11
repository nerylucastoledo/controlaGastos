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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gasto por mês',
      },
    },
  };
  
  const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Valor',
        data: [2458.90, 3458.97, 3289.97, 2899.99, 3459.76, 3378.78, 3578.78, 3178.78, 3678.78, 3478.78, 3278.78, 3878.78],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className='chart'>
      <h1>estatísticas</h1>
      <div className='chart__container'>
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}

export default Chart