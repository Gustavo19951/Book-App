import {useEffect, useState} from "react";
import {FullListLike, GetDetailBook} from "../../services/bookServices/BookService.jsx";
import {
    AvatarGroup,
    AvatarGroupItem,
    AvatarGroupPopover,
    Badge,
    Button,
    Divider,
    Image,
    makeStyles,
    partitionAvatarGroupItems,
    Persona,
    Spinner,
    Text,
    Tooltip
} from "@fluentui/react-components";
import {FormattedMessage} from "react-intl";

const useStyles = makeStyles({
    centerElements: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "93vh",
    },
    column: {
        display: "flex",
        flexDirection: "column",
        rowGap: "7px"
    }
})
const DetailsBook = ({idBook}) => {
    const classes = useStyles();

    const [data, setData] = useState(undefined);
    const [likes, setLikes] = useState(undefined);

    useEffect(() => {
        const promiseDetails = GetDetailBook(idBook);
        promiseDetails.then((res) => {
            setData(res);
        });
        const promiseLikes = FullListLike(idBook);
        promiseLikes.then((res) => {
            setLikes(res.map(({expand}) => expand?.user?.name !== '' ? expand?.user?.name : expand?.user?.email.split('@')[0]))
        });
    }, [])

    if (!data || !likes) {
        return (
            <div className={classes.centerElements}>
                <Spinner size="huge"/>
            </div>);
    }


    const buyLinks = data.buy_links.buy_Links;

    const partitionedItems = partitionAvatarGroupItems({items: likes});

    return (
        <div className={classes.column}>
            <Image
                alt={data.name}
                shape="rounded"
                fit="cover"
                src={data.book_image}
                height={400}
                width={250}
            />
            <Text size={600} weight="semibold">{data.name}</Text>
            <Text size={400} weight="semibold">
                <FormattedMessage id="app.book.like" defaultMessage="Likes"/>
            </Text>
            {partitionedItems.inlineItems.length === 0 && <Badge>No Likes</Badge>}
            <AvatarGroup layout="stack" key="group">
                {partitionedItems.inlineItems.map((name) => (
                    <Tooltip content={name} key={name} relationship="label">
                        <AvatarGroupItem name={name}/>
                    </Tooltip>
                ))}
                {partitionedItems.overflowItems && (
                    <AvatarGroupPopover>
                        {partitionedItems.overflowItems.map((name) => (
                            <Tooltip content={name} key={name} relationship="label">
                                <AvatarGroupItem name={name}/>
                            </Tooltip>
                        ))}
                    </AvatarGroupPopover>
                )}
            </AvatarGroup>
            <Text size={400} weight="semibold">
                <FormattedMessage id="app.book.description" defaultMessage="Description"/>
            </Text>
            <Text align="justify">{data.description}</Text>
            <Text size={400} weight="semibold">
                <FormattedMessage id="app.book.author" defaultMessage="Author"/>
            </Text>
            <Persona
                size="small"
                name={data.author}
                avatar={{color: "colorful"}}
            />
            <Text size={400} weight="semibold">
                <FormattedMessage id="app.book.contributor" defaultMessage="Contributor"/>
            </Text>
            <Text align="justify">{data.contributor}</Text>
            <Text size={400} weight="semibold">
                <FormattedMessage id="app.book.publisher" defaultMessage="Publisher"/>
            </Text>
            <Text align="justify">{data.publisher}</Text>
            <Text size={400} weight="semibold">
                <FormattedMessage id="app.book.globalRank" defaultMessage="Global Rank"/>
            </Text>
            <Badge>{data.rank}</Badge>
            <Divider/>
            <Text size={400} weight="semibold">
                <FormattedMessage id="app.book.shop" defaultMessage="Shop Options"/>
            </Text>
            {buyLinks.map(({name, url}) => <Button key={name} onClick={() => {
                window.location.href = url;
            }}>{name}</Button>)}
        </div>
    )
}

export default DetailsBook