import { Link } from "react-router-dom";
import "./styles.scss";

interface HeaderProps {
  appName: string;
}

const Header = ({ appName }: HeaderProps) => {
  return (
    <header className="header">
      <section className="header__section">
        <div className="header__content">
          <div className="header__logo-container">
            <img
              className="header__logo"
              src="IMG/logo-Hound_Express-bg-white.png"
              alt="Inicio"
            />
          </div>
          <div className="header__contact-group">
            <div className="header__contact">
              <span className="header__contact-title">MX</span>
              <a className="header__contact-text">+52(55) 4000 1920</a>
            </div>
            <div className="header__contact">
              <span className="header__contact-title">USA</span>
              <a className="header__contact-text">+1(956) 568 3443</a>
            </div>
          </div>
          <div className="header__language">
            <a>Idioma▾</a>
          </div>
        </div>
      </section>
      <section className="nav">
        <nav className="nav__menu">
          <div className="nav__group--primary">
            <ul className="nav__list">
              <a>
                <Link to="/" className="nav__item" >Inicio</Link>
              </a>
              <a>
                <Link to="/registro" className="nav__item">Registro de guias</Link>
              </a>
              <a>
                <Link to="/estado-general" className="nav__item">Estado General</Link>
              </a>
              <a>
                <Link to="/lista-guias" className="nav__item">Lista de Guías</Link>
              </a>
            </ul>
          </div>
          <div className="nav__group--secondary">
            <ul className="nav__list">
              <a href="" className="nav__item">
                Buscar Guías
              </a>
              <a
                href=""
                className="nav__item"
                style={{ backgroundColor: "#6AC6DE" }}
              >
                Historial de Guías
              </a>
            </ul>
          </div>
          <div className="">
            <input
              type="checkbox"
              id="toggle-submenu"
              className="menu__checkbox"
            />
            <ul className="menu__list">
              <li className="menu__item menu__item--has-submenu">
                <label htmlFor="toggle-submenu" className="menu__link">
                  <img src="IMG/menu.svg" alt="" className="menu__img" />
                </label>
                <ul className="submenu">
                  <li>
                    <a>
                      <Link to="/" className="nav__item">Inicio</Link>
                    </a>
                  </li>
                  <li>
                    <a className="nav__item">
                      <Link to="/registro" className="nav__item">Registro de Guías</Link>
                    </a>
                  </li>
                  <li>
                    <a className="nav__item">
                      <Link to="/estado-general" className="nav__item">Estado General</Link>
                    </a>
                  </li>
                  <li>
                    <a className="nav__item">
                      <Link to="/lista-guias" className="nav__item">Lista de Guías</Link>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </section>
    </header>
  );
};

export default Header;
