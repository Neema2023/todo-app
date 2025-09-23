const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔑 Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

// 🔑 Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Check if account is locked
    if (user.isLocked) {
      return res.status(403).json({ message: "Account locked. Contact admin." });
    }

    // 3. Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= 3) {
        user.isLocked = true;
      }
      await user.save();
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 4. Reset failed attempts
    user.failedLoginAttempts = 0;
    await user.save();

    // 5. Generate token
    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
