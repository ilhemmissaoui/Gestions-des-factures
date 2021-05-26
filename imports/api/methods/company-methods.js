import { Meteor } from "meteor/meteor";
import CompanyCollection from "../../../collections/company";
import Customers from "../../../collections/customers";
import Sales from "../../../collections/sales";
import CustomerSchema from "../schemas/CustomerSchema";
import SaleSchema from "../schemas/SaleSchema";

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

const addSale = function (data) {
  console.log(data);
  Sales.insert({
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
const getSale = function ({
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
  const totalCount = Sales.find({ userId: this.userId }).count();
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
  return { items: Sales.find(query, options).fetch(), totalCount };
};
//*******updateProduct in the db*********
const updateCustomer = async function ({ id, data }) {
  console.log(data);
  // const customer = Customers.findOne({ _id: id, userId: this.userId });
  // if (!customer) {
  //   throw new Meteor.Error("Customer not found");
  // }
  // try {
  //   await AddCustomerSchema.validate(data);
  // } catch (e) {
  //   throw new Meteor.Error(e.message);
  // }
  // Customers.update({ _id: id }, { $set: data });
};

const updateSale = async function ({ id, data }) {
  console.log(data);
  const sale = Sales.findOne({ _id: id, userId: this.userId });
  if (!sale) {
    throw new Meteor.Error("Customer not found");
  }
  try {
    await SaleSchema.validate(data);
  } catch (e) {
    throw new Meteor.Error(e.message);
  }
  Sales.update({ _id: id }, { $set: data });
};

const deleteSale = function (_id) {
  Customers.remove({ _id, userId: this.userId });
};
const deleteCustomer = function (_id) {
  Customers.remove({ _id, userId: this.userId });
};

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
  updateCustomer,
  deleteCustomer,
  addSale,
  updateSale,
  deleteSale,
  getSale,
});
