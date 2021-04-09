import React, { useState } from "react";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "../../../api/schemas/SignUpSchema";

const SingUp = (props) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignUpSchema),
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  console.log(errors);

  const onSubmit = (data) => {
    Meteor.call(
      "userRegister",
      data,
      (error) => {
        if (error) {
          console.log(`%c ${error}`, "color: gold; background: #252525");
          setError(error.reason);
        } else {
          console.log(props);
          props.history.push("/login");
          //redirect him to the path you want
        }
      }
    );
  };

  return (
    <div className="flex-fill d-flex flex-column justify-content-center py-4">
      <div className="container-tight py-6">
        <form
          className="card card-md"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Signup</h2>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success" role="alert">
                User successFully Registred
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                name="firstName"
                type="text"
                className="form-control"
                ref={register}
                placeholder="Enter First Name"
              />
              <div className="invalid-feedback d-block">
                {errors.firstName?.message}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                name="lastName"
                type="text"
                className="form-control"
                ref={register}
                placeholder="Enter Last Name"
              />
              <div className="invalid-feedback d-block">{errors.lastName?.message}</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                ref={register}
                placeholder="Enter email"
              />
              <div className="invalid-feedback d-block">{errors.email?.message}</div>
            </div>

            <div className="mb-2">
              <label className="form-label">
                Password
                <span className="form-label-description">
                  <a href="./forgot-password.html">I forgot password</a>
                </span>
              </label>

              <div className="input-group input-group-flat">
                <input
                  name="password"
                  type="password"
                  ref={register}
                  className="form-control"
                  placeholder="Password"
                  autoComplete="off"
                />
                <div className="invalid-feedback d-block">
                  {errors.password?.message}
                </div>
                <span className="input-group-text"></span>
              </div>
            </div>
            <div className="form-footer">
              <button type="submit" className="btn btn-primary w-100">
                Sign UP
              </button>
            </div>
          </div>
        </form>
        <div className="text-center text-muted mt-3">
          login <Link to="/login">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
