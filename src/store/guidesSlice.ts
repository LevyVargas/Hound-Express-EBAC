import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Guia } from "../types";

interface GuidesState {
    guides: Guia[];
    loading: boolean;
    error: string | null;
}

const loadFromLocalStorage = (): Guia[] => {
    const savedGuias = localStorage.getItem("guias");
    if (savedGuias) {
        return JSON.parse(savedGuias);
    }
    return [
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
};

const initialState: GuidesState = {
    guides: loadFromLocalStorage(),
    loading: false,
    error: null
};

const guideSlice = createSlice({
    name : "guides",
    initialState,
    reducers :{
        addGuide: (state, action: PayloadAction<Guia>) => {
            state.guides.push(action.payload);
        },
        updateGuideStatus: (state, action: PayloadAction<{ numeroGuia: string; nuevoEstado: string }>) => {
            const guide = state.guides.find(g => g.numeroGuia === action.payload.numeroGuia);
            if (guide) {
                const hoy = new Date();
                const fecha = hoy.toISOString().split('T')[0];
                const detalleHistorial = `Cambio a "${action.payload.nuevoEstado}" el ${fecha} a las ${hoy.toLocaleTimeString()}`;

                guide.estatus = action.payload.nuevoEstado;
                guide.fechaUltimaActualizacion = fecha;
                if (!guide.historial) {
                    guide.historial = [];
                }
                guide.historial.push(detalleHistorial);
            }
        }
    },
});

export const { addGuide, updateGuideStatus } = guideSlice.actions;
export default guideSlice.reducer;