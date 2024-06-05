import "./HeaderLoggedOut.scss"

import Logo from "../../assets/logo.png"

const HeaderLoggedOut = () => {
  return (
    <header className="logged-out-header">
      <img src={Logo} alt="logo_prinicpal" />
    </header>
  )
}

export default HeaderLoggedOut;