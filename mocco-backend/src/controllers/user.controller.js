// register user controller
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/jwtToken.js";

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

    // create activation token
    const activationToken = createActivationToken(user);
    const activationUrl = `${process.env.FRONTEND_URL}/activate/${activationToken}`;

    // Send activation email
    try {
      await sendMail({
        email: user.email,
        subject: "Activate Your Mocco Account",
        message: `Hello ${user.name},\n\nPlease click the following link to activate your account:\n\n${activationUrl}\n\nIf you did not create this account, please ignore this email.\n\nBest regards,\nMocco Team`,
      });
      // response to frontend
      res.status(201).json({
        success: true,
        message: `Registration successful! Please check your email:- ${user.email} first, to activate your account.`,
      });
    } catch (error) {
      console.error("Error sending activation email:", error);
      return next(
        new ErrorHandler(
          "Failed to send activation email! " + error.message,
          500,
        ),
      );
    }

    // Create new user
  } catch (error) {
    console.error("Error in registerUser:", error);
    return next(
      new ErrorHandler("Failed to register user! " + error.message, 500),
    );
  }
};

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_TOKEN_SECRET_KEY, {
    expiresIn: process.env.EXPIRES_ACTIVATION_TOKEN,
  });
};

// activate user account
const activateUserEmail = async (req, res, next) => {
  try {
    const { token } = req.body;

    const decodedToken = jwt.verify(
      token,
      process.env.ACTIVATION_TOKEN_SECRET_KEY,
    );

    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      return next(new ErrorHandler("Invalid activation token!", 400));
    }

    // user.isActivated = true;
    // await user.save();

    // Create new user
    const createdUser = await User.create(user);

    sendToken({ user: createdUser }, 201, res);
  } catch (error) {
    console.error("Error in activateUserEmail:", error);
    return next(
      new ErrorHandler(
        "Failed to activate user account! " + error.message,
        500,
      ),
    );
  }
};

export { registerUser, activateUserEmail };
