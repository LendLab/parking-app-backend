import {Arg, Ctx, Mutation, Resolver} from "type-graphql";
import argon2 from "argon2";

import {UserResponse} from "../../errors/user.response";
import {User} from "../../entity/user.entity";
import {LoginInput, UserInput} from "../../inputs/user.input";
import {MyContext} from "../../types/MyContext";
import {getRepository} from "typeorm";

@Resolver()
export class UserMutation {
  @Mutation(() => UserResponse, {nullable: true})
  async login(
    @Arg("options", () => LoginInput) options: LoginInput,
    @Ctx() {req}: MyContext
  ): Promise<UserResponse> {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where(`user.email = '${options.email}'`)
      .getOne();

    if (!user) {
      return {
        errors: [
          {
            path: "email",
            message: "Esta email no existe, intentalo de nuevo.",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, options.password);

    if (!valid) {
      return {
        errors: [
          {
            path: "password",
            message: "Contrasñea incorrecta, intentalo de nuevo.",
          },
        ],
      };
    }

    req.session.email = user.email;

    return {user};
  }

  @Mutation(() => Boolean)
  logout(@Ctx() {req, res}: MyContext): Promise<unknown> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => UserResponse, {nullable: true})
  async createUser(
    @Arg("options", () => UserInput) options: UserInput
  ): Promise<UserResponse> {
    const hashedPass = await argon2.hash(options.password);

    const user = await User.create({
      name: options.name,
      email: options.email,
      password: hashedPass,
    }).save();

    return {user};
  }
}
