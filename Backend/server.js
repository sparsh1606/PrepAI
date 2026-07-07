import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/utils/database.js"

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})