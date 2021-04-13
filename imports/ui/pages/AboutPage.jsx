import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanySchema } from "../../api/schemas/CompanySchema";

const AboutPage = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(CompanySchema),
  });
  const onSubmit = (data) => {
    console.log(data);
    Meteor.call("addInfo", data, (e, r) => {
      if (e) console.log(e);
    });
  };

  return (
    <div>
      <div class="page-wrapper">
        <div className="container-xl">
          {/* Page title */}
          <div className="page-header d-print-none">
            <div className="row align-items-center">
              <div className="col">
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-4">
                      <div className="row">
                        <div className="col-md-6 col-xl-12">
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                              <label className="form-label">My Company</label>
                              <div className="form-control-plaintext">
                                Start editing
                              </div>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Company Name</label>
                              <input
                                type="text"
                                className="CompanyName"
                                name="CompanyName"
                                placeholder="Input placeholder"
                                ref={register}
                              />
                            </div>
                            <div className="invalid-feedback d-block">
                              {errors.CompanyName?.message}
                            </div>

                            <div className="mb-3">
                              <label className="form-label">
                                tax registration number
                              </label>
                              <input
                                type="text"
                                className="tax"
                                name="tax"
                                placeholder="Input placeholder"
                                ref={register}
                              />
                            </div>
                            <div className="invalid-feedback d-block">
                              {errors.tax?.message}
                            </div>

                            <div className="mb-3">
                              <label className="form-label">Devis</label>
                              <input
                                type="text"
                                className="form-control"
                                name="example-disabled-input"
                                placeholder="TDN"
                                defaultValue="TDN"
                                readOnly
                              />
                            </div>

                            <div className="mb-3">
                              <label className="form-label">Email Adress</label>
                              <div className="form-floating mb-3">
                                <input
                                  type="email"
                                  name="email"
                                  id="floating-input"
                                  defaultValue="name@example.com"
                                  ref={register}
                                />
                              </div>
                              <div className="invalid-feedback d-block">
                                {errors.email?.message}
                              </div>{" "}
                            </div>
                            <div className="mb-3">
                              <label className="form-label">First Name </label>
                              <input
                                type="text"
                                className="firstname"
                                name="firstname"
                                placeholder="First Name"
                                ref={register}
                              />
                            </div>
                            <div className="invalid-feedback d-block">
                              {errors.firstname?.message}
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Last Name</label>
                              <input
                                type="text"
                                className="lastname"
                                name="lastname"
                                placeholder="Last Name"
                                ref={register}
                              />
                            </div>
                            <div className="invalid-feedback d-block">
                              {errors.lastname?.message}
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Location</label>
                              <input
                                type="text"
                                className="Location"
                                name="location"
                                placeholder=""
                                ref={register}
                              />
                            </div>
                            <div className="invalid-feedback d-block">
                              {errors.location?.message}
                            </div>
                            <div className="mb-3">
                              <label className="form-label"> Postal Code</label>
                              <input
                                type="number"
                                className="postalcode"
                                name="postalcode"
                                ref={register}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Country</label>
                              <input
                                type="text"
                                className="country"
                                name="country"
                                placeholder=""
                                ref={register}
                              />
                            </div>
                            <div className="invalid-feedback d-block">
                              {errors.postalcode?.message}
                            </div>

                            <div className="col-6 col-sm-4 col-md-2 col-xl mb-3">
                              <button className="btn btn-dark w-100">
                                Add
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
