import { getBotReply } from "../services/botLogic.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiErrors.js";

export const handleChat = asyncHandler(async (req, res) => {
    const { message, siteURL } = req.body;

    if (!message) {
        throw new ApiError(400, "Message is required");
    }


    const reply = await getBotReply(message, siteURL);

    return res.json(new ApiResponse(200, { reply }, "Reply generated"));
});
