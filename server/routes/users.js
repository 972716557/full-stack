import express from "express";

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.status(200).json({message: 'users'})
});

module.exports = router;
