import { Collection } from "mongodb";
import { Flight, FlightModel } from "./types.ts";
import { fromModelToFlight } from "./utils.ts";
import { ObjectId } from "mongodb";

export const resolvers = {
    Query: {
        getFlights: async (_:unknown,args: {origen: string | null,destino: string | null},context: {collectionVuelos: Collection<FlightModel>}):Promise<Flight[]> => {
            if(args.origen&& args.destino){
                const vuelosM:FlightModel[] = await context.collectionVuelos.find({origen: args.origen,destino: args.destino}).toArray()
                const vuelos:Flight[] = vuelosM.map((elem) => fromModelToFlight(elem))
                return vuelos
            } else if(args.destino && !args.origen){
                const vuelosM:FlightModel[] = await context.collectionVuelos.find({destino: args.destino}).toArray()
                const vuelos:Flight[] = vuelosM.map((elem) => fromModelToFlight(elem))
                return vuelos
            } else if(!args.destino && args.origen){
                const vuelosM:FlightModel[] = await context.collectionVuelos.find({origen: args.origen}).toArray()
                const vuelos:Flight[] = vuelosM.map((elem) => fromModelToFlight(elem))
                return vuelos
            }
            const vuelosM:FlightModel[] = await context.collectionVuelos.find().toArray()
            const vuelos:Flight[] = vuelosM.map((elem) => fromModelToFlight(elem))
            return vuelos
        },
        getFlight: async (_:unknown,args: {id: string},context: {collectionVuelos: Collection<FlightModel>}):Promise<Flight | null> => {
            if(args.id.length !==24){
                return null
            }
            const vuelosM:FlightModel | null = await context.collectionVuelos.findOne({_id: new ObjectId(args.id)})
            if(!vuelosM){
                return null
            }
            const vuelos:Flight = fromModelToFlight(vuelosM)
            return vuelos
        }
    },
    Mutation: {
        addFlight: async (_:unknown,args: {origen: string,destino: string,fecha_y_hora: string},context: {collectionVuelos: Collection<FlightModel>}):Promise<Flight> => {
            const {insertedId} = await context.collectionVuelos.insertOne({
                origen: args.origen,
                destino: args.destino,
                fecha_y_hora: args.fecha_y_hora
            })
            return {
                id: insertedId.toString(),
                origen: args.origen,
                destino: args.destino,
                fecha_y_hora: args.fecha_y_hora
            }
        }
    }
}