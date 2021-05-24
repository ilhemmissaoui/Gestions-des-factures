import { Meteor } from "meteor/meteor";
import CompanyCollection from "../../../collections/company";
import Customers from "../../../collections/customers";

const addInfo = async function (data) {
  CompanyCollection.insert({
    ...data,
    userId: this.userId,
  });
};

const addCustomer = function (data) {
  console.log(data);
  Customers.insert({
    ...data,
    userId: this.userId,
    creationDate: new Date(),
  });
};
const getCustomers = function ({
  page,
  itemsPerPage,
  search,
  sortBy = "_id",
  sortOrder = "asc",
}) {
  const query = { userId: this.userId };
  const options = {
    skip: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    sort: {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    },
  };
  const totalCount = Customers.find({ userId: this.userId }).count();
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  // IF SEARCH IS DEFINED && SEARCH LENGTH != 0 THEN WE ADD SEARCH STEP TO QUERY OBJECT
  if (search && search.length) {
    query.$or = [
      {
        fullName: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
      {
        country: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
    ];
  }
  return { items: Customers.find(query, options).fetch(), totalCount };
};
//*******updateProduct in the db*********

const getCustomerInfo = async function () {
  return await Customers.rawCollection()
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
  getCustomers,
});
