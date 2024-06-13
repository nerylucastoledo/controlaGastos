import { Header } from '../../components/Header/Header';

import { Helmet } from 'react-helmet';

const Config = () => {
  return (
    <>
      <Helmet>
        <title>controlaGastos - Configurações</title>
        <meta 
          name="description" 
          content="Faça as alterações dos seus dados, suas categorias e pessoas que usam seu cartão no controlaGasto." />
      </Helmet>
      <Header />
    </>
  )
}

export default Config;