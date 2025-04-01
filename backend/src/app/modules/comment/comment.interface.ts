export interface ICommentsByVideoId {
    videoId: string
}


export interface ICreateComment {
    videoId: string,
    comment: string
}

export interface IUpdateComment {
    commentId: string,
    comment: string
}
