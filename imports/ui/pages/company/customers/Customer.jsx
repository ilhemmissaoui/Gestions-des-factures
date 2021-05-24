import React, { useState } from "react";

const Customer = ({ customer }) => {
  console.log(customer);
  const deleteCustomer = () => {
    Meteor.call("deleteCustomer", customer._id, fetch.bind());
  };
  const UpdateCustomer = (data) => {
    Meteor.call("updateCustomer", { id: customer._id, data }, (err) => {
      if (!err) {
        fetch();
        setShow(false);
      } else {
        notyf.error({ message: "unable to update Customer check this inputs " });
      }
    });
  };

  return (
    <> <tr>
      <td>active</td>
      <td> {customer._id}</td>
      <td>{customer.fullName}</td>
      <td>{customer.phoneNumber}</td>
      <td>gggggg</td>
      <td>gggggg</td>
      
      <button class="button is-danger is-inverted" onClick={UpdateCustomer}>update</button>
      <button class="button is-danger is-inverted" onClick={deleteCustomer}>delete</button></tr>
    </>
  );
};
export default Customer;
