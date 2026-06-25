// register user controller
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/jwtToken.js";
import { createActivationToken } from "../utils/createToken.js";
import catchAsyncErrors from "../middlewares/CatchAsyncErrors.js";

const registerUser = catchAsyncErrors(async (req, res, next) => {
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
});

// activate user account
const activateUserEmail = catchAsyncErrors(async (req, res, next) => {
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

    sendToken(createdUser, 201, res, "user");
  } catch (error) {
    console.error("Error in activateUserEmail:", error);
    return next(
      new ErrorHandler(
        "Failed to activate user account! " + error.message,
        500,
      ),
    );
  }
});

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

    sendToken(user, 200, res, "user");

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
    res.clearCookie("user_token", {
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

// update user profile
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, phoneNumber, currentPassword } = req.body;

    if (!currentPassword) {
      return next(new ErrorHandler("Please enter your current password to update profile", 400));
    }

    const user = await User.findById(req.user._id).select("+password");

    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid current password", 400));
    }

    // if (req.file) {
    //   const fileName = req.file.filename;
    //   user.avatar = {
    //     public_id: fileName,
    //     url: `/uploads/${fileName}`,
    //   };
    // }

    // Update only the fields that are provided in the request body
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        phoneNumber,
      },
      { returnDocument: 'after', runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return next(new ErrorHandler("Failed to update profile! " + error.message, 500));
  }
});

// update user password
const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // 1. Validate incoming fields
    if (!oldPassword || !newPassword) {
      return next(new ErrorHandler("Please enter old and new password", 400));
    }

    // 2. Fetch user explicitly selecting the hidden password field
    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // 3. Verify old password matches current hash
    const isPasswordValid = await user.comparePassword(oldPassword);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid old password", 400));
    }

    // 4. Update the password field
    user.password = newPassword;

    // 5. Save document (Triggers the pre-save schema bcrypt hook)
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    // Forward database errors directly to global middleware
    return next(error);
  }
};

// add user address
const addAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const { country, state, city, address1, address2, zipCode, addressType } = req.body;

    // Validate required fields
    if (!country || !state || !city || !address1 || !zipCode || !addressType) {
      return next(new ErrorHandler("Please enter all required address fields", 400));
    }

    // Check for an existing duplicate address matching critical fields
    const isDuplicate = await User.findOne({
      _id: req.user._id,
      addresses: {
        $elemMatch: {
          country,
          state,
          city,
          address1,
          zipCode,
        },
      },
    });

    if (isDuplicate) {
      return next(new ErrorHandler("Address already exists", 400));
    }

    const newAddress = {
      country,
      state,
      city,
      address1,
      address2: address2 || "",
      zipCode,
      addressType,
    };

    // Atomically push the new address and return the updated user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { addresses: newAddress } },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedUser) {
      return next(new ErrorHandler("User not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Address added successfully",
      user: updatedUser,
    });

  } catch (error) {
    // Pass the database/runtime error directly to your global error handler
    return next(new ErrorHandler("Failed to add address! " + error.message, 500));
  }
});

// delete user address
const deleteAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const addressId = req.params.id;

    // Atomically pull the address object matching the subdocument ID
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { addresses: { _id: addressId } } },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedUser) {
      return next(new ErrorHandler("User not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      user: updatedUser,
    });

  } catch (error) {
    // Pass any errors safely to your error handling middleware
    return next(new ErrorHandler("Failed to delete address! " + error.message, 500));
  }
});


export {
  registerUser,
  activateUserEmail,
  loginUser,
  getUser,
  logoutUser,
  updateProfile,
  updatePassword,
  addAddress,
  deleteAddress
};
