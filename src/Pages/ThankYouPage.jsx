import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import img from "../../src/assets/thankyou.png";
const ThankYouPage = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Container>
        <Row>
          <Col lg="12" className={"text-center"}>
            <div className="thank__you">
              <img
                src={img}
                style={{
                  width: 400,
                  height: 400,
                }}
              ></img>
              <h3
                className="mb-4"
                style={{
                  fontFamily: "cursive",
                }}
              >
                Your tour is booked.
              </h3>
              {/* <Button className="btn primary__btn w-25">
                <Link to={"/home"}>Back to Home</Link>
              </Button> */}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYouPage;
