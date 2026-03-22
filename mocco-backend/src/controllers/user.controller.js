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

    const fileName = req.file ? req.file.filename : null;
    const fileUrl = fileName ? `/uploads/${fileName}` : null;

    const user = {
      name,
      email,
      password,
      avatar: fileUrl,
    };

    // Create new user
    const newUser = await User.create(user);

    res
      .status(201)
      .json({
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
