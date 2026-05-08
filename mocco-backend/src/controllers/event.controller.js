import catchAsyncErrors from "../middlewares/CatchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Event from "../models/event.model.js";
import Shop from "../models/shop.model.js";

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

// get all events for a shop
const getShopEvents = catchAsyncErrors(async (req, res, next) => {
    try {
        // 1. Find the shop of the authenticated seller
        const sellerId = req.params.shopId; // Get shopId from route params

        const shop = await Shop.findOne({ _id: sellerId });

        if (!shop) {
            return next(new ErrorHandler("Shop not found for this seller", 404));
        }

        const events = await Event.find({ shop: sellerId });

        return res.status(200).json({
            success: true,
            events,
        });

    } catch (error) {
        console.error("Error in getShopEvents:", error);
        return next(
            new ErrorHandler("Failed to fetch events! " + error.message, 500)
        );
    }
});

export { createEvent, getShopEvents };