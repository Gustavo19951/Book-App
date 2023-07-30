import {
    Button,
    Divider,
    Image,
    makeStyles,
    Menu,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    Persona,
    shorthands,
    Subtitle1,
    Switch,
    tokens
} from "@fluentui/react-components";
import {
    Dismiss24Regular,
    Form24Regular,
    GridDots24Regular,
    LocalLanguage24Regular,
    LockClosed24Regular,
    LockOpen24Regular
} from '@fluentui/react-icons';

import icon from "../../assets/img/app.png";
import {useContext, useEffect, useRef, useState} from "react";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {FormattedMessage} from "react-intl";
import {Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle} from "@fluentui/react-components/unstable";

import {useBoolean} from "@fluentui/react-hooks";
import {authContext} from "../../contexts/AuthContext.jsx";
import FormContainer from "../../pages/forms/FormContainer.jsx";
import {EndSession} from "../../services/authServices/AuthService.jsx";
import {langContext} from "../../contexts/LangContext.jsx";
import {useMediaQuery} from "react-responsive";


const useStyles = makeStyles({
    navBar: {
        left: 0,
        top: 0,
        right: 0,
        zIndex: 3,
        height: '50px',
        position: 'fixed',
        display: "flex",
        boxShadow: tokens.shadow2,
        ...shorthands.padding(0, tokens.spacingVerticalS, 0, tokens.spacingVerticalS),
        backgroundColor: tokens.colorSubtleBackgroundSelected,
        color: tokens.colorNeutralForeground1,
        alignItems: "center",
        justifyContent: "space-between"
    },
    container: {
        display: "flex",
        alignItems: "center",
        columnGap: tokens.spacingVerticalM
    }
})

function LockClose24Regular() {
    return null;
}

