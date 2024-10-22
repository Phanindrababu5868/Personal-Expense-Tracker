const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactions");
const userRoutes = require("./routes/user");
const categoriesRoutes = require("./routes/category");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoriesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
