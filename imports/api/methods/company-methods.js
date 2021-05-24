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
const getCustomers = function () {
  return Customers.find({ userId: this.userId }).fetch();
};


const getCustomerInfo = async function () {
  return await Customers
    .rawCollection()
    .aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "userId",
          as: "info",
        },
      },
    ])
    .toArray();
};

Meteor.methods({
  addInfo,
  addCustomer,
  getCustomerInfo,
  getCustomers
});
