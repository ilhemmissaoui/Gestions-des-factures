import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../../api/schemas/LoginSchema";

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  console.log(errors);

  /// here you handle the form sumbited
  const onSubmit = ({ email, password }) => {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.log(`%c ${error}`, "color: gold; background: #252525");
        setError(error.reason);
      } else {
        console.log(props);
        props.history.push("/dashboard");
        //redirect him to the path you want
      }
    });
  };

  // Always add a register to your input that you wanan find later on sumbit
  // ref={register} check input fields below
  return (
    <div className="flex-fill d-flex flex-column justify-content-center py-4">
      <div className="container-tight py-6">
        <form
          className="card card-md"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="card-body">
            <h2 className="card-title text-center mb-4">
              Login to your account
            </h2>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                ref={register}
                placeholder="Enter email"
              />
              <div className="invalid-feedback d-block">
                {errors.email?.message}
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label">
                Password
                <span className="form-label-description">
                  <a href="./forgot-password.html">I forgot password</a>
                </span>
              </label>
              <div className="invalid-feedback d-block">
                {errors.password?.message}
              </div>
              <div className="input-group input-group-flat">
                <input
                  name="password"
                  type="password"
                  ref={register}
                  className="form-control"
                  placeholder="Password"
                  autoComplete="off"
                />
                <span className="input-group-text"></span>
              </div>
            </div>
            <div className="form-footer">
              <button type="submit" className="btn btn-primary w-100">
                Sign in
              </button>
            </div>
          </div>
        </form>
        <div className="text-center text-muted mt-3">
          Don't have account yet? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
