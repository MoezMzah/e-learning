const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
//route Post api/users
//desc Create a post
//access private
router.post("/", [auth, [check("text", "Text is Required").not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select("-password");
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        });
        const post = await newPost.save();
        res.send(post);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

//route get api/posts
//desc get all posts
//access private
router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});
//desc get post by id
//access private
router.get("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "post not found" });
        }
        res.json(post);
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({ msg: "post not found" });
        }
        res.status(500).send("Server Error");
    }
});

//desc delete post by id
//access private
router.delete("/:id",auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "post not found" });
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "user not authorized" });
        }
        await post.remove();
        res.json({ msg: "Post removed" });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({ msg: "post not found" });
        }

        res.status(500).send("Server Error");
    }
});
//desc like one post
//access private
router.put("/like/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: "Post already liked" });
        }

        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

//desc dislike one post
//access private
router.put("/unlike/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: "Post has not been liked yet " });
        }

        const removeindex = post.likes.map((like) => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeindex, 1);
        await post.save();
        res.status(200).json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.json(error);
    }
});

// publish a comment
// access private
router.post("/comment/:id", [auth, [check("text", "Text is Required").not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select("-password");
        const post = await Post.findById(req.params.id);
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        };
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});
// delete a comment
//access private
router.delete("/comment/:id/:commentId", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment => comment.id === req.params.commentId);
        if (!comment) {
            return res.status(404).json({ msg: "comment does not exist" });
        }
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "user not authorized" });
        }
        newComments= post.comments.filter(
            comment  => comment.id !== req.params.commentId
          );
        await newComments.save();
        res.json(newComments);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;
