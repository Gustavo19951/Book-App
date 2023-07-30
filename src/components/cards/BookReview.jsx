import {Alert, Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle} from "@fluentui/react-components/unstable";
import {Button, Card, Divider, Image, makeStyles, mergeClasses, shorthands} from "@fluentui/react-components";
import {Dismiss24Regular} from "@fluentui/react-icons";
import {Col, Row} from "fluentui-react-grid";
import DetailsBook from "./DetailsBook.jsx";
import React, {useContext, useEffect, useState} from "react";
import EditComment from "../inputs/EditComment.jsx";
import NewComment from "../inputs/NewComment.jsx";
import {authContext} from "../../contexts/AuthContext.jsx";
import {FullListComments} from "../../services/bookServices/BookService.jsx";
import agree from "/src/assets/svg/agree.svg";
import {FormattedMessage} from "react-intl";

const useStyles = makeStyles({
    margin: {
        ...shorthands.margin("10px", "0")
    },
    responsiveDetails: {
        overflowY: "auto",
        height: "calc(100vh - 100px)",
        ...shorthands.padding("10px")
    },
    responsiveComments: {
        overflowY: "auto",
        height: "calc(100vh - 400px)",
        ...shorthands.padding("10px")
    },
    justifyCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: "15px"
    },
})

const BookReview = ({review, closeReview, idBook, name}) => {
    const classes = useStyles();
    const auth = useContext(authContext);
    const authData = auth.getAuthDataContext();

    const [comments, setComments] = useState([]);


    const handleListComment = () => {
        const promise = FullListComments(idBook);
        promise.then((res) => {
            setComments(res)
        })
    }

    useEffect(handleListComment, [idBook]);


    return (
        <Drawer
            className="ms-slideLeftIn10"
            size="large"
            type="overlay"
            position="right"
            open={review}>
            <DrawerHeader>
                <DrawerHeaderTitle
                    action={
                        <Button
                            appearance="subtle"
                            aria-label="Close"
                            icon={<Dismiss24Regular/>}
                            onClick={closeReview}/>
                    }/>
            </DrawerHeader>
            <DrawerBody style={{overflow: "unset"}}>
                <Row>
                    <Col sizeSm={12} sizeMd={12} sizeLg={4} sizeXl={4} className={classes.margin}>
                        <div className={classes.responsiveDetails}>
                            <DetailsBook idBook={idBook}/>
                        </div>
                    </Col>
                    <Col sizeSm={12} sizeMd={12} sizeLg={8} sizeXl={8} className={classes.margin}>
                        <NewComment idBook={idBook} idUser={authData?.model?.id} reloadComments={handleListComment}/>
                        <Divider className={classes.margin}/>
                        <div className={classes.responsiveComments}>
                            {comments.length > 0 ? comments.map((comment) =>
                                    <Card key={comment.id + '' + comment.comment}
                                          className={mergeClasses("ms-scaleUpIn100", classes.margin)}>
                                        <EditComment {...comment} reloadComments={handleListComment}/>
                                    </Card>)
                                :
                                <>
                                    <div className={classes.justifyCenter}>
                                        <Image
                                            alt="Terms of use Image"
                                            src={agree}
                                            width={400}
                                            heigth={500}/>
                                        <Alert intent="info" action="">
                                            <FormattedMessage id="app.notFound.comments"
                                                              defaultMessage="No comments to display"/>
                                        </Alert>
                                    </div>
                                </>
                            }
                        </div>

                    </Col>
                </Row>
            </DrawerBody>
        </Drawer>
    )
}

export default BookReview;