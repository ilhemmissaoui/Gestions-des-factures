import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ProductSchema } from "../../../../api/schemas/ProductSchema";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { toastr } from "react-redux-toastr";
const AddProduct = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const handleClose = () => setIsOpened(false);
  const handleShow = () => setIsOpened(true);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ProductSchema),
  });
  const onSubmit = (data) => {
    console.log(data);
    Meteor.call("addProduct", data, (e, _) => {
      if (e) {
        console.log("+++++ERROR+++++");
        console.log(e);
      } else {
        toastr.success("", "Product has Been Added");
        props.history.push("/company/product_service");
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
                          <p>Product And Service</p>
                        </h1>
                        <section class="section">
                          <h1 class="subtitle">Informations</h1>
                          <div className="card pb-5">
                            <div className="card-content">
                              <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="columns is-desktop">
                                  <div className="column is-one-fifth">
                                    <div className="field">
                                      <div className="column">
                                        <div className="field">
                                          <label className="label">
                                            Product Type
                                          </label>
                                          <div className="control">
                                            <label className="radio">
                                              <input
                                                ref={register}
                                                type="radio"
                                                name="answer"
                                              />
                                              Material
                                            </label>
                                            <label className="radio">
                                              <input
                                                ref={register}
                                                type="radio"
                                                name="answer"
                                              />
                                              Service
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">Product</label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="name"
                                          type="text"
                                          placeholder="Product"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.name?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">Barcode</label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="barcode"
                                          type="text"
                                          placeholder="Barcode"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.barcode?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">Category</label>{" "}
                                    </div>
                                    <div className="control">
                                      <div className="select">
                                        <select name="type" ref={register}>
                                          <option value="">-- Select --</option>
                                          <option value="Mr">ccc</option>
                                          <option value="Mrs">hngg</option>
                                        </select>
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.category?.message}
                                      </div>
                                    </div>
                                  </div>{" "}
                                </div>
                                {/* -------------------------------------------- */}
                                <div className="separator mx-5 my-2"></div>
                                {/* -------------------------------------------- */}
                                <div className="columns is-desktop mt-0">
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">
                                        Internal Reference
                                      </label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="internalReference"
                                          type="text"
                                          placeholder="Internal Reference "
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.internalreference?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">
                                        manufactrurer Reference
                                      </label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="manufacturerreference"
                                          type="text"
                                          placeholder="Manufacturer Reference"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.manufacturerreference?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">BRAND</label>{" "}
                                    </div>
                                    <div className="control">
                                      <div className="select">
                                        <select name="type" ref={register}>
                                          <option value="">-- Select --</option>
                                          <option value="ff">ccc</option>
                                          <option value="gg">hngg</option>
                                        </select>
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.brand?.message}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* -------------------------------------------- */}
                                <div className="separator mx-5 my-2"></div>
                                {/* -------------------------------------------- */}
                                <div className="columns is-desktop mt-0">
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">
                                        Description
                                      </label>
                                      <textarea
                                        className="textarea"
                                        placeholder="Description"
                                        defaultValue={""}
                                      />

                                      <div className="help is-danger d-block">
                                        {errors.country?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">
                                        Upload your product picture
                                      </label>

                                      <div className="file is-boxed">
                                        <label className="file-label">
                                          <input
                                            className="file-input"
                                            type="file"
                                            name="resume"
                                          />
                                          <span className="file-cta">
                                            <span className="file-icon">
                                              <i className="fas fa-upload" />
                                            </span>
                                            <span className="file-label">
                                              Choose a file…
                                            </span>
                                          </span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* -------------------------------------------- */}
                                <div className="separator mx-5 my-2"></div>
                                {/* -------------------------------------------- */}

                                <h1 class="subtitle">Sales Prices</h1>

                                <div className="columns is-desktop">
                                  <div className="column is-one-fifth">
                                    <div className="field">
                                      <div className="column">
                                        <div className="field">
                                          <label className="label">
                                            Product Type
                                          </label>
                                          <div className="control">
                                            <label className="radio">
                                              <input
                                                ref={register}
                                                type="radio"
                                                name="answer"
                                              />
                                              Material
                                            </label>
                                            <label className="radio">
                                              <input
                                                ref={register}
                                                type="radio"
                                                name="answer"
                                              />
                                              Service
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>{" "}
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">Product</label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="name"
                                          type="text"
                                          placeholder="Product"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.name?.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="column">
                                    <div className="field">
                                      <label className="label">Product</label>
                                      <div className="control">
                                        <input
                                          ref={register}
                                          className="input"
                                          name="name"
                                          type="text"
                                          placeholder="Product"
                                        />
                                      </div>
                                      <div className="help is-danger d-block">
                                        {errors.name?.message}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="column">
                                  <div className="field">
                                    <label className="label">BRAND</label>{" "}
                                  </div>
                                  <div className="control">
                                    <div className="select">
                                      <select name="type" ref={register}>
                                        <option value="">-- Select --</option>
                                        <option value="ff">ccc</option>
                                        <option value="gg">hngg</option>
                                      </select>
                                    </div>
                                    <div className="help is-danger d-block">
                                      {errors.brand?.message}
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
    </>
  );
};

export default AddProduct;
