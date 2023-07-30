import {Route, Routes} from "react-router-dom";
import {ThemeProvider} from "./contexts/ThemeContext.jsx"
import {useEffect} from "react";
import Home from "./pages/Home.jsx";
import NavBar from "./components/navigations/NavBar.jsx";
import FooterBar from "./components/navigations/FooterBar.jsx";

function App() {

    const loaded = () => {
        let loader = document.querySelector(".loader");
        setTimeout(() => {
            loader.classList.add('loaded');
        }, 700)
    }

    useEffect(loaded)
    return (
        <ThemeProvider>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
            <FooterBar/>
        </ThemeProvider>
    )
}

export default App
