import "./styles.scss";
import { EstadoGeneralProps } from '../../types';

const EstadoGeneral = ({ guias }: EstadoGeneralProps) => {
  const pendientes = guias.filter(p => p.estatus === "Pendiente").length;
  const transito = guias.filter(t => t.estatus === "En tránsito").length;
  const entregados = guias.filter(e => e.estatus === "Entregado").length;
  return (
    <main className="main">
      <section className="carousel">
        <div className="carousel__image">
          <img
            src="https://www.hound-express.com/images/carrusel/pista-de-aviones.png"
            className="carousel__runway"
          />
          <div className="carousel__cover">
            <div className="carousel__content">
              <div className="carousel__title">
                <h2>
                  Expertos en logística y comercio <br /> internacional en
                  México y el mundo{" "}
                </h2>
              </div>
              <div className="carousel__subtitle">
                <h2>
                  Usamos tecnología de última generación para que tengas el
                  control de tu operación en tiempo real.
                </h2>
              </div>
            </div>
          </div>
          <img
            src="https://www.hound-express.com/images/carrusel/avion-home.png"
            className="carousel__plane"
          />
        </div>
      </section>
      <section className="summary">
        <div className="guides-container">
          <div className="summary__cards">
            <a
              href="serviciocargo.html"
              className="summary__card"
              style={{
                backgroundColor: "#e53e51",
                textDecoration: "none",
                color: "#091E3F",
              }}
            >
              <img
                src="https://www.hound-express.com/images/svg/logo-ecommerce-white.svg"
                alt=""
                className="summary__icon"
              />
              <div className="summary__data">
                <ul className="summary__list">
                  <li className="summary__text">Activas: {pendientes}</li>
                </ul>
              </div>
              <div className="summary__arrow">
                <img
                  className="summary__icon"
                  src="https://www.hound-express.com/images/svg/flecha-servicios.svg"
                  alt="Flecha servicios"
                />
              </div>
            </a>
            <a
              href="serviciocustoms.html"
              className="summary__card"
              style={{
                backgroundColor: "#3dae2b",
                textDecoration: "none",
                color: "#091E3F",
              }}
            >
              <img
                src="https://www.hound-express.com/images/svg/logo-ecommerce-white.svg"
                alt=""
              />
              <ul className="summary__list">
                <li className="summary__text">Entregados: {entregados}</li>
              </ul>
              <div className="summary__arrow">
                <img
                  className="summary__icon"
                  src="https://www.hound-express.com/images/svg/flecha-servicios.svg"
                  alt="Flecha servicios"
                />
              </div>
            </a>
            <a
              href="servicioparcel.html"
              className="summary__card"
              style={{
                backgroundColor: "#ff9015",
                textDecoration: "none",
                color: "#091E3F",
              }}
            >
              <img
                src="https://www.hound-express.com/images/svg/logo-ecommerce-white.svg"
                alt=""
              />
              <ul className="summary__list">
                <li className="summary__text">En Tránsito: {transito}</li>
              </ul>
              <div className="summary__arrow">
                <img
                  className="summary__icon"
                  src="https://www.hound-express.com/images/svg/flecha-servicios.svg"
                  alt="Flecha servicios"
                />
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EstadoGeneral;
