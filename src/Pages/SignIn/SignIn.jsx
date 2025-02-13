import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import "./SignIn.scss";
import loginImg from "../../assets/login.png";
import userIcon from "../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginSuccess } from "../../redux/userSlice";
import { useLoginMutation } from "../../helper/authQuery";
import toast from "react-hot-toast";
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { mutate: loginMutation, isPending } = useLoginMutation();
  const handleClick = async (credentials) => {
    loginMutation(credentials, {
      onSuccess: (data) => {
        if (data.success === false) {
          toast.error("Login failure!");
        } else {
          toast.success("Login succeed!");
          dispatch(handleLoginSuccess(data?.data));
          const currentUser = data?.data;
          if (currentUser.role === "Organizer") {
            navigate("/organizer/dashboard");
          } else {
            navigate("/"); // Redirect to homepage or customer dashboard
          }
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
    <div className="login__container">
    <div className="login__wrapper">
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
            className="form__wrapper"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              {errors.email ? <ErrorMessage name="email" /> : ""}
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              {errors.password ? <ErrorMessage name="password" /> : ""}
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
    </div>
  );
};

export default SignIn;
