import "./Loading.scss"

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="loading">
      <AiOutlineLoading3Quarters className="loading-icon" size={48} color="#FFA8A8" />
      <p>Carregando os dados...</p>
    </div>
  )
}

export default Loading