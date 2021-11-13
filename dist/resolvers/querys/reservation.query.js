"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationQuerys = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const reservate_entity_1 = require("../../entity/reservate.entity");
let ReservationQuerys = class ReservationQuerys {
    async getReservations() {
        const reservations = await (0, typeorm_1.getRepository)(reservate_entity_1.Reservate)
            .createQueryBuilder("reservate")
            .innerJoinAndSelect("reservate.user", "user")
            .innerJoinAndSelect("reservate.place", "place")
            .getMany();
        return reservations;
    }
    async getMyReservations({ req }) {
        const email = req.session.email;
        const reservations = await (0, typeorm_1.getRepository)(reservate_entity_1.Reservate)
            .createQueryBuilder("reservate")
            .innerJoinAndSelect("reservate.user", "user")
            .innerJoinAndSelect("reservate.place", "place")
            .where(`user.email = '${email}' `)
            .getMany();
        return reservations;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [reservate_entity_1.Reservate], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationQuerys.prototype, "getReservations", null);
__decorate([
    (0, type_graphql_1.Query)(() => [reservate_entity_1.Reservate], { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationQuerys.prototype, "getMyReservations", null);
ReservationQuerys = __decorate([
    (0, type_graphql_1.Resolver)()
], ReservationQuerys);
exports.ReservationQuerys = ReservationQuerys;
//# sourceMappingURL=reservation.query.js.map