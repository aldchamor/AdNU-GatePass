import { Account } from "../models/account.model.js";

const registerAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        // Check if account already exists using the schema field name
        const existing = await Account.findOne({ accountEmailAddress: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "Account already exists!" });
        }

        // Create account
        const account = await Account.create({
            accountEmailAddress: email.toLowerCase(),
            accountPassword: password, // The model handles hashing via pre-save hook
        });

        res.status(201).json({
            message: "Account registered!",
            account: { id: account._id, email: account.accountEmailAddress }
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const loginAccount = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find account by email address
        const account = await Account.findOne({
            accountEmailAddress: email.toLowerCase()
        });

        if (!account) return res.status(400).json({ message: "Account not found" });

        // Compare passwords using the method defined in your account.model
        const isMatch = await account.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({
            message: "Account logged in",
            account: { id: account._id, email: account.accountEmailAddress }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const logoutAccount = async (req, res) => {
    // Logout typically involves clearing a token/cookie on the frontend
    res.status(200).json({ message: "Logged out successful" });
};

export {
    registerAccount,
    loginAccount,
    logoutAccount
};