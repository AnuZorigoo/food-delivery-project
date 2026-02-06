import { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema.js";

export const updateAddress: RequestHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { address },
      { new: true },
    ).select("-password");

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
