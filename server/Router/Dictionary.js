const {
  populateDictionary,
  getAllEntries,
  updateEntry,
  createWordByAdmin,
  createWordByUser,
  deleteEntry
} = require("../controller/Dictionary");

const router = require("express").Router();

router.post("/populate", populateDictionary);
router.get("/all", getAllEntries);
router.put("/update/:id", updateEntry);
router.post("/create/admin", createWordByAdmin);
router.post("/create/user", createWordByUser);
router.delete("/delete/:id", deleteEntry);

module.exports = router;
