import { Meteor } from "meteor/meteor";
import CompanyCollection from "../../../collections/company";

const getClients = function () {
  return Meteor.users.find({ _id: { $ne: this.userId } }).fetch();
};

const getInfo = function () {
  return CompanyCollection.find({ userId: this.userId }).fetch();
};
const addInfo = async function (data) {
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
const deleteClient = (id) => {
  Meteor.users.remove(id);
};

const updateClient = async function (id, data) {
  console.log(id);
  // const client = Meteor.users.findOne(id);
  console.log(data);
  Meteor.users.update(id, {
    $set: {
      "profile.firstName": data,
    },
  });
};
Meteor.methods({
  getClients,
  addInfo,
  getInfo,
  getUserInfo,
  deleteClient,
  updateClient,
});
