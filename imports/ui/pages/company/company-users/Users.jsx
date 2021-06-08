import React, { useState } from "react";
import ModalRoot from "../../../components/ModalView";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateCompanyUser } from "../../../../api/schemas/CompanyUsers";
import { toastr } from "react-redux-toastr";

const Users = ({ customer, fetch }) => {

  console.log(customer);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(UpdateCompanyUser),
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const deleteCompanyUser = () => {
    Meteor.call("deleteCompanyUser", customer._id, (e, _) => {
      if (!e) fetch();
    });
  };
  const updateUser = (data) => {
    console.log(data);
    Meteor.call("updateCompanyUser", { id: customer._id, data }, (err) => {
      if (!err) {
        toastr.success("", "User Updated Successfully");
        fetch();
        setShow(false);
      } else {
        toastr.error("unable to update User check the inputs ");
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
      >
        <form onSubmit={handleSubmit(updateUser)} id="customer-update">
          <section className="modal-card-body">
            <label htmlFor="customername" className="label">
              User First Name
            </label>
            <p className="control">
              <input
                defaulValue={customer.profile?.firstName}
                type="text"
                name="firstName"
                ref={register}
                placeholder="Customer Name"
                className="input"
              />
            </p>{" "}
            {errors.firstName && (
              <p className="alert alert-danger">{errors.firstName.message}</p>
            )}
            <label htmlFor="lastName" className="label">
              User last Name
            </label>
            <p className="control">
              <input
                defaulValue={customer.profile?.lastName}
                type="text"
                name="lastName"
                ref={register}
                placeholder="Customer Name"
                className="input"
              />
            </p>{" "}
            {errors.lastName && (
              <p className="alert alert-danger">{errors.lastName.message}</p>
            )}
            <label htmlFor="email" className="label">
              User Email
            </label>
            <p className="control">
              <input
                defaulValue={customer?.emails[0]?.address}
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
              User Phone
            </label>
            <p className="control">
              <input
                defaulValue="Customer default"
                type="text"
                name="phoneNumber"
                ref={register}
                placeholder="User phone number"
                className="input"
              />
            </p>{" "}
            {errors.phoneNumber && (
              <p className="alert alert-danger">{errors.phoneNumber.message}</p>
            )}
          </section>
        </form>
      </ModalRoot>
      <tr>
        <td>active</td>
        <td>{customer._id}</td>
        <td>{customer.profile?.firstName}</td>
        <td>{customer.profile?.phoneNumber ?? "N/A"}</td>
        <td>{Roles.getRolesForUser(customer?._id)[0].replace("_", " ") ?? "--"}</td>
        <td>{customer.emails[0]?.address}</td>
        <td>{moment(customer.creationDate).format("MMM DD YYYY")}</td>
        <td>
          <button className="button is-danger is-inverted" onClick={handleShow}>
            update
        </button>
          <button
            className="button is-danger is-inverted"
            onClick={deleteCompanyUser}
          >
            delete
        </button>
        </td>
      </tr>
    </>
  );
};
export default Users;
