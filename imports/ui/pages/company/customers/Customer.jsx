import React, { useState } from "react";
import { Link } from "react-router-dom";
const Customer = ({ customer, fetch }) => {
  console.log(customer);
  const deleteCustomer = () => {
    Meteor.call("deleteCustomer", customer._id, (e, r) => {
      if (!e) fetch();
    });
  };
  const UpdateCustomer = (data) => {
    Meteor.call("updateCustomer", { id: customer._id, data }, (err) => {
      if (!err) {
        fetch();
        setShow(false);
      } else {
        notyf.error({
          message: "unable to update Customer check this inputs ",
        });
      }
    });
  };

  return (
    <>
      {" "}
      <tr>
        <td>active</td>
        <td> {customer._id}</td>
        <td>{customer.fullName}</td>
        <td>{customer.phoneNumber}</td>
        <td>gggggg</td>
        <td>gggggg</td>

        <button className="button is-danger is-inverted" onClick={UpdateCustomer}>
          update
        </button>
        <button className="button is-danger is-inverted" onClick={deleteCustomer}>
          delete
        </button>
      </tr>
    </>
  );
};
export default Customer;
