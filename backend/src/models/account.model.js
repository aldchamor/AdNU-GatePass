import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const accountSchema = new Schema(
    {
        accountEmailAddress: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        accountPassword: {
            type: String,
            required: true,
            // Per data dictionary, password length is 255 [cite: 79]
        }
    },
    {
        timestamps: true
    }
);

// Pre-save hook to hash the password
accountSchema.pre("save", async function () {
    if (!this.isModified("accountPassword")) return;

    this.accountPassword = await bcrypt.hash(this.accountPassword, 10);
});

// Method to compare passwords
accountSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.accountPassword);
};

export const Account = mongoose.model("Account", accountSchema);