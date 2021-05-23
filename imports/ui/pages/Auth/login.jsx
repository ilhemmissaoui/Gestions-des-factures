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
        props.history.push(
          Roles.getRolesForUser(Meteor.userId())[0]?.toLowerCase()
        );
        //redirect him to the path you want
      }
    });
  };

  // Always add a register to your input that you wanan find later on sumbit
  // ref={register} check input fields below
  return (
    <div>
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <div className="login">
                <img
                  src="https://logoipsum.com/logo/logo-1.svg"
                  width="325px"
                />
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium is-rounded"
                        name="email"
                        type="email"
                        placeholder="example@example.com"
                        autoComplete="username"
                       
                        ref={register}
                        placeholder="Enter email"
                      />
                      <div className="invalid-feedback d-block">
                        {errors.email?.message}
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-medium is-rounded"
                        name="password"
                        type="password"
                        ref={register}
                        placeholder="Password"
                        autoComplete="off"
                        placeholder="**********"
                      />
                    </div>
                    <div className="invalid-feedback d-block">
                      {errors.password?.message}
                    </div>
                  </div>

                  <br />
                  <button
                    className="button is-block is-fullwidth is-primary is-medium is-rounded"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
                <br />
                <nav className="level">
                  <div className="level-item has-text-centered">
                    <div>
                      <a href="./forgot-password.html">I forgot password</a>
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <div>
                      Don't have account yet? <Link to="/signup">Sign up</Link>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
