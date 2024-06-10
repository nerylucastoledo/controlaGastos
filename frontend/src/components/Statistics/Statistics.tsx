import Chart from "./Chart/Chart"

import "./Statistics.scss"

import { FaMedal } from "react-icons/fa";

const Statistics = () => {
  return (
    <div className="statistics">
      <h1>estatísticas</h1>
      <Chart />
      <div className="ranking">
        <div>
          <FaMedal color="#ffd700"/>
          <p className="ranking-title">Lazer</p>
          <p className="ranking-value">R$ 1.120,80</p>
        </div>
        <div>
          <FaMedal color="#c0c0c0"/>
          <p className="ranking-title">Lazer</p>
          <p className="ranking-value">R$ 1.120,80</p>
        </div>
        <div>
          <FaMedal color="#cd7f32"/>
          <p className="ranking-title">Lazer</p>
          <p className="ranking-value">R$ 1.120,80</p>
        </div>
      </div>
    </div>
  )
}

export default Statistics