export const squema = `#graphql
    type vuelo {
        id: String!,
        origen: String!,
        destino: String!,
        fecha_y_hora: String!
    }

    type Query {
        getFlights(origen: String,destino: String): [vuelo!]!
        getFlight(id: ID!): vuelo
    }

    type Mutation {
        addFlight(origen: String!,destino: String!,fecha_y_hora: String!): vuelo
    }
`