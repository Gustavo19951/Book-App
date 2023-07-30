import {Button, Image, makeStyles, Persona, shorthands, Text, tokens} from "@fluentui/react-components";
import {FormattedMessage} from "react-intl";
import {Dismiss24Regular, Info24Regular} from '@fluentui/react-icons';
import {Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle} from "@fluentui/react-components/unstable";
import ContractImage from "../../assets/svg/contract.svg"
import {useBoolean} from "@fluentui/react-hooks";
import {SocialIcon} from 'react-social-icons';
import {useMediaQuery} from "react-responsive";

const useStyles = makeStyles({
    navBar: {
        left: 0,
        bottom: 0,
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
        columnGap: tokens.spacingVerticalXS
    },
    containerCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        rowGap: tokens.spacingVerticalMNudge,
        flexDirection: "column"
    }
})

const FooterBar = () => {
    const classes = useStyles();
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 768px)'});

    const [legal, {setFalse: closeLegal, setTrue: openLegal}] = useBoolean(false)
    return (
        <>
            <div className={classes.navBar}>
                <div className={classes.container}>
                    <Text>
                        <FormattedMessage id={!isTabletOrMobile ? "app.cookies" : "app.cookies.short"}
                                          defaultMessage="Cookies"/>
                    </Text>
                </div>
                <div className={classes.container}>
                    <Button appearance="transparent" icon={<Info24Regular/>} onClick={openLegal}>
                        <FormattedMessage id="app.terms" defaultMessage="Terms of use"/>
                    </Button>
                </div>
            </div>
            <Drawer
                className="ms-slideLeftIn10"
                size="medium"
                type="overlay"
                position="right"
                open={legal}>
                <DrawerHeader>
                    <DrawerHeaderTitle
                        action={
                            <Button
                                appearance="subtle"
                                aria-label="Close"
                                icon={<Dismiss24Regular/>}
                                onClick={closeLegal}/>
                        }>
                    </DrawerHeaderTitle>
                </DrawerHeader>
                <DrawerBody>
                    <div className={classes.containerCenter}>
                        <Image
                            alt="Terms of use Image"
                            src={ContractImage}
                            width={200}
                            heigth={200}/>
                        <Text size={500} weight="semibold">
                            <FormattedMessage id="app.terms" defaultMessage="Terms of use"/>
                        </Text>
                        <Text font="monospace">
                            <FormattedMessage id="app.declaimer" defaultMessage="Declaimer"/>
                        </Text>
                        <Text size={400} weight="semibold">
                            <FormattedMessage id="app.made" defaultMessage="Made By"/>
                        </Text>
                        <Persona
                            size="huge"
                            name="Gustavo Adolfo Rodriguez Bernal"
                            secondaryText="Gustavor.dev@outlook.com"
                            presence={{status: "available"}}
                            avatar={{
                                image: {
                                    src: "https://media.licdn.com/dms/image/D4D03AQFnuzDmf1V4Mw/profile-displayphoto-shrink_400_400/0/1689691987000?e=1695859200&v=beta&t=k6wD0Il8OTNiFUw16cIy3iy_Y0CTz1qxHmFVhxjj_do",
                                }
                            }}
                        />
                        <div className={classes.container}>
                            <SocialIcon url="https://www.linkedin.com/in/gustavoadolforodriguezbernal/"/>
                            <SocialIcon url="https://github.com/Gustavo19951"/>
                            <SocialIcon url="https://www.instagram.com/gus_rodri1/"/>
                        </div>
                    </div>
                </DrawerBody>
            </Drawer>
        </>

    )
}

export default FooterBar