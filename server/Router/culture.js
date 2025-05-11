const express = require("express");
const {
  createCultureByAdmin,
  createCultureByUser,
  getAllCultures,
  getCultureById,
  updateCulture,
  deleteCulture,
} = require("../controller/culture");

const router = express.Router();

router.post("/culture/create/admin", createCultureByAdmin);
router.post("/culture/create/user", createCultureByUser);
router.get("/get/all", getAllCultures);
router.get("/culture/get/:id", getCultureById);
router.put("/culture/update/:id", updateCulture);
router.delete("/culture/delete/:id", deleteCulture);

module.exports = router;
