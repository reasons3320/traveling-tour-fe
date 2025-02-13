import React, { createContext, useContext, useState } from "react";

export const languageContext = createContext();
const LanguageContext = ({ children }) => {
  const [language, setLanguage] = useState("EN");
  const handleChangeLanguage = () => {
    if (language === "EN") {
      setLanguage("VI");
    } else {
      setLanguage("EN");
    }
  };
  return (
    <languageContext.Provider value={{ language, handleChangeLanguage }}>
      {children}
    </languageContext.Provider>
  );
};

export default LanguageContext;
