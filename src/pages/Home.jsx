import {
    Button,
    Divider,
    Image,
    Input,
    Label,
    makeStyles,
    mergeClasses,
    shorthands,
    tokens
} from "@fluentui/react-components";
import {Col, Grid, Row} from "fluentui-react-grid";
import BookPreview from "../components/cards/BookPreview.jsx";
import {useEffect, useMemo, useState} from "react";
import CardHome from "../components/cards/CardHome.jsx";
import {useMediaQuery} from "react-responsive";
import {GetBookList} from "../services/bookServices/BookService.jsx";
import BookReview from "../components/cards/BookReview.jsx";
import {useBoolean} from "@fluentui/react-hooks";
import empty from "../assets/svg/empty.svg";
import {Alert} from "@fluentui/react-components/unstable";
import {Search24Regular} from "@fluentui/react-icons";
import {FormattedMessage} from "react-intl";

const useStyles = makeStyles({
    container: {
        position: "absolute",
        zIndex: 2,
        ...shorthands.inset(0, 0, 0, 0),
        ...shorthands.overflow('auto', 'auto'),
        backgroundColor: tokens.colorSubtleBackgroundHover,
        color: tokens.colorNeutralForeground1,
    },
    paddingElements: {
        ...shorthands.padding("58px", "150px", "58px", "150px")
    },
    justifyEnd: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: tokens.spacingVerticalMNudge,
        flexDirection: "row-reverse"
    },
    justifyCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: "15px"
    },
    column: {
        display: "flex", flexDirection: "column"
    }
});
const Home = () => {
    const classes = useStyles();

    const isTabletOrMobile = useMediaQuery({query: '(max-width: 768px)'});

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [books, setBooks] = useState([]);
    const [selected, setSelected] = useState(undefined);
    const [review, {setFalse: closeReview, setTrue: openReview}] = useBoolean(false);
    const [queryFilter, setQueryFilter] = useState("");
    const handleChangePage = (page) => {
        setPage(page);
    }

    const handleSelect = (selected) => {
        setSelected(selected);
    }


    let filterColumns = ["name", "author", "contributor", "description", "publisher"];

    const elements = useMemo(() => {
        if (!queryFilter) return books;
        return books.filter(item => filterColumns.some((key) =>
            item[key].toLowerCase().includes(queryFilter.toLowerCase())))
    }, [queryFilter, books]);


    useEffect(() => {
        const promise = GetBookList(page);
        promise.then(({items, totalPages, page}) => {
            setBooks(items);
            setPage(page);
            setTotalPages(totalPages);
        });
    }, [page]);

    return (
        <>
            <Grid className={mergeClasses(classes.container, !isTabletOrMobile && classes.paddingElements)}>
                <Row>
                    <Col sizeSm={12} sizeMd={12} sizeLg={12} sizeXl={12}>
                        <CardHome/>
                    </Col>
                    <Col sizeSm={12} sizeMd={12} sizeLg={12} sizeXl={12} className={classes.justifyEnd}>
                        <div>
                            <OptionsPage page={page} totalPages={totalPages} handleChangePage={handleChangePage}/>
                        </div>
                        <div className={classes.column}>
                            <Label htmlFor="dynamicFilter">
                                <FormattedMessage id="app.filter" defaultMessage="Dynamic Filter"/>
                            </Label>
                            <Input
                                id="dynamicFilter"
                                contentBefore={<Search24Regular/>}
                                onChange={(_, data) => setQueryFilter(data.value)}/>
                        </div>
                    </Col>
                    <Divider style={{marginBottom: tokens.spacingVerticalMNudge}}/>
                    {elements.length === 0 ?
                        <Col sizeSm={12} sizeMd={12} sizeLg={12} sizeXl={12} className={classes.justifyCenter}>
                            <Image
                                alt="Terms of use Image"
                                src={empty}
                                width={500}
                                heigth={500}/>
                            <Alert intent="error" action="">
                                <FormattedMessage id="app.notFound" defaultMessage="No books to display"/>
                            </Alert>
                        </Col>
                        :
                        elements.map((book) => <BookPreview key={book.id} {...book}
                                                            handleSelected={handleSelect} o
                                                            openReview={openReview}/>
                        )}
                    <Divider style={{marginBottom: tokens.spacingVerticalMNudge}}/>
                    <Col sizeSm={12} sizeMd={12} sizeLg={12} sizeXl={12} className={classes.justifyEnd}>
                        <div>
                            <OptionsPage page={page} totalPages={totalPages} handleChangePage={handleChangePage}/>
                        </div>
                    </Col>
                </Row>
            </Grid>
            <BookReview review={review} closeReview={closeReview} idBook={selected}/>
        </>
    )
}


const OptionsPage = ({page, totalPages, handleChangePage}) => {

    let arrPage = [];
    for (let i = 1; i <= totalPages; i++) {
        arrPage.push(<Button icon={i}
                             style={{marginLeft: tokens.spacingVerticalXS, marginBottom: tokens.spacingVerticalXS}}
                             appearance={i === page ? "primary" : ""}
                             onClick={() => handleChangePage(i)}
                             key={i}/>)
    }
    return arrPage;
}
export default Home