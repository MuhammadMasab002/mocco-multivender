import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ProductDetailInfo from "../components/common/products/ProductDetailInfo";
import { useNavigate, useParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/common/products/ProductCard";

const normalizeCategory = (value = "") =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();

const singularizeWords = (value = "") =>
  value
    .split(" ")
    .map((word) =>
      word.endsWith("s") && word.length > 3 ? word.slice(0, -1) : word,
    )
    .join(" ");

export const ProductDetail = () => {
  // get product id from route params
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products: sellerProducts } = useSelector((state) => state.product);

  const [quantity, setQuantity] = useState(1);
  const products = useMemo(() => {
    const storeProducts = Array.isArray(sellerProducts) ? sellerProducts : [];
    const staticProducts = Array.isArray(productData) ? productData : [];

    return storeProducts.length > 0 ? storeProducts : staticProducts;
  }, [sellerProducts]);

  const currentProduct = useMemo(() => {
    if (!productId) return null;

    return (
      products.find(
        (product) => String(product?._id || product?.id) === String(productId),
      ) ||
      null
    );
  }, [productId, products]);

  const relatedProducts = useMemo(() => {
    if (!currentProduct) return [];

    const currentCategoryNorm = normalizeCategory(
      currentProduct?.category || "",
    );
    const currentCategorySingular = singularizeWords(currentCategoryNorm);

    const sameCategoryProducts = products.filter((product) => {
      if (
        String(product?._id || product?.id) ===
        String(currentProduct?._id || currentProduct?.id)
      )
        return false;

      const productCategoryNorm = normalizeCategory(product?.category || "");
      const productCategorySingular = singularizeWords(productCategoryNorm);

      return (
        productCategoryNorm &&
        (productCategoryNorm.includes(currentCategoryNorm) ||
          currentCategoryNorm.includes(productCategoryNorm) ||
          productCategorySingular.includes(currentCategorySingular) ||
          currentCategorySingular.includes(productCategorySingular))
      );
    });

    if (sameCategoryProducts.length > 0) {
      return sameCategoryProducts.slice(0, 4);
    }

    return products
      .filter(
        (product) =>
          String(product?._id || product?.id) !==
          String(currentProduct?._id || currentProduct?.id),
      )
      .sort((a, b) => Number(b?.total_sell || 0) - Number(a?.total_sell || 0))
      .slice(0, 4);
  }, [currentProduct, products]);

  const handleRelatedProductClick = (nextProductId) => {
    navigate(`/product-detail/${nextProductId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!productId) return null;

  if (!currentProduct) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Product not found
        </h1>
        <p className="text-gray-600 mb-6">
          We could not find this product. Explore the full product collection.
        </p>
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="px-5 py-2.5 rounded-md bg-black text-white hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Browse Products
        </button>
      </section>
    );
  }

  return (
    <>
      <div className="w-full text-black max-w-6xl mx-auto sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: Product Image */}
        <div className="w-full flex justify-center">
          <img
            src={
              currentProduct?.images?.[0]?.url ||
              currentProduct?.image_Url?.[0]?.url ||
              ""
            }
            alt={currentProduct?.name}
            className="w-full max-w-md rounded shadow"
          />
        </div>

        {/* RIGHT: Details Info */}
        <ProductDetailInfo
          title={currentProduct?.name}
          // rating={4}
          reviews={currentProduct?.reviews?.length || 1}
          description={
            currentProduct?.description ??
            "All black Nike sneakers, get a free legit check in the SOLESTAGE app now. "
          }
          price={Number(
            currentProduct?.discount_price || currentProduct?.price || 0,
          )}
          colours={["bg-gray-900", "bg-red-500"]}
          sizes={["XS", "S", "M", "L", "XL"]}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
      {/* Related Products */}
      <div className="w-full h-full justify-center items-center flex flex-col gap-4 my-10">
        <section className="w-full max-w-7xl px-3 sm:px-5 lg:py-10 md:py-8 py-6 space-y-8 sm:space-y-12">
          <div className="text-center space-y-2">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500">
              Recommended For You
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Related Products
            </h2>
          </div>

          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product?.id}
                  product={product}
                  handleClick={handleRelatedProductClick}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-600">
              No related products available right now.
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default ProductDetail;
