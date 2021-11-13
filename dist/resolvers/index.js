"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shcemaIndex = void 0;
const type_graphql_1 = require("type-graphql");
const parking_mutation_1 = require("./mutations/parking.mutation");
const user_mutation_1 = require("./mutations/user.mutation");
const hello_1 = require("./querys/hello");
const parking_query_1 = require("./querys/parking.query");
const place_query_1 = require("./querys/place.query");
const user_query_1 = require("./querys/user.query");
const resolvers = [
    hello_1.HelloResolver,
    user_query_1.UserQuery,
    place_query_1.PlaceQuerys,
    parking_query_1.ParkingQuerys,
    user_mutation_1.UserMutation,
    parking_mutation_1.ParkingMutation,
];
exports.shcemaIndex = (0, type_graphql_1.buildSchema)({
    resolvers: resolvers,
    validate: true,
});
//# sourceMappingURL=index.js.map