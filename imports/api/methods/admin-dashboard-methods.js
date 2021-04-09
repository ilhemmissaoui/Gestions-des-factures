import { Meteor } from "meteor/meteor";

const getClients = function () {
  return Meteor.users.find({ _id: { $ne: this.userId } }).fetch();
};

Meteor.methods({
  getClients,
});
