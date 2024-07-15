import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import "./Questions.scss";
import Aos from "aos";
import "aos/dist/aos.css";
const Questions = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [active, setActive] = useState(
    "How do I choose the right travel destination for me ?"
  );
  return (
    <div className="questions section container">
      <div className="secHeading">
        <h3 data-aos="fade-up">Frequently Asked Questions</h3>
      </div>
      <div className="secContainer grid">
        <div className="accordion grid" data-aos="fade-up">
          <Accordion
            title={"How do I choose the right travel destination for me ?"}
            desc={
              " Consider you interests, budget, desired, experiences, and the type of environment you enjoy."
            }
            active={active}
            setActive={setActive}
            data-aos="fade-up"
          />
          <Accordion
            title={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, eos?"
            }
            desc={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, eos? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, eos?"
            }
            active={active}
            setActive={setActive}
          />
        </div>

        <div className="form">
          <div className="secHeading">
            <h4 data-aos="fade-down">Do you have any specific questions?</h4>
            <p data-aos="fade-down">
              Please fill the form below and our dedicated team will get in
              touch with you as soon as possible
            </p>
          </div>
          <div className="formContent grid">
            <input
              data-aos="fade-down"
              type="email"
              placeholder="Enter email address"
            />
            <textarea
              data-aos="fade-down"
              placeholder="Enter your question here"
            ></textarea>
            <button data-aos="fade-down" className="btn">
              Submit Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
