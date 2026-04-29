import React, { useState } from "react"; // 1. Importamos useState
import { useNavigate } from "react-router-dom"; // Para redirigir tras guardar
import "./styles.scss";
import { Guia } from "../../types";

interface RegistroProps {
    agregarGuia: (guia: Guia) => void;
}

const RegistroGuias = ({ agregarGuia }: RegistroProps) => {
    const navigate = useNavigate();

    // 2. Estado para el formulario (un objeto con la forma de la Guía)
    const [formData, setFormData] = useState({
        numeroGuia: "",
        origen: "",
        destino: "",
        estadoActual: "Pendiente",
        nombre: "",
        estatus: "Activa"
    });

    // 3. Función para actualizar el estado cuando escribes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 4. Función para enviar los datos
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const nueva: Guia = {
            ...formData,
            fechaUltimaActualizacion: new Date().toLocaleDateString(), // Fecha de hoy
        };

        agregarGuia(nueva); // Le enviamos la guía al padre (App.tsx)
        navigate("/lista-guias"); // Redirigimos a la tabla para ver el resultado
    };

    return (
        <main className="main">
            {/* ... El carousel se queda igual ... */}
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
                                {/* Cambiamos type="button" a "submit" */}
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
}

export default RegistroGuias;