import React, { useState } from "react";

const Customer = ({ customer }) => {
  console.log(customer);
  return (
    <> <tr>
      <td>active</td>
      <td> {customer._id}</td>
      <td>{customer.fullName}</td>
      <td>{customer.phoneNumber}</td>
      <td>gggggg</td>
      <td>gggggg</td>
      
      <button class="button is-danger is-inverted">update</button>
      <button class="button is-danger is-inverted">delete</button></tr>
    </>
  );
};
export default Customer;
