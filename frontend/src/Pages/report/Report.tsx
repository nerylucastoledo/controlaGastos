import { Helmet } from 'react-helmet';

import Header from '../../components/Header/Header'

const Report = () => {
  return (
    <>
      <Helmet>
        <title>controlaGastos - Relatório</title>
        <meta 
          name="description" 
          content="Veja um relatório de quanto as pessoas tem para pagar dos seus cartões no controlaGasto." />
      </Helmet>
      <Header />
    </>
  )
}

export default Report
