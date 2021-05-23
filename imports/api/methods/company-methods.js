import { Meteor } from "meteor/meteor";
import CompanyCollection from "../../../collections/company";
import Customers from "../../../collections/customers";

const addInfo = async function (data) {
  CompanyCollection.insert({
    ...data,
    userId: this.userId,
  });
};

const addCustomer = async function (data) {
  console.log(data);
  Customers.insert({
    ...data,
    userId: this.userId,
  });
};

Meteor.methods({
  addInfo,
  addCustomer
});
