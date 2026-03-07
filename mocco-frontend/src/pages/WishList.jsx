import React from "react";
import ProductCard from "../components/common/products/ProductCard";
import CustomButton from "../components/common/CustomButton";
// import { ShoppingCart, Trash2, Eye, Star } from "lucide-react";

const Wishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      title: "Gucci duffle bag",
      price: "960",
      oldPrice: "1160",
      discount: "-35%",
      badge: "New",
      isWishlisted: true,
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      title: "RGB liquid CPU Cooler",
      price: "1960",
      oldPrice: "0",
      discount: "20",
      badge: "New",
      isWishlisted: true,
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      title: "GP11 Shooter USB Gamepad",
      price: "550",
      oldPrice: "0",
      discount: "33",
      badge: "New",
      isWishlisted: true,
      image:
        "https://images.unsplash.com/photo-1661276503896-aa8b017f8914?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Quilted Satin Jacket",
      price: "750",
      oldPrice: "0",
      discount: "18",
      badge: "New",
      isWishlisted: true,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    },
  ];

  const justForYouItems = [
    {
      id: 1,
      title: "ASUS FHD Gaming Laptop",
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
      price: "960",
      oldPrice: "1012",
      badge: "New",
      discount: "14",
      isWishlisted: true,
      isNew: false,
    },
    {
      id: 2,
      title: "IPS LCD Gaming Monitor",
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
      price: "1160",
      oldPrice: "1300",
      badge: "New",
      discount: "23",
      isWishlisted: false,
      isNew: true,
    },
    {
      id: 3,
      title: "HAVIT HV-G92 Gamepad",
      image:
        "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=400&h=400&fit=crop",
      price: "560",
      oldPrice: "621",
      badge: "New",
      discount: "12",
      isWishlisted: false,
      isNew: true,
    },
    {
      id: 4,
      title: "AK-900 Wired Keyboard",
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
      price: "200",
      oldPrice: "277",
      badge: "New",
      discount: "40",
      isWishlisted: true,
      isNew: true,
    },
  ];

  //   const handleMoveAllToBag = () => {
  //     alert("Moving all items to bag!");
  //   };

  //   const handleDeleteItem = (id) => {
  //     console.log("Delete item:", id);
  //   };

  //   const handleAddToCart = (name) => {
  //     alert(`Added ${name} to cart!`);
  //   };

  //   const renderStars = (rating) => {
  //     return [...Array(5)].map((_, index) => (
  //       <Star
  //         key={index}
  //         className={`w-4 h-4 ${
  //           index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
  //         }`}
  //       />
  //     ));
  //   };

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Wishlist Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-xl font-medium text-black">
                Wishlist ({wishlistItems.length})
              </h1>
            </div>

            <div className="flex justify-center items-center gap-4">
              <CustomButton
                buttonText={"Move All To Bag"}
                variant={"secondary"}
              />
            </div>
          </div>

          {/* Wishlist Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {wishlistItems.map((item) => (
              <ProductCard
                key={item.id}
                {...item}
                toggleWishlist={() => alert("Addedd to wishlist")}
                onAddToCart={() => alert("Added to cart")}
              />
            ))}
          </div>

          {/* Just For You Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 text-black">
                  <div className="w-1 h-10 bg-red-500 rounded"></div>
                  <h1 className="text-xl font-medium text-black">
                    Just For You
                  </h1>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4">
                <CustomButton buttonText={"See All"} variant={"textDanger"} />
              </div>
            </div>

            {/* Just For You Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {justForYouItems.map((item) => (
                <ProductCard
                  key={item.id}
                  {...item}
                  toggleWishlist={() => alert("Addedd to wishlist")}
                  onAddToCart={() => alert("Added to cart")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
