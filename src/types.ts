/// <reference types="./types.d.ts" />

export interface Guia {
    numeroGuia: string;
    estadoActual:string;
    origen: string;
    destino: string;
    fechaUltimaActualizacion: string;
    nombre: string;
    estatus: string;
    historial?: string[];
}

 export interface ListaGuiasProps {
    guias: Guia[];
}

export interface EstadoGeneralProps {
  guias: Guia[];
}

export interface RegistroProps {
    agregarGuia: (guia: Guia) => void;
}

export interface ListaGuiasProps {
    guias: Guia[];
    actualizarGuia: (numeroGuia: string, nuevoEstado: string) => void;
}