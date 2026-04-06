// Create token and save in cookies - Generic function for all entity types (user, shop, admin, etc.)
const sendToken = (payload, statusCode, res, entityName = "user") => {
  // Handle case where payload might not have getJwtToken method
  if (!payload || typeof payload.getJwtToken !== "function") {
    return res.status(500).json({
      success: false,
      message: "Invalid payload: Must have getJwtToken method",
    });
  }

  const token = payload.getJwtToken();

  const isProduction =
    process.env.VERCEL === "1" ||
    String(process.env.NODE_ENV || "").toLowerCase() === "production";

  // Options for cookies - consistent across all entity types
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  };

  // Convert payload to plain object and remove sensitive fields
  const payloadObj = payload.toObject ? payload.toObject() : payload;
  delete payloadObj.password;

  // Use dynamic entity name in response (user, shop, admin, etc.)
  res.status(statusCode).cookie(`${entityName}_token`, token, options).json({
    success: true,
    [entityName]: payloadObj,
  });
};

export default sendToken;
