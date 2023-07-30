import RichTextEditor from "./RichTextEditor.jsx";
import {Button, makeStyles, shorthands, Spinner, tokens} from "@fluentui/react-components";
import React, {useState} from "react";
import {PublishCommentBook} from "../../services/bookServices/BookService.jsx";
import {Alert} from "@fluentui/react-components/unstable";
import {FormattedMessage} from "react-intl";
import Rating from "react-rating";
import {Save24Regular, Star20Filled, Star20Regular} from "@fluentui/react-icons";

const useStyles = makeStyles({
    button: {
        ...shorthands.margin("10px", "0"),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
})

const NewComment = ({idBook, idUser, reloadComments}) => {
    const classes = useStyles();
    const [comment, setComment] = useState(``);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleEdit = (value) => {
        setComment(value);
    }

    const handlePublish = () => {
        setLoading(true);
        const data = {
            "book": idBook,
            "user": idUser,
            "score": score,
            "comment": comment
        };
        const promise = PublishCommentBook(data);
        promise.then((res) => {
            setComment(``);
            setScore(0);
            setLoading(false);
            reloadComments();
        });
    }

    if (loading) {
        return <Alert action={<Spinner/>}>
            <FormattedMessage id="app.posting" defaultMessage="Posting Comment"/>
        </Alert>
    }

    return (
        <>
            <RichTextEditor editable={true} content={``} withToolBar={true} type="filled" handleEdit={handleEdit}/>
            <div className={classes.button}>
                <Rating start={0} stop={5}
                        onChange={(number) => {
                            setScore(number)
                        }}
                        initialRating={score}
                        fullSymbol={<Star20Filled style={{color: tokens.colorPaletteYellowForeground1}}/>}
                        emptySymbol={<Star20Regular style={{color: tokens.colorPaletteYellowForeground1}}/>}/>
                <Button icon={<Save24Regular/>} appearance="primary" onClick={handlePublish}>
                    <FormattedMessage id="app.post" defaultMessage="Post"/>
                </Button>
            </div>
        </>
    )
}

export default NewComment