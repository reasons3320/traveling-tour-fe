import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss";
import loginImg from "../../assets/login.png";
import userIcon from "../../assets/user.png";
import { useRegisterMutation } from "../../helper/authQuery";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate: registerMutate, isPending } = useRegisterMutation();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    username: yup.string().required("Username is required"),
    phone: yup.string().required("Phone number is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values) => {
    registerMutate(values, {
      onSuccess: (data) => {
        if (data.success === false) {
          toast.error("Your email or username is existed !");
        } else {
          toast.success("Sign up successfully.");
          navigate("/login");
        }
      },
    });
  };

  return (
    <section>
      <Container className="w-100">
        <Row className="">
          <Col lg="12" className={"m-auto"}>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
                <Formik
                  initialValues={{
                    email: "",
                    username: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="form__group">
                      <div className="form__item">
                        <Field type="text" name="email" placeholder="Email" />
                        <ErrorMessage name="email" component="div" className="form__item__error"/>
                      </div>
                      <div className="form__item">
                        <Field
                          type="text"
                          name="username"
                          placeholder="Username"
                        />
                        <ErrorMessage name="username" component="div" className="form__item__error"/>
                      </div>
                      <div className="form__item">
                        <Field
                          type="text"
                          name="phone"
                          placeholder="Phone number"
                        />
                        <ErrorMessage name="phone" component="div" className="form__item__error"/>
                      </div>
                      <div className="form__item">
                        <Field
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                        <ErrorMessage name="password" component="div" className="form__item__error"/>
                      </div>
                      <div className="form__item">
                        <Field
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm password"
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="form__item__error"/>
                      </div>
                      <Button
                        className={"btn secondary__btn auth__btn"}
                        type="submit"
                        disabled={isSubmitting || isPending}
                      >
                        {isPending ? "Loading..." : "Register"}
                      </Button>
                    </Form>
                  )}
                </Formik>
                <p>
                  Already have an account? <Link to={"/login"}>Log in</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignUp;
