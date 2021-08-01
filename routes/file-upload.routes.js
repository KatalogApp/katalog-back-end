const express = require('express');
const router = express.Router();
const uploadCloud = require('../configs/cloudinary.config');
router.post('/upload', uploadCloud.single('imageUrl'), (req, res, next) => {
  console.log('file is: ', req.file);
  try {
    res.json({ secure_url: req.file.path });
  } catch (err) {
    res.json(err);
  }
});
module.exports = router;