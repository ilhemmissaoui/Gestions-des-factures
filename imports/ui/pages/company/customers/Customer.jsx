import React, { useState } from "react";
import ModalRoot from "../../../components/ModalView";
import { Meteor } from "meteor/meteor";

import { useForm } from "react-hook-form";
import { Notyf } from "notyf";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddCustomerSchema } from "../../../../api/schemas/CustomerSchema";

const Customer = ({ customer, fetch }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(AddCustomerSchema),
    defaultValues: {
      customername: customer.fullName,
      customerphone: customer.phoneNumber,
      customeremail: customer.email,
      customerregion: customer.region,
      customersocialreason: customer.socialReason,
      customerpostalcode: customer.postalCode,
    },
  });
  const [update, setUpdate] = useState(customer);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: "center",
      y: "top",
    },
  });

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
      <ModalRoot
        title="Modify Customer"
        refuse={handleClose}
        confirm={UpdateCustomer}
        isActive={show}
      >
        <div>Hello</div>
      </ModalRoot>
      <tr>
        <td>active</td>
        <td> {customer._id}</td>
        <td>{customer.fullName}</td>
        <td>{customer.phoneNumber}</td>
        <td>{customer.email}</td>
        <td>{customer.region}</td>

        <button className="button is-danger is-inverted" onClick={handleShow}>
          update
        </button>
        <button
          className="button is-danger is-inverted"
          onClick={deleteCustomer}
        >
          delete
        </button>
      </tr>
    </>
  );
};
export default Customer;
