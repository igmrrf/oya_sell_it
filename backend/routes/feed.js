// Create feeds
// Modify Feeds
// Get all feeds
// Get all personal feeds
// Delete Feed

const express = require("express");
const router = express.Router();
const debug = require("debug")("app:route:feed");
const { Feed, validate } = require("../models/Feed");

router.post("/", async (req, res) => {
  const { title, price, descripton, images } = req.body;
  const error = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ ok: false, message: error.details[0].message });
  debug("Details Validated");

  const feed = new Feed({
    userId: req.user._id,
    title,
    price,
    descripton,
    images,
  });
  await feed.save();
  debug("Feed Successfully Uploaded");

  return res
    .status(200)
    .send({ ok: true, data: feed, message: "Feed Successfully uploaded" });
});

router.patch("/:id", async(req,res)=>{
    const {id} = req.params
    const feed = Feed.fineOne(                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             kh j{})
})

router.get("/", async (req, res) => {
  const feeds = Feed.findAll();
  if (!feeds)
    return res.send(400).send({ ok: false, message: "No Feed Found" });
  debug("Error or database empty");

  return res.send({
    ok: true,
    data: feeds,
    message: "Feeds successfully querried",
  });
});
