const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const { signup, login, deleteUser } = require("../controllers/user");

router.post("/signup", signup);

router.post("/login", login);
router.delete("/:userId", deleteUser);

module.exports = router;
