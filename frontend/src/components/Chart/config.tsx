import { parseMoney } from "../../utils/FormatValue";

export const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        // @ts-ignore
        callback: (value) => {
          return parseMoney(value);
        }
      }
    },
    x: {
      grid: {
        display: false // Remove as linhas de grade no eixo X
      }
   }
  },
  plugins: {
    tooltip: {
      callbacks: {
        // @ts-ignore
        label: (context) => {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += parseMoney(context.parsed.y);
          }
          return " " + label;
        },
        labelColor: () => {
          return {
            borderColor: '#FFA8A8',
            backgroundColor: '#FFA8A8',
          };
        },
        labelTextColor: () => '#fff'
      }
    },
    title: {
      display: true,
      text: 'Gasto por mês',
    },
  },
};