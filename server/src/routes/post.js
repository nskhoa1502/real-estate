import express from "express";
import * as postController from "../controllers/post";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/all", postController.getPosts);

router.get("/limit", postController.getPostsLimit);

router.get("/filter", postController.getPostsFilterLimit);

router.get("/new-post", postController.getNewPosts);

router.use(verifyToken);

router.post("/create-new", postController.createNewPost);

export default router;
