import {Arg, Int, Query, Resolver} from "type-graphql";
import {getRepository} from "typeorm";
import {Parking} from "../../entity/parking.entity";
import {Have} from "../../entity/have.entity";

@Resolver()
export class ParkingQuerys {
  @Query(() => [Parking], {nullable: true})
  async getParkings() {
    return await getRepository(Parking)
      .createQueryBuilder("parking")
      .innerJoinAndSelect("parking.place", "place")
      .innerJoinAndSelect("parking.have", "have")
      .getMany();
  }

  @Query(() => [Have], {nullable: true})
  async getParkings2(@Arg("parking_id", () => Int) parking_id: number) {
    return await getRepository(Have)
      .createQueryBuilder("have")
      .innerJoinAndSelect("have.parking", "parking")
      .where(`parking.parking_id = ${parking_id}`)
      .getMany();
  }
}