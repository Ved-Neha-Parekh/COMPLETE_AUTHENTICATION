import app from "./src/app.js";
import dotenv from "./src/configs/env.js";
import connectDB from "./src/configs/database.js";

const PORT = dotenv.PORT || 8081;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
  });
