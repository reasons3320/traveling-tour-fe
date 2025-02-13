import { useContext } from "react"
import { languageContext } from "./LanguageContext"

export const getContentByLanguage = (file)=>{
    const {language} = useContext(languageContext);
    return file[language];
}