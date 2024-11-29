import { Flight, FlightModel } from "./types.ts";


export function fromModelToFlight(flightOG:FlightModel):Flight {
    return {
        id: flightOG._id!.toString(),
        origen: flightOG.origen,
        destino: flightOG.destino,
        fecha_y_hora: flightOG.fecha_y_hora
    }
}