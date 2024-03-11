const express = require("express");
const {
  handleGetAllUsers,
  handlegetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

router.get("/", handleGetAllUsers);

//routes
// router.get("/users", async(req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//       <ul>
//       ${allDbUsers.map((user) => `<li>${user.firstName}-${user.email}</li>`).join("")}
//       </ul>
//       `;
//     res.send(html);
//   });

router
  .route("/:id")
  .get(handlegetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

router.post("/", handleCreateNewUser);

module.exports = router;
