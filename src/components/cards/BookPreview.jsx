import {
    Badge,
    Button,
    Caption1Strong,
    Card,
    CardFooter,
    CardHeader,
    Image,
    makeStyles,
    shorthands,
    Text,
    tokens,
    Tooltip
} from "@fluentui/react-components";
import {Heart24Filled, Heart24Regular, TextBulletListSquareSparkle24Regular} from '@fluentui/react-icons';
import fileDefault from "/src/assets/img/File-Default.jpeg"
import {Col} from "fluentui-react-grid";
import {useContext, useEffect, useState} from "react";
import {authContext} from "../../contexts/AuthContext.jsx";
import {FormattedMessage} from "react-intl";
import {AddLikeBook, FullListLike, RemoveLikeBook} from "../../services/bookServices/BookService.jsx";

const useStyles = makeStyles({
    cardFooter: {
        display: "flex",
        justifyContent: "space-between",
    },
    cardDescription: {
        display: "flex",
        flexDirection: "column",
        ...shorthands.padding(tokens.spacingVerticalSNudge, tokens.spacingVerticalMNudge),
        ...shorthands.margin(0),
    },
    cardActions: {
        display: "flex",
        columnGap: tokens.spacingVerticalXS,
    },
    card: {
        marginBottom: tokens.spacingVerticalMNudge,
    },
    text: {
        ...shorthands.overflow("hidden"),
        width: "200px",
        display: "block",
    },
    image: {
        maxHeight: "400px",
        height: "500px",
        minHeight: "400px",
        aspectRatio: "4/3"
    },
    content: {
        ...shorthands.padding("2px", "10px", "10px", "10px"),
        display: "flex",
        rowGap: "10px",
        flexDirection: "column"
    }
});
const BookPreview = (props) => {
    const classes = useStyles();

    const auth = useContext(authContext);
    const authData = auth.getAuthDataContext();

    const [likes, setLikes] = useState([]);
    const [hasMyLike, setHasMyLike] = useState(false);


    const {
        id = 1,
        book_image = "",
        altImage = "",
        name = "",
        description = "",
        author = "",
        rank = "",
        openReview,
        handleSelected
    } = props;

    const handleLike = (id) => {
        if (!authData) {
            auth.setLoadDrawerLoginContext(true);
            return;
        }
        const promise = AddLikeBook(id, authData.model.id);
        promise.then((res) => {
            setLikes([...likes, res]);
        });
        setHasMyLike(true);
    }

    const handleNoLike = () => {
        if (!authData) {
            auth.setLoadDrawerLoginContext(true);
            return;
        }
        const idLike = likes.filter(like => like.user === authData?.model.id);
        const promise = RemoveLikeBook(idLike[0].id);
        promise.then(() => {
            setLikes(likes.filter(like => like.user !== authData?.model.id));
        });
        setHasMyLike(false);
    }
    const handleComment = (id) => {
        if (!authData) {
            auth.setLoadDrawerLoginContext(true);
            return;
        }
        handleSelected(id)
        openReview();
    }


    useEffect(() => {
        const promise = FullListLike(id);
        promise.then((res) => {
            setHasMyLike(res.filter(({user}) => user === authData?.model.id).length > 0);
            setLikes(res);
        });

    }, []);
    return (
        <>
            <Col sizeSm={12} sizeMd={12} sizeLg={6} sizeXl={4} sizeXxl={3} sizeXxxl={2} className={classes.card}>
                <Card className="ms-scaleUpIn100" style={{padding: 0}}>
                    <Image src={book_image} alt={altImage}
                           fit="cover"
                           className={classes.image}
                           onError={({currentTarget}) => {
                               currentTarget.onerror = null;
                               currentTarget.src = fileDefault;
                           }}/>
                    <div className={classes.content}>
                        <CardHeader
                            header={<Text weight="semibold" truncate wrap={false}
                                          className={classes.text}>{name}</Text>}
                            description={<Caption1Strong truncate wrap={false}
                                                         className={classes.text}>{description !== '' ? description : 'without description'}</Caption1Strong>
                            }/>
                        <Badge>{author}</Badge>
                        <Badge appearance="filled" color="informative">Global Rank: {rank}</Badge>
                        <CardFooter className={classes.cardFooter}>
                            <div className={classes.cardActions}>
                                <Tooltip content={
                                    !hasMyLike ?
                                        <FormattedMessage id="app.like" defaultMessage="Like"/>
                                        :
                                        <FormattedMessage id="app.notLike" defaultMessage="Not Like"/>
                                } relationship="label" withArrow>
                                    <Button appearance="subtle"
                                            icon={hasMyLike ?
                                                <Heart24Filled style={{color: tokens.colorPaletteRedBackground3}}/>
                                                :
                                                <Heart24Regular/>}
                                            onClick={() => !hasMyLike ? handleLike(id) : handleNoLike(id)}>
                                        {likes.length > 0 ? likes.length : '0'}
                                    </Button>
                                </Tooltip>
                            </div>
                            <Tooltip content={<FormattedMessage id="app.review" defaultMessage="Review"/>}
                                     relationship="label" withArrow>
                                <Button appearance="subtle" icon={<TextBulletListSquareSparkle24Regular/>}
                                        onClick={() => {
                                            handleComment(id)
                                        }}> </Button>
                            </Tooltip>
                        </CardFooter>
                    </div>
                </Card>
            </Col>

        </>
    )
}

export default BookPreview;