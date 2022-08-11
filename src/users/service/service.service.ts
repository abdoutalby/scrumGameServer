import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "../utils/user.dto";
import { User } from "../utils/user.interface";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly User: Model<User>) {}

  async getAll() {
    return await this.User.find();
  }

  async create(user: UserDto) {
    return await this.User.create(user);
  }

  async findById(id: string) {
    return await this.User.findById(id);
  }

  async findByUsername(username: string) {
    return await this.User.findOne({ username: username });
  }
}
