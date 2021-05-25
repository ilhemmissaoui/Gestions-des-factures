import React, { useState } from "react";

import { Meteor } from "meteor/meteor";

import { useForm } from "react-hook-form";
import { Notyf } from "notyf";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddCustomerSchema } from "../../../../api/schemas/CustomerSchema";

const Sales = ({ customer, fetch }) => {
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
      {" "}
      <tr>
        <td>active</td>
        <td> {customer._id}</td>
        <td>{customer.fullName}</td>
        <td>{customer.phoneNumber}</td>
        <td>{customer.email}</td>
        <td>{customer.region}</td>
<td>
       <div className="dropdown">
  <div className="dropdown-trigger">
    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3">
      <span> + </span>
      <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true" />
      </span>
    </button>
  </div>
  <div className="dropdown-menu" id="dropdown-menu3" role="menu">
    <div className="dropdown-content">
    <Link to="#" onClick={(_) => onDelete()} className="btn btn-danger">
            Delete
          </Link>
          <Link to="#" onClick={handleShow} className="btn btn-warning">
            Update
          </Link>
     
    </div>
  </div>
</div> </td>

      </tr>
      <div
        className="modal"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit customer </p>
            <button className="delete" aria-label="close" />
          </header>
          <section className="modal-card-body">
            <form onSubmit={handleSubmit(UpdateCustomer)} id="update">
              <label>Name :</label>
              <input
                type="text"
                name="customername"
                ref={register}
                placeholder="Customer Name"
                className="form-control"
              />
              {errors.customername && (
                <p className="alert alert-danger">{errors.fullName.message}</p>
              )}
            </form>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" form="update">
              Save changes
            </button>
            <button className="button">Cancel</button>
          </footer>
        </div>
      </div>
    </>
  );
};
export default Sales;


