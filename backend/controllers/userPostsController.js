const axios = require('axios');

const USER_POSTS_API_URL = 'http://localhost:8000/userPosts';

const getUserPosts =async function(req,res,next){
    try {
        const response = await axios.get(USER_POSTS_API_URL);
        const userPosts = response.data;
        res.status(200).json({
            msg:'Get user posts succeed',
            data:userPosts
        })
    } catch (error) {
        next(error)
    }
}

const getUserPostById = async function (req,res,next){
    const id = req.params.post_id;
    if(!id){
        return res.status(400).send('Id is required');
    }
    try {
        const response = await axios.get(`${USER_POSTS_API_URL}/${id}`);
        const userPost = response.data;       
        res.status(200).json({
            msg:'Get user post succeed',
            data:userPost
        })
    } catch (error) {
      next(error)
    }
}

const addUserPost = async function (req,res,next) {
    const newUserPost = req.body;
    if(!newUserPost || Object.keys(newUserPost).length ===0){
        return res.status(400).send('User post is required')
    } 
    try {
        await axios.post(USER_POSTS_API_URL,newUserPost,{
            headers:{"Content-Type":"application/json"}
        })
        res.status(200).json({
            msg:'UserPost is created'
        })
    } catch (error) {
        next(error)
    }
}

const deleteUserPostById = async function (req,res,next) {
    const id = req.params.post_id;
    if(!id){
        return res.status(400).send('Id is required')
    }
    try {
        await axios.delete(`${USER_POSTS_API_URL}/${id}`)
        res.status(200).json({
            msg:'User post is deleted'
        })
    } catch (error) {
        next(error)
    }
}

const updateUserPost = async function (req,res,next) {
    const id = req.params.post_id;
    console.log('hello',id)

    if(!id){
        return res.status(400).send('Id is required')
    }
    const updatedUserPost = req.body;
    try {
        await axios.put(`${USER_POSTS_API_URL}/${id}`,
            updatedUserPost,
            {headers:{"Content-Type":"application/json"}})
        res.status(200).json({
            msg:'User post is updated'
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {getUserPosts,getUserPostById,addUserPost,deleteUserPostById,updateUserPost}