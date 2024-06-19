import "./HeaderLoggedOut.scss"

import Logo from "../../assets/logo.png"

export const HeaderLoggedOut = () => {
  return (
    <header className="logged-out-header">
      <a href="/"><img src={Logo} alt="logo_prinicpal" /></a>
    </header>
  )
}