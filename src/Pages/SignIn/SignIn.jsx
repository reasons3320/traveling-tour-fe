import React, { useState } from "react";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.scss";
import loginImg from "../../assets/login.png";
import userIcon from "../../assets/user.png";
import { useDispatch } from "react-redux";
import { handleLoginSuccess } from "../../redux/userSlice";
import { useLoginMutation } from "../../helper/authQuery";
import toast from "react-hot-toast";
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
const SignIn = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const { mutate: loginMutation, isPending } = useLoginMutation();
  const handleClick = async (credentials) => {
    // console.log("Form submitted");
    loginMutation(credentials, {
      onSuccess: (data) => {
        if (data.success === false) {
          toast.error("Login failure!");
          // dispatch(handleLoginSuccess(data));
          // navigate("/");
        } else {
          toast.success("Login succeed!");
          dispatch(handleLoginSuccess(data?.data));
          navigate("/");
        }
      },
      onError: (error) => {
        toast.error("Login failed!");
      },
    });
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email can not be empty !"),
    password: yup.string().required("Password can not be empty !"),
  });
  return (
    <div className="login__container d-flex justify-content-between">
      <div className="login__img">
        <img src={loginImg} alt="" />
      </div>
      <div className="login__form">
        <div className="user">
          <img src={userIcon} alt="" />
        </div>
        <h2>Login</h2>
        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleClick}
        >
          {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
            <Form
              onSubmit={handleSubmit}
              style={{
                height: "70%",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <input
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                style={{
                  height: 50,
                }}
              />
              {errors.email ? (
                <ErrorMessage name="email"/>
              ) : (
                ""
              )}
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                style={{
                  height: 50,
                }}
              />
              {errors.password ? (
                <ErrorMessage name="password"/>
              ) : (
                ""
              )}
              <Button
                className="btn secondary__btn auth__btn"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </Form>
          )}
        </Formik>

        <p>
          Don't have an account? <Link to="/register">Create</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
