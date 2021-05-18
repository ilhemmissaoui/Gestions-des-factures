import { Meteor } from "meteor/meteor";
import CompanyCollection from "../../../collections/company";

const addInfo = async function (data) {
  CompanyCollection.insert({
    ...data,
    userId: this.userId,
  });
};

Meteor.methods({
  addInfo,
});
