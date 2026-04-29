import React from "react";
import "./styles.scss";
import { Guia, ListaGuiasProps } from '../../types';


const ListaGuias = ({ guias }: ListaGuiasProps ) => {
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
            <section className="table-section">
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
                                            <button className="btn-guide-action">Actualizar</button>
                                            <button className="btn-guide-action">Historial</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="button__box">
                    <button type="button" className="button__style change">
                        <p className="button__text">Guardar</p>
                    </button>
                </div>
            </section>

            <div id="statusModal" className="modal" aria-hidden="true">
                <div className="modal__dialog">
                    <header className="modal__header">
                        <h3 className="modal__title">Seleccionar estado</h3>
                        <button className="modal__close" type="button" aria-label="Cerrar">
                            &times;
                        </button>
                    </header>
                    <div className="modal__body">
                        <form id="statusForm" className="form--inline">
                            <label>
                                <input type="radio" name="status" value="Pendiente" /> Pendiente
                            </label>
                            <label>
                                <input type="radio" name="status" value="En tránsito" /> En
                                tránsito
                            </label>
                            <label>
                                <input type="radio" name="status" value="Entregado" /> Entregado
                            </label>
                        </form>
                    </div>
                    <footer className="modal__footer">
                        <button type="button" id="statusCancel" className="btn">
                            Cancelar
                        </button>
                        <button type="button" id="statusApply" className="btn btn--primary">
                            Aplicar
                        </button>
                    </footer>
                </div>
            </div>

            <div id="historyModal" className="modal" aria-hidden="true">
                <div className="modal__dialog">
                    <header className="modal__header">
                        <h3 className="modal__title">Historial de la guía</h3>
                        <button className="modal__close" type="button" aria-label="Cerrar">
                            &times;
                        </button>
                    </header>
                    <div className="modal__body">
                        <div id="historyContent" className="history__content"></div>
                    </div>
                    <footer className="modal__footer">
                        <button type="button" id="historyClose" className="btn">
                            Cerrar
                        </button>
                    </footer>
                </div>
            </div>
        </main>
    );
};

export default ListaGuias;
