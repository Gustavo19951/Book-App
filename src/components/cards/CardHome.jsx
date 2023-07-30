import {
    Card,
    CardFooter,
    Image,
    makeStyles,
    mergeClasses,
    Persona,
    shorthands,
    Text,
    Title1,
    tokens
} from "@fluentui/react-components";
import {Col} from "fluentui-react-grid";
import Home from "../../../public/svg/Home.svg";
import {useContext} from "react";
import {authContext} from "../../contexts/AuthContext.jsx";
import {FormattedMessage} from "react-intl";
import {useMediaQuery} from "react-responsive";

const useStyles = makeStyles({
    containerCenter: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        rowGap: "15px",
        alignItems: "center",
    },
    containerBetween: {
        display: "flex",
        justifyContent: "space-between",
        columnGap: "15px"
    },
    card: {
        maxWidth: "100%",
        height: "fit-content",
        marginBottom: tokens.spacingVerticalMNudge,
        paddingTop: "55px",
    },
    paddingElements: {
        ...shorthands.padding('55px'),
        minWidth: "70vw",
    },
    listElements: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px"
    },
    footer: {
        display: "flex",
        flexDirection: "column"
    },
    footerContent: {
        display: "flex",
        columnGap: "5px"
    }
});
const CardHome = () => {
    const classes = useStyles();
    const auth = useContext(authContext);
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 768px)'});

    return (
        <Col sizeSm={12} sizeMd={12} sizeLg={12} sizeXl={12}
             className={mergeClasses(classes.card, !isTabletOrMobile && classes.paddingElements)}>
            <div className={classes.containerCenter}>
                <Card className={mergeClasses(classes.card, !isTabletOrMobile && classes.paddingElements)}>
                    <div className={classes.containerBetween}>
                        <div className={classes.listElements}>
                            <Title1>
                                <FormattedMessage id="app.name" defaultMessage="Book App"/>
                            </Title1>
                            <Text>
                                <FormattedMessage id="app.description" defaultMessage="Description app not Found"/>
                            </Text>
                            <Text weight="semibold">
                                * <FormattedMessage id="app.informationLang"
                                                    defaultMessage="Information Lang no found"/>
                            </Text>
                            <Text size={400} weight="semibold">
                                <FormattedMessage id="app.made" defaultMessage="Made By"/>
                            </Text>
                            <Persona
                                size="large"
                                name="Gustavo Adolfo Rodriguez Bernal"
                                secondaryText="Gustavor.dev@outlook.com"
                                presence={{status: "available"}}
                                avatar={{
                                    image: {
                                        src: "https://media.licdn.com/dms/image/D4D03AQFnuzDmf1V4Mw/profile-displayphoto-shrink_400_400/0/1689691987000?e=1695859200&v=beta&t=k6wD0Il8OTNiFUw16cIy3iy_Y0CTz1qxHmFVhxjj_do",
                                    }
                                }}
                            />

                        </div>
                        {!isTabletOrMobile &&
                            <div>
                                <Image
                                    alt="Image Home book app"
                                    src={Home}
                                    width={250}
                                    heigth={250}/>
                            </div>
                        }
                    </div>
                    <CardFooter className={classes.footer}>
                        <Text size={400} weight="semibold">
                            <FormattedMessage id="app.createUsing" defaultMessage="Creado Usando"/>
                        </Text>
                        <div className={classes.footerContent}>
                            <Image
                                alt="Fluent UI"
                                src="https://img.shields.io/badge/Fluent%20UI-%23000000.svg?style=for-the-badge&logo=microsoft&logoColor=white"
                                heigth={100}/>
                            <Image
                                alt="Fly IO"
                                src="https://img.shields.io/badge/Fly%20IO-%23563D7C.svg?style=for-the-badge&logo=icloud&logoColor=white&color=B646C4"
                                heigth={100}/>
                            <Image
                                alt="Fly IO"
                                src="https://img.shields.io/badge/unDraw-%23563D7C.svg?style=for-the-badge&logo=uptimekuma&logoColor=white"
                                heigth={100}/>
                            <Image
                                alt="React"
                                src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
                                heigth={100}/>
                            <Image
                                alt="PocketBase"
                                src="https://img.shields.io/badge/pocketbase-%23000000.svg?style=for-the-badge&logo=pocketbase&logoColor=black&color=E6E6E6"
                                heigth={100}/>
                            <Image
                                alt="New York Times"
                                src="https://img.shields.io/badge/New%20York%20Times%20Data-%23000000.svg?style=for-the-badge&logo=New%20York%20Times&logoColor=white"
                                heigth={100}/>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </Col>)
}
export default CardHome