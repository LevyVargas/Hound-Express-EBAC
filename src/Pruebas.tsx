//Estado general

import "./styles.scss";

interface EstadoGeneralProps {
  pendientes: number;
  enTransito: number;
  entregadas: number;
}

const EstadoGeneral = ({ pendientes, enTransito, entregadas }: EstadoGeneralProps) => {
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
                  Expertos en logística y comercio <br /> internacional en México y el mundo
                </h2>
              </div>
              <div className="carousel__subtitle">
                <h2>
                  Usamos tecnología de última generación para que tengas el control de tu operación en
                  tiempo real.
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
            <div className="summary__card summary__card--pending">
              <div className="summary__data">
                <span className="summary__number">{pendientes}</span>
                <p className="summary__label">Guías pendientes</p>
              </div>
            </div>
            <div className="summary__card summary__card--transit">
              <div className="summary__data">
                <span className="summary__number">{enTransito}</span>
                <p className="summary__label">Guías en tránsito</p>
              </div>
            </div>
            <div className="summary__card summary__card--delivered">
              <div className="summary__data">
                <span className="summary__number">{entregadas}</span>
                <p className="summary__label">Guías entregadas</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EstadoGeneral;

//Registro de guías

import { FormEvent, useState } from "react";
import "./styles.scss";
import { Guide, GuideStatus } from "../../types";

interface RegistroGuiasProps {
  onSaveGuide: (guide: Guide) => boolean;
}

const RegistroGuias = ({ onSaveGuide }: RegistroGuiasProps) => {
  const [guideNumber, setGuideNumber] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [recipient, setRecipient] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [status, setStatus] = useState<GuideStatus>("Pendiente");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!guideNumber || !origin || !destination || !recipient || !createdAt) {
      alert("Complete todos los campos antes de guardar la guía.");
      return;
    }

    const newGuide: Guide = {
      guideNumber: guideNumber.trim(),
      origin: origin.trim(),
      destination: destination.trim(),
      recipient: recipient.trim(),
      createdAt,
      status,
    };

    const saved = onSaveGuide(newGuide);
    if (!saved) {
      alert("El número de guía ya existe. Verifica y vuelve a intentarlo.");
      return;
    }

    alert("Guía registrada correctamente.");
    setGuideNumber("");
    setOrigin("");
    setDestination("");
    setRecipient("");
    setCreatedAt("");
    setStatus("Pendiente");
  };

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
                  Expertos en logística y comercio <br /> internacional en México y el mundo
                </h2>
              </div>
              <div className="carousel__subtitle">
                <h2>
                  Usamos tecnología de última generación para que tengas el control de tu operación en
                  tiempo real.
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
      <section className="register">
        <div className="register__container">
          <form className="register__form" onSubmit={handleSubmit}>
            <div className="register__fields">
              <div className="register__field">
                <input
                  className="register__input"
                  type="number"
                  placeholder="Número de guía*"
                  value={guideNumber}
                  onChange={(event) => setGuideNumber(event.target.value)}
                />
              </div>
              <div className="register__field">
                <input
                  className="register__input"
                  type="text"
                  placeholder="Origen*"
                  value={origin}
                  onChange={(event) => setOrigin(event.target.value)}
                />
              </div>
              <div className="register__field">
                <input
                  className="register__input"
                  type="text"
                  placeholder="Destino*"
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                />
              </div>
              <div className="register__field">
                <input
                  className="register__input"
                  type="text"
                  placeholder="Destinatario*"
                  value={recipient}
                  onChange={(event) => setRecipient(event.target.value)}
                />
              </div>
              <div className="register__field">
                <input
                  className="register__input register__input--clickable"
                  type="date"
                  placeholder="Fecha de creación*"
                  value={createdAt}
                  onChange={(event) => setCreatedAt(event.target.value)}
                />
              </div>
              <div className="register__field">
                <select
                  className="register__input register__input--clickable"
                  value={status}
                  onChange={(event) => setStatus(event.target.value as GuideStatus)}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En tránsito">En tránsito</option>
                  <option value="Entregado">Entregado</option>
                </select>
              </div>
              <div className="button__box">
                <button type="submit" className="button__style save">
                  <p className="button__text">Guardar</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default RegistroGuias;

