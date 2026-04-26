import catchAsyncErrors from "../middlewares/CatchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Product from "../models/product.model.js";
import Shop from "../models/shop.model.js";

// create product
const createProduct = catchAsyncErrors(async (req, res, next) => {
    try {

        const shop = req.seller; // get shop from authenticated seller

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

// get all products of a shop
const getShopProducts = catchAsyncErrors(async (req, res, next) => {
    try {
        // 1. Find the shop of the authenticated seller
        const sellerId = req.params.shopId; // Get shopId from route params

        const shop = await Shop.findOne({ _id: sellerId });

        if (!shop) {
            return next(new ErrorHandler("Shop not found for this seller", 404));
        }

        // 2. Find all products for this shop
        const products = await Product.find({ shop: sellerId });

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            products,
        });

    } catch (error) {
        console.error("Error in getShopProducts:", error);
        return next(
            new ErrorHandler("Failed to get products! " + error.message, 500),
        );
    }
});

// delete product by id
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        const productId = req.params.id;

        // 1. Find the product by ID
        const product = await Product.findById(productId);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        // 2. Delete the product
        await Product.findByIdAndDelete(productId);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        return next(
            new ErrorHandler("Failed to delete product! " + error.message, 500),
        );
    }
});

export { createProduct, getShopProducts, deleteProduct };
