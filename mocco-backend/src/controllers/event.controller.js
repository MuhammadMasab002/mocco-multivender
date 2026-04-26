import catchAsyncErrors from "../middlewares/CatchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Event from "../models/event.model.js";

// create event
const createEvent = catchAsyncErrors(async (req, res, next) => {
    try {

        const shop = req.seller; // get shop from authenticated seller

        const {
            name,
            description,
            category,
            startDate,
            endDate,
            status,
            tags,
            stock,
            price,
            discount_price,
            total_sell,
            sold_out,

        } = req.body;

        // 2. Check if product already exists (same name in same shop)
        const existingEvent = await Event.findOne({
            name,
            shop: shop._id,
        });

        if (existingEvent) {
            return res.status(400).json({
                success: false,
                message: "Event already exists in your shop",
            });
        }

        // 3. Handle images (multer gives req.files)
        const images = req.files.map((file) => ({
            public_id: file.filename,
            url: file.path,
        }));

        // 4. Create event
        const event = await Event.create({
            name,
            description,
            category,
            startDate,
            endDate,
            status,
            tags: tags ? tags.split(",") : [],
            stock,
            price,
            discount_price,
            images,
            total_sell,
            sold_out,
            shop: shop._id, // link event to shop
        });

        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            event,
        });
    }
    catch (error) {
        console.error("Error in createEvent:", error);
        return next(
            new ErrorHandler("Failed to create event! " + error.message, 500),
        );
    }
});

export { createEvent };