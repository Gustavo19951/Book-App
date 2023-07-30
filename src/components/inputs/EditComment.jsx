import RichTextEditor from "./RichTextEditor.jsx";
import {Avatar, Body1, Button, Caption1, CardHeader, makeStyles, shorthands, tokens} from "@fluentui/react-components";
import React, {useContext, useState} from "react";
import {authContext} from "../../contexts/AuthContext.jsx";
import Rating from "react-rating";
import {
    Delete24Regular,
    Edit24Regular,
    EditOff24Regular,
    Save24Regular,
    Star20Filled,
    Star20Regular
} from "@fluentui/react-icons";
import {DeleteCommentBook, EditCommentBook} from "../../services/bookServices/BookService.jsx";
import {Spinner} from "@fluentui/react";
import {FormattedMessage} from "react-intl";

const useStyles = makeStyles({
    rate: {
        display: "flex"
    },
    button: {
        ...shorthands.margin("4px", "0"),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
})

const EditComment = (props) => {

    const {id, comment, score, expand, created, idBook, reloadComments} = props
    const classes = useStyles();
    const auth = useContext(authContext);
    const authData = auth.getAuthDataContext();

    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [commentEdited, setComment] = useState(comment);
    const [scoreEdited, setScore] = useState(score);

    const idAuth = authData?.model?.id;
    const idUser = expand?.user?.id;
    const name = expand?.user?.name !== '' ? expand?.user?.name : expand?.user?.email.split('@')[0];

    const handleEdit = (value) => {
        setComment(value);
    }

    const handleDeleteComment = () => {
        const promise = DeleteCommentBook(id);
        promise.then((res) => {
            setComment(``);
            setScore(0);
            setLoading(false);
            setEdit(false);
            reloadComments();
        });
    }
    const handleEditComment = () => {
        setLoading(true);
        const data = {
            "book": idBook,
            "user": idUser,
            "score": scoreEdited,
            "comment": commentEdited
        };
        const promise = EditCommentBook(id, data);
        promise.then((res) => {
            setComment(``);
            setScore(0);
            setLoading(false);
            setEdit(false);
            reloadComments();
        });
    }

    return (<>
            <CardHeader
                image={<Avatar name={name}/>}
                header={<Body1><b>{name}</b> comento</Body1>}
                description={<Caption1>{created.split('.')[0]} </Caption1>}
                action={idAuth === idUser ?
                    !edit ?
                        <Button icon={<Edit24Regular/>} onClick={() => setEdit(true)}>
                            <FormattedMessage id="app.edit" defaultMessage="Discard"/>
                        </Button> :
                        <Button icon={<EditOff24Regular/>} onClick={() => setEdit(false)}>
                            <FormattedMessage id="app.discard" defaultMessage="Discard"/>
                        </Button> : ''}/>
            {edit ?
                <>
                    <RichTextEditor editable={true}
                                    content={`${commentEdited}`}
                                    withToolBar={true}
                                    type="subtle"
                                    handleEdit={handleEdit}/>
                    {edit && <div className={classes.button}>
                        <Rating start={0} stop={5}
                                initialRating={score}
                                onChange={(number) => {
                                    setScore(number)
                                }}
                                fullSymbol={<Star20Filled style={{color: tokens.colorPaletteYellowForeground1}}/>}
                                emptySymbol={<Star20Regular style={{color: tokens.colorPaletteYellowForeground1}}/>}/>

                        {loading ?
                            <Spinner/>
                            :
                            <div>
                                <Button icon={<Delete24Regular/>} appearance="subtle" onClick={handleDeleteComment}>
                                    <FormattedMessage id="app.delete" defaultMessage="Delete"/>
                                </Button>
                                <Button icon={<Save24Regular/>} appearance="primary" onClick={handleEditComment}>
                                    <FormattedMessage id="app.save" defaultMessage="Save"/></Button>
                            </div>
                        }
                    </div>}
                </>
                :
                <>
                    <Rating start={0} stop={5}
                            initialRating={score}
                            readonly
                            fullSymbol={<Star20Filled style={{color: tokens.colorPaletteYellowForeground1}}/>}
                            emptySymbol={<Star20Regular style={{color: tokens.colorPaletteYellowForeground1}}/>}
                    />
                    <RichTextEditor content={`${comment}`} type="subtle"/>
                </>

            }
        </>
    )
}


export default EditComment