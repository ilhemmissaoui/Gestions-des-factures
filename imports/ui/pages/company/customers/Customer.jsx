import React, { useState } from "react";
import ModalRoot from "../../../components/ModalView";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Notyf } from "notyf";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddCustomerSchema } from "../../../../api/schemas/CustomerSchema";
import { toastr } from "react-redux-toastr";

const Customer = ({ customer, fetch }) => {
  const { register, handleSubmit, errors } = useForm({
    // resolver: yupResolver(AddCustomerSchema),
    // defaultValues: {
    //   customername: customer.fullName,
    //   customerphone: customer.phoneNumber,
    //   customeremail: customer.email,
    //   customerregion: customer.region,
    //   customersocialreason: customer.socialReason,
    //   customerpostalcode: customer.postalCode,
    // },
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
    console.log(data);
    Meteor.call("updateCustomer", { id: customer._id, data }, (err) => {
      if (!err) {
        toastr.success("", "Customer Updated Successfully");
        fetch();
        setShow(false);
      } else {
        toastr.error("unable to update Customer check this inputs ");
        setShow(false);
      }
    });
  };

  return (
    <>
      <ModalRoot
        title="Modify Customer"
        refuse={handleClose}
        formId="customer-update"
        isActive={show}
        form={UpdateCustomer}
      >
        <form onSubmit={handleSubmit(UpdateCustomer)} id="customer-update">
          <section className="modal-card-body">
            <label htmlFor="customername" className="label">
              Name
            </label>
            <p className="control">
              <input
                type="text"
                name="customername"
                ref={register}
                placeholder="Customer Name"
                className="input"
              />
            </p>{" "}
            {errors.fullName && (
              <p className="alert alert-danger">{errors.fullName.message}</p>
            )}
            <label htmlFor="customername" className="label">
              Name
            </label>
            <p className="control">
              <input
                type="text"
                name="productdescription"
                ref={register}
                placeholder="Customer Name"
                className="input"
              />
            </p>{" "}
            {errors.productdescription && (
              <p className="alert alert-danger">
                {errors.productdescription.message}
              </p>
            )}
            <label htmlFor="customerphone" className="label">
              Name
            </label>
            <p className="control">
              <input
                type="text"
                name="customerphone"
                ref={register}
                placeholder="Customer Name"
                className="input"
              />
            </p>{" "}
            {errors.productdescription && (
              <p className="alert alert-danger">
                {errors.productdescription.message}
              </p>
            )}
            <label htmlFor="customername" className="label">
              Name
            </label>
            <p className="control">
              <input
                type="text"
                name="productdescription"
                ref={register}
                placeholder="Customer Name"
                className="input"
              />
            </p>{" "}
            {errors.productdescription && (
              <p className="alert alert-danger">
                {errors.productdescription.message}
              </p>
            )}
            <label htmlFor="customername" className="label">
              Name
            </label>
            <p className="control">
              <input
                type="text"
                name="productdescription"
                ref={register}
                placeholder="Customer Name"
                className="input"
              />
            </p>{" "}
            {errors.productdescription && (
              <p className="alert alert-danger">
                {errors.productdescription.message}
              </p>
            )}
            <label htmlFor="customername" className="label">
              Name
            </label>
            <p className="control">
              <input
                type="text"
                name="productdescription"
                ref={register}
                placeholder="Customer Name"
                className="input"
              />
            </p>{" "}
            {errors.productdescription && (
              <p className="alert alert-danger">
                {errors.productdescription.message}
              </p>
            )}
          </section>
        </form>
      </ModalRoot>
      <tr>
        <td>active</td>
        <td> {customer._id}</td>
        <td>{customer.fullName}</td>
        <td>{customer.phoneNumber}</td>
        <td>{customer.email}</td>
        <td>{moment(customer.creationDate).format("MMM DD YYYY")}</td>

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
