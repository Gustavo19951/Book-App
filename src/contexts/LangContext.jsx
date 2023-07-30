import {IntlProvider} from "react-intl";
import es from "./../assets/json/es.json";
import us from "./../assets/json/en.json";

import React, {useState} from "react";

const langContext = React.createContext(null);
const LangProvider = ({children}) => {

    let localeDefault = 'es';
    let msgDefault = Object.freeze(es);
    const lang = localStorage.getItem('lang');


    if (lang) {
        switch (lang) {
            case "Español":
            default:
                localeDefault = 'es';
                msgDefault = Object.freeze(es);
                break;
            case"English":
                localeDefault = 'en';
                msgDefault = Object.freeze(us);
                break;
        }
    }

    const [msg, setMsg] = useState(msgDefault);
    const [locale, setLocale] = useState(localeDefault);


    const setLang = (lang) => {

        switch (lang) {
            default:
            case"es":
                setMsg(Object.freeze(es));
                localStorage.setItem('lang', 'Español');
                setLocale('es-CO');
                break;
            case"en":
                setMsg(Object.freeze(us));
                localStorage.setItem('lang', 'English');
                setLocale('en-US');
                break;
        }


    }

    const getLang = () => lang;

    return (
        <langContext.Provider value={{setLang, getLang}}>
            <IntlProvider messages={msg} locale={locale} defaultLocale="es">
                {children}
            </IntlProvider>
        </langContext.Provider>
    )
}

export {LangProvider, langContext};