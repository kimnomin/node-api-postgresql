const express = require("express");
const router = express.Router();
const clientController = require("./client.controller");

// router.get("/", clientController.findAll);
router.get("/", clientController.findAllRawQuery);

router.get("/:id", clientController.findOneById);

router.post("/", clientController.create);

router.delete("/:id", clientController.destory);

module.exports = router;
