import {createContext, useState} from "react";
import {FluentProvider, webDarkTheme, webLightTheme} from '@fluentui/react-components';
import {ThemeProvider as ThemeProviderOld} from '@fluentui/react';

const ThemeContext = createContext(undefined);
const ThemeProvider = ({children}) => {

    const modeLocalStorage = localStorage.getItem('mode');
    let mode = modeLocalStorage ? modeLocalStorage === 'dark' : false;
    const [darkMode, setDarkMode] = useState(mode);
    const setThemeContext = (isActive) => {
        localStorage.setItem('mode', isActive ? 'dark' : 'light');
        let metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute('content', isActive ? '#333333' : '#EBEBEB')
        setDarkMode(isActive);
    }
    const getThemeContext = () => darkMode;

    return (
        <ThemeContext.Provider value={{setThemeContext, getThemeContext}}>
            <FluentProvider theme={darkMode ? webDarkTheme : webLightTheme} dir="ltr">
                <ThemeProviderOld>
                    {children}
                </ThemeProviderOld>
            </FluentProvider>
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeProvider}