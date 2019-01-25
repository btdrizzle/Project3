const router = require("express").Router();
const db = require("../models");

router.post("/weather", (req, res) => {
    const info = req.body;
    console.log(info);

    db.Weather.create({name: info.name })
        .then((data) => {
            res.status(200).json(data);
        }).catch(err => console.log(err));
});

module.exports = router;
