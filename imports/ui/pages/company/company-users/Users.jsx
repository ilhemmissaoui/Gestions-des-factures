import React, { useState } from "react";
import ModalRoot from "../../../components/ModalView";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateCompanyUser } from "../../../../api/schemas/CompanyUsers";
import { toastr } from "react-redux-toastr";

const Users = ({ customer, fetch }) => {
  
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(UpdateCompanyUser),
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const deleteCustomer = () => {
    Meteor.call("deleteCustomer", customer._id, (e, _) => {
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
              Customer Name
            </label>
            <p className="control">
              <input
                defaultvalue={customer.fullName}
                type="text"
                name="fullName"
                ref={register}
                placeholder="Customer Name"
                className="input"
              />
            </p>{" "}
            {errors.fullName && (
              <p className="alert alert-danger">{errors.fullName.message}</p>
            )}
            <label htmlFor="customeremail" className="label">
              Customer Email
            </label>
            <p className="control">
              <input
                defaultvalue={customer.email}
                type="text"
                name="email"
                ref={register}
                placeholder="User Email"
                className="input"
              />
            </p>{" "}
            {errors.email && (
              <p className="alert alert-danger">{errors.email.message}</p>
            )}
            <label htmlFor="phoneNumber" className="label">
              Customer Phone
            </label>
            <p className="control">
              <input
                defaultvalue={customer.phoneNumber}
                type="text"
                name="phoneNumber"
                ref={register}
                placeholder="Customer Name"
                className="input"
              />
            </p>{" "}
            {errors.phoneNumber && (
              <p className="alert alert-danger">{errors.phoneNumber.message}</p>
            )}
            <label htmlFor="customerregion" className="label">
              Customer Region
            </label>
            <p className="control">
              <input
                defaultvalue={customer.region}
                type="text"
                name="region"
                ref={register}
                placeholder="Customer Region"
                className="input"
              />
            </p>{" "}
            {errors.region && (
              <p className="alert alert-danger">{errors.region.message}</p>
            )}
          </section>
        </form>
      </ModalRoot>
      <tr>
        <td>active</td>
        <td>{customer._id}</td>
        <td>{customer.profile?.firstName}</td>
        <td>{customer.profile?.phoneNumber ?? "N/A"}</td>
        <td>{Roles.getRolesForUser(customer?._id)[0] ?? "--"}</td>
        <td>{moment(customer.creationDate).format("MMM DD YYYY")}</td>
        <td>
          <button className="button is-danger is-inverted" onClick={handleShow}>
            update
        </button>
          <button
            className="button is-danger is-inverted"
            onClick={deleteCustomer}
          >
            delete
        </button>
        </td>
      </tr>
    </>
  );
};
export default Users;
