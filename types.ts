import {ObjectId} from "mongodb"

export type FlightModel = {
    _id?: ObjectId
    origen: string,
    destino: string,
    fecha_y_hora: string
}

export type Flight = {
    id: string,
    origen: string,
    destino: string,
    fecha_y_hora: string
}