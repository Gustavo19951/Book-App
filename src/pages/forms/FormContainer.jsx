import {Col, Row} from "fluentui-react-grid";
import {Image, makeStyles, mergeClasses, Tab, TabList, Text, tokens} from "@fluentui/react-components";
import CommentImage from "../../assets/svg/comment.svg"
import reviewImage from "../../assets/svg/review.svg"
import icon from "../../assets/img/app.png";
import {FormattedMessage} from "react-intl";
import FormLogin from "./FormLogin.jsx";
import {useState} from "react";
import FormRegister from "./FormRegister.jsx";
import {useMediaQuery} from "react-responsive";

const useStyles = makeStyles({
    centerElements: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "93vh",
    },
    containerImage: {
        display: "flex",
        alignItems: "center",
        columnGap: tokens.spacingVerticalMNudge,
    },
    column: {
        flexDirection: "column",
        rowGap: "50px",
    }
})


const FormContainer = ({action = 'login', closeForm}) => {
    const classes = useStyles();
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 768px)'});
    const [selectedOption, setSelectedOption] = useState(action)

    const options = {
        login: <FormLogin closeForm={closeForm}/>,
        register: <FormRegister closeForm={closeForm}/>,
    }

    return (
        <Row>
            {!isTabletOrMobile &&
                <Col sizeSm={12} sizeMd={12} sizeLg={6} sizeXl={6}
                     className={mergeClasses(classes.centerElements, classes.column)}>
                    <Text size={700} weight="semibold" align="center">
                        <FormattedMessage id="app.invite" defaultMessage="Invite"/>
                    </Text>
                    <div className={classes.containerImage}>
                        <Image
                            alt="Image Benefits login on App"
                            src={CommentImage}
                            width={200}
                            heigth={200}/>
                        <Text size={500} weight="semibold">
                            <FormattedMessage id="app.comment" defaultMessage="Comment"/>
                        </Text>
                    </div>
                    <div className={classes.containerImage}>
                        <Text size={500} weight="semibold">
                            <FormattedMessage id="app.review" defaultMessage="Review"/>
                        </Text>
                        <Image
                            alt="Image Benefits login on App"
                            src={reviewImage}
                            width={200}
                            heigth={200}/>
                    </div>
                </Col>
            }
            <Col sizeSm={12} sizeMd={12} sizeLg={6} sizeXl={6}
                 className={mergeClasses(classes.centerElements, classes.column)}>
                <Image
                    alt="Book App icon"
                    src={icon}
                    width={100}
                    heigth={100}/>
                <TabList defaultSelectedValue={selectedOption} onTabSelect={(_, data) => setSelectedOption(data.value)}>
                    <Tab value="login">
                        <FormattedMessage id="app.login" defaultMessage="Login"/>
                    </Tab>
                    <Tab value="register">
                        <FormattedMessage id="app.register" defaultMessage="Register"/>
                    </Tab>
                </TabList>
                {options[selectedOption]}
            </Col>
        </Row>
    )
}
export default FormContainer;