import { Link } from "react-router-dom";
import "./styles.scss";

const Inicio = () => {
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
            <section className="description">
                <div className="description__container">
                    <div className="description__info">
                        <h2 className="description__title">
                            "Más rápido. Más lejos. Siempre a tiempo."
                        </h2>
                        <p className="description__text">
                            {" "}
                            Usa nuestro sistema e intégrate a él.
                        </p>
                        <ul className="description__list">
                            <li>Centraliza tus procesos.</li>
                            <li>Aumenta tu productividad.</li>
                            <li>Monitorea en todo momento tus operaciones.</li>
                        </ul>
                        <div className="button__info">
                            <a>
                                <button type="button" className="button">
                                    <p className="button__text">Portal del cliente</p>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="description__image">
                        <img
                            src="https://www.hound-express.com/images/Animacion-beneficios-sistema-v2.gif"
                            alt="img"
                            style={{ width: "100%" }}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Inicio;
