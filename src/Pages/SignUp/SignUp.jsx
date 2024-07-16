import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss";
import loginImg from "../../assets/login.png";
import userIcon from "../../assets/user.png";
import { useRegisterMutation } from "../../helper/authQuery";
import toast from "react-hot-toast";
const SignUp = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    phone: undefined,
  });
  const navigate = useNavigate();
  const { mutate: registerMutate, isPending } = useRegisterMutation();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    registerMutate(credentials, {
      onSuccess: (data) => {
        console.log(data);
        if (data.success === false) {
          toast.error("Your email or username is existed !");
        } else {
          toast.success("Sign up successfully.");
          setCredentials({});
          navigate("/login");
        }
      },
    });
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className={"m-auto"}>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      id="username"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Phone number"
                      required
                      id="phone"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      required
                      id="confirmPassword"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className={"btn secondary__btn auth__btn"}
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? "Loading..." : "Register"}
                  </Button>
                </Form>
                <p>
                  Already have an account ? <Link to={"/login"}>Log in</Link>
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
