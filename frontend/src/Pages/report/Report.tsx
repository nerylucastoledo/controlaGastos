import { Header } from '../../components/Header/Header'

import { Helmet } from 'react-helmet';

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
