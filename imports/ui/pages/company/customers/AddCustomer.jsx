import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AddCustomerSchema } from "../../../../api/schemas/CustomerSchema";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { toastr } from "react-redux-toastr";
const AddCustomer = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const handleClose = () => setIsOpened(false);
  const handleShow = () => setIsOpened(true);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(AddCustomerSchema),
  });
  const onSubmit = (data) => {
    console.log(data);
    Meteor.call("addCustomer", data, (e, _) => {
      if (e) {
        console.log("+++++ERROR+++++");
        console.log(e);
      } else {
        toastr.success("", "Customer has Been Added");
        props.history.push("/company/customers");
      }
    });
  };

  return (
    <>
      <div>
        <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
          <div className="p-1">
            <div className="columns is-variable is-desktop">
              <div className="column">
                <div className="hero-body">
                  <div className="container">
                    <div className="bd-hero-body">
                      <div className="bd-hero-heading">
                        <h1 className="title algolia-lvl0">
                          <p>Add Customer</p>
                        </h1>
                        <section class="section">
                          <h1 class="subtitle">Informations</h1>
                          <div className="card pb-5">
                            <div className="card-content">
                              <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="columns is-desktop">
                                  <div className="column is-one-fifth">
                                    <div className="field">
                                      <label className="label">Civility</label>
                                      <div className="control">
                                        <div className="select">
                                          <select
                                            name="civility"
                                            ref={register}
                                          >
                                            <option value="">
                                              -- Select --
                                            </option>
                                            <option value="Mr">Mr</option>
                                            <option value="Mrs">Mrs</option>
                                          </select>
                                        </div>
                                        <div className="help is-danger d-block">
                                          {errors.civility?.message}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">
                                        Last & First Name
                                      </label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="fullName"
                                          type="text"
                                          placeholder="Last & First Name"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.fullName?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">Email</label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="email"
                                          type="email"
                                          placeholder="Email"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.email?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">
                                        Unique identifier
                                      </label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          type="text"
                                          name="uid"
                                          placeholder="Unique identifier"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.uid?.message}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* -------------------------------------------- */}
                                <div className="separator mx-5 my-2">
                                  Contact
                                </div>
                                {/* -------------------------------------------- */}
                                <div className="columns is-desktop mt-0">
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">
                                        Contact Number
                                      </label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="phoneNumber"
                                          type="text"
                                          placeholder="+21621212121"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.phoneNumber?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">
                                        Social reason
                                      </label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="socialReason"
                                          type="text"
                                          placeholder="+21621212121"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.socialReason?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">Website</label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="website"
                                          type="url"
                                          placeholder="https://exemple.com"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.website?.message}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* -------------------------------------------- */}
                                <div className="separator mx-5 my-2">
                                  Address
                                </div>
                                {/* -------------------------------------------- */}
                                <div className="columns is-desktop mt-0">
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">Country</label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="country"
                                          type="text"
                                          placeholder="Tunisia"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.country?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">Region</label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="region"
                                          type="text"
                                          placeholder="Sousse"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.region?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">
                                        Postal Code
                                      </label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="postalCode"
                                          type="text"
                                          placeholder="4031"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.postalCode?.message}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="columns is-desktop mt-0 mx-2">
                                  <div className="control">
                                    <button
                                      to="#"
                                      type="submit"
                                      className="button is-primary"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal" show={isOpened} onHide={handleClose}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" aria-label="close" />
          </header>
          <section className="modal-card-body">{/* Content ... */}</section>
          <footer className="modal-card-foot">
            <button className="button is-success">Save </button>
            <button className="button">Cancel</button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AddCustomer;