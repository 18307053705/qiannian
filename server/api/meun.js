const express = require("express");

const meun = require('../meun');

const router = new express.Router();
router.get("/getMeunList", (req, res) => {
  res.send({
    code: 0,
    error: "",
    msg: "",
    data: meun
  });
});

module.exports = router;
