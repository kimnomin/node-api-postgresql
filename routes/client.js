const express = require("express");
const router = express.Router();
const clientController = require("./client.controller");

/**
 * 클라이언트 전체 목록을 반환한다.
 */
// router.get("/", clientController.findAll);
router.get("/", clientController.findAllRawQuery);

/**
 * ID에 해당하는 클라이언트 정보를 반환한다.
 */
router.get("/:id", clientController.findOneById);

/**
 * 클라이언트 정보를 입력한다.
 */
router.post("/", clientController.create);

/**
 * 클라이언트 정보를 삭제한다.
 */
router.delete("/:id", clientController.destory);

module.exports = router;
