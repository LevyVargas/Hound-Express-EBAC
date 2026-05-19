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

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Header appName="Hound Express" />
      <div className="App">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/registro"
            element={<RegistroGuias />}
          />
          <Route
            path="/estado-general"
            element={<EstadoGeneral />}
          />
          <Route path="/lista-guias" element={<ListaGuias />} />
        </Routes>
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
