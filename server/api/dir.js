const express = require("express");
const dirFn = require("../utils/dirFn");
const router = new express.Router();

router.post("/sendDir", (req, res)=>{
  dirFn.dirControl(req, res);
});



module.exports = router;
