import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./src/config/.env" });

const port = process.env.PORT || 5000;

// create server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
