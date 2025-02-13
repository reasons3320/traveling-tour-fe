import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import "./Questions.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { questionContent } from "./question.lang";
import { getContentByLanguage } from "../../context/languageUseCase";
const Questions = () => {
  const language = getContentByLanguage(questionContent);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [active, setActive] = useState(
    "How do I choose the right travel destination for me ?"
  );
  return (
    <div className="questions section container">
      <div className="secHeading">
        <h3 data-aos="fade-up">{language.title}</h3>
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
              " How can I book a tour online, and what payment methods are accepted??"
            }
            desc={
              "You can book a tour online by visiting our website and browsing the available tours. Once you’ve chosen a tour, click on the 'Book Now' button, fill in the required details, and proceed to the payment page"
            }
            active={active}
            setActive={setActive}
          />
        </div>

        <div className="form">
          <div className="secHeading">
            <h4 data-aos="fade-down">{language.secondTitle}</h4>
            <p data-aos="fade-down">
              {language.desc}
            </p>
          </div>
          <div className="formContent grid">
            <input
              data-aos="fade-down"
              type="email"
              placeholder={language.placeholder1}
            />
            <textarea
              data-aos="fade-down"
              placeholder={language.placeholder2}
            ></textarea>
            <button data-aos="fade-down" className="btn">
              {language.btn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
