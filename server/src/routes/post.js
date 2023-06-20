import express from "express";
import * as postController from "../controllers/post";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/all", postController.getPosts);

router.get("/limit", postController.getPostsLimit);

router.get("/filter", postController.getPostsFilterLimit);

router.get("/new-post", postController.getNewPosts);
router.get("/post-detail/:postId", postController.getOnePost);

router.use(verifyToken);

router.get("/post-admin", postController.getPostsAdmin);
router.post("/create-new", postController.createNewPost);
router.put("/update", postController.updatePost);
router.delete("/delete", postController.deletePost);

export default router;
