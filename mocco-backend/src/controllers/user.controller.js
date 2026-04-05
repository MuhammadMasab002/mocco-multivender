// register user controller
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/jwtToken.js";
import { createActivationToken } from "../utils/createToken.js";

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

// activate user account
const activateUserEmail = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return next(new ErrorHandler("Activation token is required!", 400));
    }

    const activationSecret =
      process.env.ACTIVATION_TOKEN_SECRET_KEY || process.env.JWT_SECRET_KEY;

    const decodedToken = jwt.verify(token, activationSecret);

    const existingUser = await User.findOne({ email: decodedToken.email });

    if (existingUser) {
      return next(new ErrorHandler("User already activated!", 400));
    }

    const createdUser = await User.create({
      name: decodedToken.name,
      email: decodedToken.email,
      password: decodedToken.password,
      avatar: decodedToken.avatar,
    });

    sendToken(createdUser, 201, res);
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

// login user controller is handled in auth.controller.js
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please enter all fields!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password!", 401));
    }

    if (!user.password) {
      return next(new ErrorHandler("Invalid email or password!", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password!", 401));
    }

    sendToken(user, 200, res);

  } catch (error) {
    console.error("Error in loginUser:", error);
    return next(
      new ErrorHandler(
        "Failed to login user! " + error.message,
        500,
      ),
    );
  }
}

// get user profile/data
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    // error 
    if (!user) {
      return next(new ErrorHandler("User not found!", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in getUser:", error);
    return next(
      new ErrorHandler(
        "Failed to fetch user profile! " + error.message,
        500,
      ),
    );
  }
};

// log out user 
const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully!",
    });
  } catch (error) {
    console.error("Error in logoutUser:", error);
    return next(
      new ErrorHandler(
        "Failed to logout user! " + error.message,
        500,
      ),
    );
  }
};

export { registerUser, activateUserEmail, loginUser, getUser, logoutUser };
