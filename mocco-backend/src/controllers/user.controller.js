// register user controller
import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("User already exists!", 400));
    }

    // Handle avatar upload
    const fileName = req.file?.filename;

    // Create user object
    const user = {
      name,
      email,
      password,
      avatar: {
        public_id: fileName || "default-avatar",
        url: fileName
          ? `/uploads/${fileName}`
          : "https://dummyimage.com/200x200/e2e8f0/64748b.png&text=User",
      },
    };

    // Create new user
    const createdUser = await User.create(user);
    const newUser = await User.findById(createdUser._id).select("-password");

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return next(
      new ErrorHandler("Failed to register user! " + error.message, 500),
    );
  }
};

export { registerUser };
