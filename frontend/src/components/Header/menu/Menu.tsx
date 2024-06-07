import { NavLink } from "react-router-dom";

const Menu = () => {
  const closeHeader = () => {
    const btnclose = document.querySelector("#closeMenu") as HTMLElement;
    btnclose?.click()
  }

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
      <li>
        <div className="dropdown">
          <button type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            Criar novo item
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#newPeople" onClick={closeHeader}>
                Cadastrar pessoa
              </button>
            </li>
            <li>
              <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#newCard" onClick={closeHeader}>
                Cadastrar cartão
              </button>
            </li>
            <li>
              <button className="btnModal" type="button" data-bs-toggle="modal" data-bs-target="#newCategory" onClick={closeHeader}>
                Cadastrar categoria
              </button>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  )
}

export default Menu;