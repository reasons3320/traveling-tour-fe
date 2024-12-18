import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.scss";
import loginImg from "../../assets/login.png";
import userIcon from "../../assets/user.png";
import { useDispatch } from "react-redux";
import { handleLoginSuccess } from "../../redux/userSlice";
import { useLoginMutation } from "../../helper/authQuery";
import toast from "react-hot-toast";

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
  const handleClick = async (e) => {
    e.preventDefault();
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
                <Form onSubmit={handleClick} style={{
                  height:"70%",
                  display:'flex',
                  flexDirection:'column',
                  gap:'20px'
                }}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                      value={credentials.email}
                      style={{
                        height:50
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                      value={credentials.password}
                      style={{
                        height:50
                      }}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? "Logging in..." : "Login"}
                  </Button>
                </Form>
                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
  );
};

export default SignIn;
