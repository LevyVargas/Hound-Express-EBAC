import { useState } from "react";
import "./styles.scss";
import { Guia } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { updateGuideStatus } from "../../store/guidesSlice";

const ListaGuias = () => {
    const [guiaSeleccionada, setGuiaSeleccionada] = useState<Guia | null>(null);
    const [mostrarModalStatus, setMostrarModalStatus] = useState(false);
    const [mostrarModalHistorial, setMostrarModalHistorial] = useState(false);
    const [nuevoEstado, setNuevoEstado] = useState("");

    const dispatch = useDispatch();
    const guias = useSelector((state: RootState) => state.guides.guides);

    const abrirActualizar = (guia: Guia) => {
        setGuiaSeleccionada(guia);
        setMostrarModalStatus(true);
    };

    const abrirHistorial = (guia: Guia) => {
        setGuiaSeleccionada(guia);
        setMostrarModalHistorial(true);
    };

    const aplicarNuevoEstado = () => {
        if (guiaSeleccionada && nuevoEstado) {
            dispatch(updateGuideStatus({ numeroGuia: guiaSeleccionada.numeroGuia, nuevoEstado }));
            setMostrarModalStatus(false);
            setNuevoEstado("");
            setGuiaSeleccionada(null);
        }
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
            <section className="table__section">
                <div className="table__box">
                    <table className="table">
                        <thead className="table__header">
                            <tr className="table__row">
                                <th>Número de guía</th>
                                <th>Estado actual</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Fecha de la última actualización</th>
                                <th>Nombre</th>
                                <th>Estatus</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="table__body">
                            {guias.length === 0 ? (
                                <tr>
                                    <td colSpan={7}>No hay guías registradas.</td>
                                </tr>
                            ) : (
                                guias.map((guia) => (
                                    <tr key={guia.numeroGuia} className="table__row">
                                        <td>{guia.numeroGuia}</td>
                                        <td>{guia.estadoActual}</td>
                                        <td>{guia.origen}</td>
                                        <td>{guia.destino}</td>
                                        <td>{guia.fechaUltimaActualizacion}</td>
                                        <td>{guia.nombre}</td>
                                        <td>{guia.estatus}</td>
                                        <td>
                                            <div className="table__cell-actions">
                                                <button
                                                    className="btn-guide-action"
                                                    onClick={() => abrirActualizar(guia)}
                                                >
                                                    Actualizar
                                                </button>
                                                <button
                                                    className="btn-guide-action"
                                                    onClick={() => abrirHistorial(guia)}
                                                >
                                                    Historial
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* <div className="button__box">
                    <button type="button" className="button__style change">
                        <p className="button__text">Guardar</p>
                    </button>
                </div> */}
            </section>

            {mostrarModalStatus && (
                <div className="modal is-open">
                    <div className="modal__dialog">
                        <header className="modal__header">
                            <h3 className="modal__title">
                                Actualizar Guía: {guiaSeleccionada?.numeroGuia}
                            </h3>
                            <button
                                className="modal__close"
                                onClick={() => setMostrarModalStatus(false)}
                            >
                                &times;
                            </button>
                        </header>
                        <div className="modal__body">
                            <form className="form--inline">
                                {["Pendiente", "En tránsito", "Entregado"].map((est) => (
                                    <label key={est}>
                                        <input
                                            type="radio"
                                            name="status"
                                            value={est}
                                            onChange={(e) => setNuevoEstado(e.target.value)}
                                        />{" "}
                                        {est}
                                    </label>
                                ))}
                            </form>
                        </div>
                        <footer className="modal__footer">
                            <button
                                className="btn"
                                onClick={() => setMostrarModalStatus(false)}
                            >
                                Cancelar
                            </button>
                            <button className="btn btn--primary" onClick={aplicarNuevoEstado}>
                                Aplicar
                            </button>
                        </footer>
                    </div>
                </div>
            )}

            {mostrarModalHistorial && (
                <div className="modal is-open">
                    <div className="modal__dialog">
                        <header className="modal__header">
                            <h3 className="modal__title">
                                Historial: {guiaSeleccionada?.numeroGuia}
                            </h3>
                            <button
                                className="modal__close"
                                onClick={() => setMostrarModalHistorial(false)}
                            >
                                &times;
                            </button>
                        </header>
                        <div className="modal__body">
                            {guiaSeleccionada?.historial?.length ? (
                                <ul>
                                    {guiaSeleccionada.historial.map((h, i) => (
                                        <li key={i}>{h}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay cambios registrados todavía.</p>
                            )}
                        </div>
                        <footer className="modal__footer">
                            <button
                                className="btn"
                                onClick={() => setMostrarModalHistorial(false)}
                            >
                                Cerrar
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </main>
    );
};

export default ListaGuias;
