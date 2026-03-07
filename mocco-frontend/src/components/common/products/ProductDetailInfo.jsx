import CustomButton from "../CustomButton";
import CustomFormInput from "../inputs/CustomFormInput";
import { Add, Remove } from "@mui/icons-material";

const ProductDetailInfo = ({
  title,
  //   rating,
  reviews,
  description,
  price,
  colours,
  sizes,
  quantity,
  setQuantity,
}) => {
  return (
    <div className="w-full lg:w1/2 space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex flex-row items-center gap-3 sm:gap-6">
        <p className="text-yellow-500">⭐⭐⭐⭐☆ ({reviews} Reviews)</p>
        <span>|</span>
        <p className="text-green-600 font-medium">In Stock</p>
      </div>

      <p className="text-3xl font-bold">${price}</p>
      <p className="text-base font-normal py-2">{description}</p>

      <div className="flex items-center gap-6">
        <p className="font-medium">Colours:</p>
        <div className="flex gap-3">
          {colours?.map((c, index) => (
            <span
              key={index}
              className={`w-5 h-5 rounded-full border cursor-pointer ${c}`}
            ></span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <p className="font-medium">Size:</p>
        <div className="flex gap-2">
          {sizes.map((s, index) => (
            <button
              key={index}
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="font-medium">Quantity:</p>
      <div className="flex items-center gap-3">
        <button
          className="p-2 border rounded"
          onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
        >
          <Remove />
        </button>

        <div className="w-full min-w-12 max-w-14">
          <CustomFormInput
            type="text"
            className="text-black !px-2 !text-center"
            value={quantity}
            onChange={(e) =>
              setQuantity(+e.target.value > 0 ? +e.target.value : 1)
            }
          />
        </div>

        <button
          className="p-2 border rounded"
          onClick={() => setQuantity(quantity + 1)}
        >
          <Add />
        </button>
      </div>

      <div className="flex gap-3 mt-4">
        <CustomButton buttonText="Buy Now" variant="danger" className="w-40" />
        <CustomButton
          buttonText="Add To Cart"
          variant="dark"
          className="w-40"
        />
      </div>
    </div>
  );
};

export default ProductDetailInfo;
