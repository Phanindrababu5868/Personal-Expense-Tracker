const Transaction = require("../models/Transaction");

// Add Transaction
// method POST
// route /api/transactions

const addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({ ...req.body, user: req.user._id });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get transactions with pagination
// method GET
// route /api/transactions
const getTransactions = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .populate("category")
      .limit(limit)
      .skip(skip);

    const total = await Transaction.countDocuments({ user: req.user._id });

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalTransactions: total,
      transactions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get transaction by ID
// method GET
// route /api/transactions/id
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate(
      "category"
    );
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update transaction by ID
// method PUT
// route /api/transactions/id
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete transaction by ID
// method DELETE
// route /api/transactions/id
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get summary of transactions
// method GET
// route /api/transactions/summary?category=categoryId (optional)
const getTransactionSummary = async (req, res) => {
  const { category } = req.query;

  try {
    const matchCriteria = {
      user: req.user._id, // Filter by the user
    };

    if (category) {
      matchCriteria.category = category; // Filter by category if provided
    }

    const transactions = await Transaction.find(matchCriteria);

    const summary = {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0,
    };

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        summary.totalIncome += transaction.amount;
      } else if (transaction.type === "expense") {
        summary.totalExpenses += transaction.amount;
      }
    });

    summary.balance = summary.totalIncome - summary.totalExpenses;

    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getTransactionSummary,
};
