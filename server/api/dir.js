const express = require("express");
const dirFn = require("../utils/dirFn1");
const router = new express.Router();

router.post("/sendDir", (req, res) => {
  dirFn.dirControl(req, res);
});

router.post("/tp", (req, res) => {
  const { address } = req.body;
  if (address) {
    dirFn.tpDir(address, req, res);
  }
});


module.exports = router;
