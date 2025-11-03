import express from "express";

const router = express.Router();

router.get("/send", (req, res) => {
    res.send("Message send Route");
})
router.get("/receive", (req, res) => {
    res.send("Message receive Route");
})

export default router;