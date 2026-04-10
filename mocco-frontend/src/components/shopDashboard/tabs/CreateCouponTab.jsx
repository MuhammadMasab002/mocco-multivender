import CouponForm from "../forms/CouponForm";

const CreateCouponTab = () => {
  return <CouponForm onSubmit={(e) => e.preventDefault()} />;
};

export default CreateCouponTab;