const NavBar = () => {
    const classes = useStyles();
    const darkModeContext = useContext(ThemeContext);
    const lang = useContext(langContext);
    const langSelected = lang.getLang();
    const auth = useContext(authContext);
    const authData = auth.getAuthDataContext();
    const openDrawer = auth.getLoadDrawerLoginContext();
    const isDarkMode = darkModeContext.getThemeContext();
    const [login, {setFalse: closeLogin, setTrue: openLogin}] = useBoolean(false)
    const [action, setAction] = useState('login');
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 768px)'});
    const [boundary, setBoundary] = useState(null);
    const positioningRefSubmenu = useRef(null);
    const positioningRefRoot = useRef(null);
    const handleChangeMode = (_, data) => darkModeContext.setThemeContext(data.checked);

    const handleCloseFormLogin = () => {
        auth.setLoadDrawerLoginContext(false);
        closeLogin();
    }

    const handleCloseSession = () => {
        auth.setAuthDataContext(undefined);
        EndSession();
    }

    useEffect(() => {
        if (boundary) {
            const resizeObserver = new ResizeObserver(() => {
                positioningRefSubmenu.current?.updatePosition();
                positioningRefRoot.current?.updatePosition();
            });
            resizeObserver.observe(boundary);
            return () => {
                resizeObserver.unobserve(boundary);
                resizeObserver.disconnect();
            };
        }
    }, [boundary]);

    useEffect(() => {
        openDrawer && openLogin();
    }, [openDrawer]);

    const name = authData?.model?.name !== '' ? authData?.model?.name : authData?.model?.email.split('@')[0];

    return (
        <>
            <div className={classes.navBar}>
                <div className={classes.container}>
                    <Image
                        alt="Book App icon"
                        src={icon}
                        height={40}
                        width={38}/>
                    <Subtitle1>
                        <FormattedMessage id="app.name" defaultMessage="Book App"/>
                    </Subtitle1>
                </div>
                {!isTabletOrMobile ?
                    <div className={classes.container}>
                        <Button appearance={langSelected === "Español" ? "primary" : "subtle"}
                                icon={<LocalLanguage24Regular/>}
                                onClick={() => lang.setLang('es')}>
                            Español
                        </Button>
                        <Button appearance={langSelected === "English" ? "primary" : "subtle"}
                                icon={<LocalLanguage24Regular/>}
                                onClick={() => lang.setLang('en')}>
                            English
                        </Button>
                        <Switch label={<FormattedMessage id="app.dark.Mode" defaultMessage="Dark Mode"/>}
                                checked={isDarkMode} onChange={handleChangeMode}/>
                        <Divider vertical style={{height: "100%"}}/>
                        {authData ?
                            <>
                                <Persona
                                    textPosition="before"
                                    avatar={{color: "colorful"}}
                                    name={name}
                                    secondaryText={authData?.model?.email}
                                />
                                <Button appearance="primary" icon={<LockClosed24Regular/>} onClick={handleCloseSession}>
                                    <FormattedMessage id="app.endSession" defaultMessage="Close Session"/>
                                </Button>
                            </>
                            :
                            <>
                                <Button appearance="subtle" icon={<Form24Regular/>} onClick={() => {
                                    setAction('register')
                                    openLogin()
                                }}>
                                    <FormattedMessage id="app.register" defaultMessage="Register"/>
                                </Button>
                                <Button appearance="primary" icon={<LockOpen24Regular/>} onClick={() => {
                                    setAction('login')
                                    openLogin()
                                }}>
                                    <FormattedMessage id="app.login" defaultMessage="Login"/>
                                </Button>
                            </>
                        }
                    </div>
                    :
                    <Menu>
                        <MenuTrigger disableButtonEnhancement>
                            <Button appearance="subtle" icon={<GridDots24Regular/>}/>
                        </MenuTrigger>
                        <MenuPopover>
                            {authData &&
                                <Persona
                                    avatar={{color: "colorful"}}
                                    name={name}
                                    secondaryText={authData?.model?.email}
                                />
                            }
                            <MenuItem>
                                <Switch label={<FormattedMessage id="app.dark.Mode" defaultMessage="Dark Mode"/>}
                                        checked={isDarkMode} onChange={handleChangeMode}/>
                            </MenuItem>
                            <MenuList>
                                <Menu
                                    positioning={{
                                        overflowBoundary: boundary,
                                        flipBoundary: boundary,
                                        positioningRef: positioningRefSubmenu,
                                    }}>
                                    <MenuTrigger disableButtonEnhancement>
                                        <MenuItem icon={<LocalLanguage24Regular/>}>Languaje</MenuItem>
                                    </MenuTrigger>
                                    <MenuPopover>
                                        <MenuList>
                                            <MenuItem onClick={() => {
                                                lang.setLang('es')
                                            }}>Español</MenuItem>
                                            <MenuItem onClick={() => {
                                                lang.setLang('en')
                                            }}>English</MenuItem>
                                        </MenuList>
                                    </MenuPopover>
                                </Menu>
                            </MenuList>

                            {authData ?
                                <MenuItem icon={<LockClosed24Regular/>} onClick={handleCloseSession}>
                                    <FormattedMessage id="app.endSession" defaultMessage="Close Session"/>
                                </MenuItem>
                                :
                                <MenuItem icon={<LockOpen24Regular/>} onClick={() => {
                                    setAction('login')
                                    openLogin()
                                }}>
                                    <FormattedMessage id="app.registerOrLogin"
                                                      defaultMessage="Description app not Found"/>
                                </MenuItem>
                            }
                        </MenuPopover>
                    </Menu>
                }

            </div>
            <Drawer
                className="ms-slideLeftIn10"
                size="large"
                type="overlay"
                position="right"
                open={login}>
                <DrawerHeader>
                    <DrawerHeaderTitle
                        action={
                            <Button
                                appearance="subtle"
                                aria-label="Close"
                                icon={<Dismiss24Regular/>}
                                onClick={handleCloseFormLogin}/>
                        }>
                    </DrawerHeaderTitle>
                </DrawerHeader>
                <DrawerBody>
                    <FormContainer closeForm={closeLogin} action={action}/>
                </DrawerBody>
            </Drawer>
        </>

    )
}

export default NavBar