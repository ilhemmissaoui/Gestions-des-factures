import { Meteor } from "meteor/meteor";
import CompanyCollection from "../../../collections/company";
import Customers from "../../../collections/customers";
import Sales from "../../../collections/sales";
import Products from "../../../collections/product";
import CustomerSchema, {
  UpdateCustomerSchema,
} from "../schemas/CustomerSchema";
import ProductSchema, { UpdateProductSchema } from "../schemas/ProductSchema";
import SaleSchema from "../schemas/SaleSchema";
import {
  SupplierSchema,
  UpdateSupplierrSchema,
} from "../schemas/SupplierSchema";
import Suppliers from "../../../collections/Supplier";
import customers from "../../../collections/customers";
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

const addCustomerFromExcel = function ({ data }) {
  console.log(data);
  Customers.insert({
    ...data,
    userId: this.userId,
    creationDate: new Date(),
  });
};

const addSupplier = function (data) {
  console.log(data);
  Suppliers.insert({
    ...data,
    userId: this.userId,
    creationDate: new Date(),
  });
};

const getProductsName = function () {
  return Products.find({ userId: this.userId }).fetch();
};
const getMiniCustomers = function () {
  return customers.find({ userId: this.userId }).fetch();
};

const updateSaleStatus = function (_id, status) {
  Sales.update(
    { _id: _id },
    {
      $set: {
        status: status,
      },
    }
  );
};
const updateDeliverySaleStatus = function (_id, status) {
  Sales.update(
    { _id: _id },
    {
      $set: {
        deliverStatus: status,
      },
    }
  );
};

const addSale = function (data) {
  console.log(data);
  Sales.insert({
    ...data,
    status: "Idle",
    deliverStatus: "Idle",
    invoiceStatus: "idle",
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

const getSuppliers = function ({
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
  const totalCount = Suppliers.find({ userId: this.userId }).count();
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
  return { items: Suppliers.find(query, options).fetch(), totalCount };
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
const addProduct = function (data) {
  Products.insert({
    ...data,
    userId: this.userId,
    creationDate: new Date(),
  });
};

const getProducts = function ({
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
        manufacturerreference: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
    ];
  }
  var data = { items: Products.find(query, options).fetch(), totalCount };
  console.log(data);
  return { items: Products.find(query, options).fetch(), totalCount };
};

const updateProduct = async function ({ id, data }) {
  console.log(data);
  const product = Products.findOne({ _id: id, userId: this.userId });
  if (!product) {
    throw new Meteor.Error("Product not found");
  }
  try {
    await UpdateProductSchema.validate(data);
  } catch (e) {
    throw new Meteor.Error(e.message);
  }
  Products.update({ _id: id }, { $set: data });
};

const deleteProduct = function (_id) {
  Products.remove({ _id, userId: this.userId });
};
//*******updateProduct in the db*********
const updateCustomer = async function ({ id, data }) {
  console.log(data);
  const customer = Customers.findOne({ _id: id, userId: this.userId });
  if (!customer) {
    throw new Meteor.Error("Customer not found");
  }
  try {
    await UpdateCustomerSchema.validate(data);
  } catch (e) {
    throw new Meteor.Error(e.message);
  }
  Customers.update({ _id: id }, { $set: data });
};

const updateSupplier = async function ({ id, data }) {
  console.log(data);
  const supplier = Suppliers.findOne({ _id: id, userId: this.userId });
  if (!supplier) {
    throw new Meteor.Error("Customer not found");
  }
  try {
    await UpdateSupplierrSchema.validate(data);
  } catch (e) {
    throw new Meteor.Error(e.message);
  }
  Suppliers.update({ _id: id }, { $set: data });
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

const deleteSupplier = function (_id) {
  Suppliers.remove({ _id, userId: this.userId });
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

const addProdutsFromExcel = function ({ data }) {
  Products.insert({
    ...data,
    creationDate: new Date(),
    userId: this.userId
  })
}

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
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  addSupplier,
  getSuppliers,
  deleteSupplier,
  updateSupplier,
  getProductsName,
  getMiniCustomers,
  updateSaleStatus,
  updateDeliverySaleStatus,
  addProdutsFromExcel,
  addCustomerFromExcel
});
