import { useNavigate } from "react-router-dom";
import { RiMenu2Fill } from 'react-icons/ri';
import { IoMdClose } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";

import "./Header.scss"

import Logo from "../../assets/logo.png"

import Menu from "./menu/Menu";

const Header = () => {
  const navigate = useNavigate()

  return (
    <header className="header">
      <button className="header__logo" onClick={() => navigate("/")}>
        <img src={Logo} alt="logo_prinicpal" />
      </button>
      
      <div className="header-mobile">
        <button id="closeMenu" type="button" data-bs-toggle="offcanvas" data-bs-target="#menuMobile" aria-controls="menuMobile" aria-label="Menu de celular">
          <RiMenu2Fill color="#ffa8a8" size={36} />
        </button>

        <div className="offcanvas offcanvas-start" tabIndex={-1} id="menuMobile" aria-labelledby="menuMobileLabel">
          <div className="offcanvas-header">
            <button type="button" data-bs-toggle="offcanvas" data-bs-target="#menuMobile" aria-controls="menuMobile">
              <IoMdClose size={36} color="#595959"/>
            </button>
          </div>
          
          <div className="offcanvas-body">
            <Menu />
            <div>
              <button className="offcanvas-body__logout">
                Sair
                <IoIosLogOut size={36} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="header-desktop">
        <Menu />
      </div>
    </header>
  )
}

export default Header;