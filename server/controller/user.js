const User = require("../Model/User");

const handleAvatarChange = async (req, res) => {
  const { avatar } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.avatar = avatar;
    await user.save();

    return res.status(200).json({ message: "Avatar updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating avatar" });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { name, email, role } = data.data;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating user" });
  }
};

module.exports = {
  handleAvatarChange,
  updateUser,
};
