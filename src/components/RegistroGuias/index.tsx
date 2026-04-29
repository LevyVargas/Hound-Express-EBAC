import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { Guia } from "../../types";

interface RegistroProps {
    agregarGuia: (guia: Guia) => void;
}

const RegistroGuias = ({ agregarGuia }: RegistroProps) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        numeroGuia: "",
        origen: "",
        destino: "",
        estadoActual: "Pendiente",
        nombre: "",
        estatus: "Activa",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const nueva: Guia = {
            ...formData,
            fechaUltimaActualizacion: new Date().toLocaleDateString(),
        };

        agregarGuia(nueva);
        navigate("/lista-guias");
    };

    return (
        <main className="main">
            <section className="register">
                <div className="register__container">
                    <form className="register__form" onSubmit={handleSubmit}>
                        <div className="register__fields">
                            <div className="register__field">
                                <input
                                    name="numeroGuia"
                                    className="register__input"
                                    type="text"
                                    placeholder="Número de guía*"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="register__field">
                                <input
                                    name="origen"
                                    className="register__input"
                                    type="text"
                                    placeholder="Origen*"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="register__field">
                                <input
                                    name="destino"
                                    className="register__input"
                                    type="text"
                                    placeholder="Destino*"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="register__field">
                                <select
                                    name="estadoActual"
                                    className="register__input register__input--clickable"
                                    onChange={handleChange}
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
