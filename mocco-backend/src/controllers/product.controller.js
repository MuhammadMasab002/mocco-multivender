import catchAsyncErrors from "../middlewares/CatchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Product from "../models/product.model.js";
import Shop from "../models/shop.model.js";

// create product
export const createProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        const sellerId = req.seller.id;

        // 1. Find seller shop
        const shop = await Shop.findOne({ _id: sellerId });

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found for this seller",
            });
        }

        const {
            name,
            description,
            category,
            tags,
            stock,
            price,
            discount_price,
            total_sell,
            sold_out,

        } = req.body;

        // 2. Check if product already exists (same name in same shop)
        const existingProduct = await Product.findOne({
            name,
            shop: shop._id,
        });

        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: "Product already exists in your shop",
            });
        }

        // 3. Handle images (multer gives req.files)
        const images = req.files.map((file) => ({
            public_id: file.filename,
            url: file.path,
        }));

        // 4. Create product
        const product = await Product.create({
            name,
            description,
            category,
            tags: tags ? tags.split(",") : [],
            stock,
            price,
            discount_price,
            images,
            total_sell,
            sold_out,
            shop: shop._id, // link product to shop
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    }
    catch (error) {
        console.error("Error in createProduct:", error);
        return next(
            new ErrorHandler("Failed to create product! " + error.message, 500),
        );
    }
});

export default { createProduct };
