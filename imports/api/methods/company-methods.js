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
import Images from "../../../collections/images";
const addInfo = async function (data) {
  CompanyCollection.insert({
    ...data,
    userId: this.userId,
  });
};

const addCustomer = function (data) {
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Customers.insert({
    ...data,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
    creationDate: new Date(),
  });
};
const addSupplier = function (data) {
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Suppliers.insert({
    ...data,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
    creationDate: new Date(),
  });
};


const addCompanyUser = function (data) {
  console.log(data);
  const info = {
    email: data.email,
    password: data.password,
    profile: {
      firstName: data.firstName,
      lastName: data.lastName,
      companyId: this.userId,
      phoneNumber: data.phoneNumber
    },
  };
  const _id = Accounts.createUser(info);
  Roles.addUsersToRoles(_id, data.role);
  return _id;
};

const deleteCompanyUser = function (id) {
  Meteor.users.remove({ "_id": id });
};

const updateCompanyUser = function ({ id, data }) {
  console.log(id);
  console.log(data);
  Meteor.users.update(id, {
    $set: {
      'emails.0.address': data.email,
      'profile.firstName': data.firstName,
      'profile.lastName': data.lastName,
      'profile.phoneNumber': data.phoneNumber,
    }
  });
};

const addCustomerFromExcel = function ({ data }) {
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Customers.insert({
    ...data,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
    creationDate: new Date(),
  });
};

const addSpplierFromExcel = function ({ data }) {
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Suppliers.insert({
    ...data,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
    creationDate: new Date(),
  });
};



const getProductsName = function () {
  return Products.find({ userId: this.userId }).fetch();
};
const getMiniCustomers = function () {
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  return customers.find({ userId: isNotCompany ? me.profile?.companyId : this.userId, }).fetch();
};
const getMiniSuppliers = function () {
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  return suppliers.find({ userId: isNotCompany ? me.profile?.companyId : this.userId, }).fetch();
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
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Sales.insert({
    ...data,
    status: "Idle",
    deliverStatus: "Idle",
    invoiceStatus: "idle",
    userId: isNotCompany ? me.profile?.companyId : this.userId,
    creationDate: new Date(),
  });
};

const getEstimateInfo = function (id) {
  return Sales.findOne({ "_id": id });
}

const getCustomers = function ({
  page,
  itemsPerPage,
  search,
  sortBy = "_id",
  sortOrder = "asc",
}) {

  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,

  console.log(isNotCompany);
  const query = { userId: !isNotCompany ? me.profile?.companyId : this.userId, };
  const options = {
    skip: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    sort: {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    },
  };
  const totalCount = Customers.find({ userId: this.userId }).count();
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

const getCompanyUsers = function ({
  page,
  itemsPerPage,
  search,
  sortBy = "_id",
  sortOrder = "asc",
}) {
  const query = { "profile.companyId": this.userId };
  const options = {
    skip: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    sort: {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    },
  };
  const totalCount = Meteor.users.find({ "profile.companyId": this.userId }).count();
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
  return { items: Meteor.users.find(query, options).fetch(), totalCount };
};

const getSuppliers = function ({
  page,
  itemsPerPage,
  search,
  sortBy = "_id",
  sortOrder = "asc",
}) {

  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });

  console.log(isNotCompany);
  const query = { userId: !isNotCompany ? this.userId : me.profile?.companyId };
  const options = {
    skip: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    sort: {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    },
  };
  const totalCount = Suppliers.find({ userId: this.userId }).count();
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
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  const query = { userId: isNotCompany ? me.profile?.companyId : this.userId };
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
const addProduct = function (data, imageId) {
  let url;
  if (imageId) {
    url = Images.findOne({ _id: imageId }).link();
  }
  console.log(url)
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Products.insert({
    ...data,
    imageUrl: url ?? null,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
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
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  const query = { userId: isNotCompany ? me.profile?.companyId : this.userId, };
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
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Products.remove({ _id, userId: isNotCompany ? me.profile?.companyId : this.userId });
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
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Customers.remove({ _id, userId: isNotCompany ? me.profile?.companyId : this.userId, });
};
const deleteCustomer = function (_id) {
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Customers.remove({ _id, userId: isNotCompany ? me.profile?.companyId : this.userId, });
};

const deleteSupplier = function (_id) {
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Suppliers.remove({ _id, userId: isNotCompany ? me.profile?.companyId : this.userId, });
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
  const isNotCompany = (Roles.getRolesForUser(this.userId)[0])?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ "_id": this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Products.insert({
    ...data,
    creationDate: new Date(),
    userId: isNotCompany ? me.profile?.companyId : this.userId,
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
  addCustomerFromExcel,
  getCompanyUsers,
  addCompanyUser,
  deleteCompanyUser,
  addSpplierFromExcel,
  getMiniSuppliers,
  updateCompanyUser,
  getEstimateInfo
});
