import { Meteor } from "meteor/meteor";
import CompanyCollection from "../../../collections/company";

const getClients = function () {
  return Meteor.users.find({ _id: { $ne: this.userId } }).fetch();
};
const getInfo = function () {
  console.log(CompanyCollection.find({ userId: this.userId }).fetch());
  return CompanyCollection.find({ userId: this.userId }).fetch();
};
const addInfo = async function (data) {
  console.log(data);
  CompanyCollection.insert({
    ...data,
    userId: this.userId,
  });
};
const getUserInfo = async function () {
  return await Meteor.users
    .rawCollection()
    .aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "_id",
          foreignField: "userId",
          as: "info",
        },
      },
    ])
    .toArray();
};
Meteor.methods({
  getClients,
  addInfo,
  getInfo,
  getUserInfo,
});
