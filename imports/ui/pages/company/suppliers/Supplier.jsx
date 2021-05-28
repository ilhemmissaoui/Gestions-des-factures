import React, { useState } from "react";
import ModalRoot from "../../../components/ModalView";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { useForm } from "react-hook-form";
import { Notyf } from "notyf";
import { yupResolver } from "@hookform/resolvers/yup";
import { SupplierSchema } from "../../../../api/schemas/SupplierSchema";
import { toastr } from "react-redux-toastr";

const Supplier = ({ supplier, fetch }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SupplierSchema),
  });
  const [update, setUpdate] = useState(supplier);
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

  const deleteSupplier = () => {
    Meteor.call("deleteSupplier", supplier._id, (e, r) => {
      if (!e) fetch();
    });
  };
  const updateSupplier = (data) => {
    console.log(data);
    Meteor.call("updateSupplier", { id: supplier._id, data }, (err) => {
      if (!err) {
        toastr.success("", "Supplier Updated Successfully");
        fetch();
        setShow(false);
      } else {
        toastr.error("unable to update Supplier check this inputs ");
        setShow(false);
      }
    });
  };

  return (
    <>
      <ModalRoot
        title="Modify Supplier"
        refuse={handleClose}
        formId="supplier-update"
        isActive={show}
        form={updateSupplier}
      >
        <form onSubmit={handleSubmit(updateSupplier)} id="supplier-update">
          <section className="modal-card-body">
            <label htmlFor="suppliername" className="label">
              Supplier Name
            </label>
            <p className="control">
              <input
                defaultvalue={supplier.fullName}
                type="text"
                name="fullName"
                ref={register}
                placeholder="Supplier Name"
                className="input"
              />
            </p>{" "}
            {errors.fullName && (
              <p className="alert alert-danger">{errors.fullName.message}</p>
            )}
            <label htmlFor="supplieremail" className="label">
              Supplier Email
            </label>
            <p className="control">
              <input
                defaultvalue={supplier.email}
                type="text"
                name="email"
                ref={register}
                placeholder="Supplier Email"
                className="input"
              />
            </p>{" "}
            {errors.email && (
              <p className="alert alert-danger">{errors.email.message}</p>
            )}
            <label htmlFor="phoneNumber" className="label">
              Supplier Phone
            </label>
            <p className="control">
              <input
                defaultvalue={supplier.phoneNumber}
                type="text"
                name="phoneNumber"
                ref={register}
                placeholder="Supplier phone"
                className="input"
              />
            </p>{" "}
            {errors.phoneNumber && (
              <p className="alert alert-danger">{errors.phoneNumber.message}</p>
            )}
            <label htmlFor="supplierregion" className="label">
              Supplier Region
            </label>
            <p className="control">
              <input
                defaultvalue={supplier.region}
                type="text"
                name="region"
                ref={register}
                placeholder="Supplier Region"
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
        <td> {supplier._id}</td>
        <td>{supplier.fullName}</td>
        <td>{supplier.phoneNumber}</td>
        <td>{supplier.email}</td>
        <td>{moment(supplier.creationDate).format("MMM DD YYYY")}</td>

        <button className="button is-danger is-inverted" onClick={handleShow}>
          update
        </button>
        <button
          className="button is-danger is-inverted"
          onClick={deleteSupplier}
        >
          delete
        </button>
      </tr>
    </>
  );
};
export default Supplier;
