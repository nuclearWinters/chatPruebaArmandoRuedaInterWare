import { FETCH_POSTS, NEW_POSTS, CLEAN_POST } from "./types"

export const fetchPosts = () => dispatch => {
    fetch('https://huc2m17au1.execute-api.us-west-2.amazonaws.com/production/messages')
    .then((response) => response.json())
    .then((posts) => dispatch({
        type: FETCH_POSTS,
        payload: posts.messages
    }));
}

export const createPost = (postData) => dispatch => {
    dispatch({
        type: NEW_POSTS,
        payload: {
            user: {
                name: "Bender", 
                username: "bender", 
                id: 1
            }, 
            receiver_id: 2,
            message: postData,
            date: new Date()
        }
    })
}

export const cleanPost = () => dispatch => {
    dispatch({
        type: CLEAN_POST
    })
}