import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <ul>
      <li>
        <NavLink to="/">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/new-bill">Adicionar gastos</NavLink>
      </li>
      <li>
        <NavLink to="/report">Relatório</NavLink>
      </li>
      <li>
        <NavLink to="/config">Configurações</NavLink>
      </li>
    </ul>
  )
}

export default Menu;