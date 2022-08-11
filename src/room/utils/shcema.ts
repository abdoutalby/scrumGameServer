import * as mongoose from "mongoose";

export const RoomSchema = new mongoose.Schema({
  owner: String,
  players: [{
    username: String,
    password: String,
    joined : Boolean,
  }],
  nbStage: Number,
  title: String,
  duration: Number,
});
