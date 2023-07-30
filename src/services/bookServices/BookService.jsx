import {pb} from "../ConfigServices"


export const GetBookList = async (page) => {
    return await pb.collection('books').getList(page, 30);
}
export const FullListLike = async (idBook) => {
    return await pb.collection('likeBook').getFullList({
        filter: `book="${idBook}"`,
        $autoCancel: false,
        expand: "user"
    });
}
export const AddLikeBook = async (book, user) => {
    return await pb.collection('likeBook').create({book, user});
}
export const RemoveLikeBook = async (idLike) => {
    return await pb.collection('likeBook').delete(idLike);
}
export const GetDetailBook = async (idBook) => {
    return await pb.collection('books').getOne(idBook);
}
export const PublishCommentBook = async (data) => {
    return await pb.collection('reviewBook').create(data);
}
export const EditCommentBook = async (id, data) => {
    return await pb.collection('reviewBook').update(id, data);
}
export const DeleteCommentBook = async (id) => {
    return await pb.collection('reviewBook').delete(id);
}
export const FullListComments = async (idBook) => {
    return await pb.collection('reviewBook').getFullList({
        filter: `book="${idBook}"`,
        $autoCancel: false,
        expand: "user",
        sort: "-created"
    });
}