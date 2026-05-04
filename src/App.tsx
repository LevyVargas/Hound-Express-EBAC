import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegistroGuias from "./components/RegistroGuias/index.js";
import Header from "./components/Header/index.js";
import GlobalStyle from "./theme/GlobalStyles.js";
import Footer from "./components/Footer/index.js";
import Inicio from "./components/Inicio/index.js";
import EstadoGeneral from "./components/EstadoGeneral/index.js";
import ListaGuias from "./components/ListaGuias/index.js";
import { ThemeProvider } from "styled-components";
import Theme from "./theme/index.js";
import { useState, useEffect } from "react";
import { Guia } from "./types";

function App() {
  const [guias, setGuias] = useState<Guia[]>(() => {
    const savedGuias = localStorage.getItem("guias");
    return savedGuias ? JSON.parse(savedGuias) : [
      {
        numeroGuia: "HND-1001",
        estadoActual: "Guadalajara",
        origen: "Ciudad de México",
        destino: "Monterrey",
        fechaUltimaActualizacion: "2024-05-22",
        nombre: "Juan Pérez",
        estatus: "Pendiente",
      },
      {
        numeroGuia: "HND-2002",
        estadoActual: "Guadalajara",
        origen: "Querétaro",
        destino: "Cancún",
        fechaUltimaActualizacion: "2024-05-23",
        nombre: "María López",
        estatus: "En tránsito",
      },
      {
        numeroGuia: "HND-3003",
        estadoActual: "Guadalajara",
        origen: "Puebla",
        destino: "Tijuana",
        fechaUltimaActualizacion: "2024-05-24",
        nombre: "Carlos Sánchez",
        estatus: "Entregado",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("guias", JSON.stringify(guias));
    console.log('El estado de guías ha cambiado:', guias);
  }, [guias]);

  const agregarGuia = (nuevaGuia: Guia) => {
    setGuias([...guias, nuevaGuia]);
  };

  const actualizarGuia = (numeroGuia: string, nuevoEstado: string) => {
    setGuias((prevGuias) =>
      prevGuias.map((g) => {
        if (g.numeroGuia === numeroGuia) {
          const hoy = new Date();
          const fecha = hoy.toISOString().split('T')[0];
          const detalleHistorial = `Cambio a "${nuevoEstado}" el ${fecha} a las ${hoy.toLocaleTimeString()}`;

          return {
            ...g,
            estatus: nuevoEstado,
            fechaUltimaActualizacion: fecha,
            historial: [...(g.historial || []), detalleHistorial],
          };
        }
        return g;
      }),
    );
  };

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Header appName="Hound Express" />
      <div className="App">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/registro"
            element={<RegistroGuias agregarGuia={agregarGuia} />}
          />
          <Route
            path="/estado-general"
            element={<EstadoGeneral guias={guias} />}
          />
          <Route path="/lista-guias" element={<ListaGuias guias={guias} actualizarGuia={actualizarGuia} />} />
        </Routes>
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
