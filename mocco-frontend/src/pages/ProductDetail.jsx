import React, { useEffect, useState } from "react";
import ProductDetailInfo from "../components/common/products/ProductDetailInfo";
import { useNavigate, useParams, Link } from "react-router-dom";
import ProductCard from "../components/common/products/ProductCard";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details"); // 'details', 'reviews', 'seller'

  // Fetch single product dynamically
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${backendUrl}/product/detail/${productId}`,
        );
        setCurrentProduct(data?.product);
        setRelatedProducts(data?.relatedProducts || []);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setCurrentProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [productId]);

  // We no longer need to compute related products locally since the backend reliably returns them.

  const handleRelatedProductClick = (nextProductId) => {
    navigate(`/product-detail/${nextProductId}`);
  };

  if (!productId) return null;

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-20 text-slate-500">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Product Not Found
        </h1>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          We couldn't locate the product you're looking for. It may have been
          removed or the link is broken.
        </p>
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
        >
          Explore All Products
        </button>
      </section>
    );
  }

  const imageUrl =
    currentProduct?.images?.[0]?.url ||
    currentProduct?.images?.[0]?.public_id ||
    "https://dummyimage.com/600x400/e2e8f0/64748b.png&text=No+Image";

  return (
    <div className="bg-white">
      {/* Top Product Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          {/* LEFT: Product Image Gallery (Simple) */}
          <div className="w-full flex flex-col gap-4">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={imageUrl}
                alt={currentProduct?.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnails placeholder if multiple images existed */}
            {currentProduct?.images?.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {currentProduct.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 cursor-pointer hover:ring-2 ring-slate-900 transition-all"
                  >
                    <img src={img.url} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Details Info */}
          <ProductDetailInfo
            title={currentProduct?.name}
            reviews={currentProduct?.reviews?.length || 0}
            description={currentProduct?.description}
            price={Number(
              currentProduct?.discount_price || currentProduct?.price || 0,
            )}
            quantity={quantity}
            setQuantity={setQuantity}
            stock={currentProduct?.stock || 100}
          />
        </div>
      </section>

      {/* Tabs Section */}
      <section className="w-full bg-slate-50 border-y border-slate-200/60 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center border-b border-slate-200">
            <nav className="-mb-px flex space-x-8 sm:space-x-12">
              {["details", "reviews", "seller"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors
                                ${
                                  activeTab === tab
                                    ? "border-slate-900 text-slate-900"
                                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                                }
                            `}
                >
                  {tab === "details" && "Product Details"}
                  {tab === "reviews" && "Product Reviews"}
                  {tab === "seller" && "Seller Information"}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-10 min-h-62.5">
            {/* Details Tab */}
            {activeTab === "details" && (
              <div className="prose prose-slate max-w-none text-slate-600 font-light leading-relaxed">
                <p>
                  {currentProduct?.description ||
                    "No specific details provided for this product."}
                </p>
                {currentProduct?.tags && currentProduct.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {currentProduct.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                {currentProduct?.reviews &&
                currentProduct.reviews.length > 0 ? (
                  currentProduct.reviews.map((review, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4"
                    >
                      <div className="h-12 w-12 rounded-full bg-slate-200 shrink-0 overflow-hidden flex items-center justify-center text-slate-500 font-bold">
                        {review?.user?.name?.[0] || "U"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-slate-800">
                            {review?.user?.name || "Anonymous"}
                          </h4>
                          <span className="text-amber-500 text-sm font-medium ml-2">
                            ★ {review?.rating?.toFixed(1)}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {review?.comment || "No comment."}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <p>
                      No reviews yet for this product. Be the first to buy and
                      share your experience!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Seller Tab */}
            {activeTab === "seller" && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                <div className="w-24 h-24 shrink-0 rounded-full border border-slate-200 shadow-inner overflow-hidden bg-slate-100">
                  <img
                    src={
                      currentProduct?.shop?.avatar?.url ||
                      currentProduct?.shop?.avatar ||
                      "https://dummyimage.com/150x150/e2e8f0/64748b.png&text=Shop"
                    }
                    alt={currentProduct?.shop?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {currentProduct?.shop?.name || "Unknown Seller"}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    {currentProduct?.shop?.description ||
                      "A trusted vendor providing great products."}
                  </p>
                  {currentProduct?.shop?._id && (
                    <Link
                      to={`/shop/${currentProduct.shop._id}`}
                      className="inline-flex px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      Visit Full Shop
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-2 mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
              Recommended For You
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Related Products
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product?._id || product?.id}
                product={product}
                handleClick={handleRelatedProductClick}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
