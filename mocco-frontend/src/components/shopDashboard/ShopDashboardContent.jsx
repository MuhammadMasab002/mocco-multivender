import DashboardTab from "./tabs/DashboardTab";
import AllProductsTab from "./tabs/AllProductsTab";
import CreateProductTab from "./tabs/CreateProductTab";
import AllEventsTab from "./tabs/AllEventsTab";
import CreateEventTab from "./tabs/CreateEventTab";
import AllCouponsTab from "./tabs/AllCouponsTab";
import CreateCouponTab from "./tabs/CreateCouponTab";
import OrdersTab from "./tabs/OrdersTab";
import WithdrawTab from "./tabs/WithdrawTab";
import InboxTab from "./tabs/InboxTab";

export default function ShopDashboardContent({
  activeView,
  seller,
  sellerProducts,
  sellerEvents,
  sellerCoupons,
  orders,
  withdrawals,
  availableBalance,
  pendingOrders,
  averageOrderValue,
  bankAccounts,
  selectedBankAccountId,
  withdrawInput,
  withdrawAmount,
  fee,
  userReceives,
  canSubmitWithdraw,
  showBankModal,
  formatMoney,
  pakistanBanks,
  onOpenBankModal,
  onCloseBankModal,
  onSelectBankAccount,
  onChangeWithdrawInput,
  onDeleteBankAccount,
  onSubmitWithdrawRequest,
  onAddBankAccount,
}) {
  if (activeView === "dashboard") {
    return (
      <DashboardTab
        seller={seller}
        sellerProducts={sellerProducts}
        sellerEvents={sellerEvents}
        orders={orders}
        withdrawals={withdrawals}
        pendingOrders={pendingOrders}
        averageOrderValue={averageOrderValue}
        formatMoney={formatMoney}
      />
    );
  }

  if (activeView === "all-products") {
    return <AllProductsTab sellerProducts={sellerProducts} />;
  }

  if (activeView === "create-product") {
    return <CreateProductTab />;
  }

  if (activeView === "all-events") {
    return <AllEventsTab sellerEvents={sellerEvents} />;
  }

  if (activeView === "create-event") {
    return <CreateEventTab />;
  }

  if (activeView === "all-coupons") {
    return <AllCouponsTab sellerCoupons={sellerCoupons} />;
  }

  if (activeView === "create-coupon") {
    return <CreateCouponTab />;
  }

  if (activeView === "orders") {
    return <OrdersTab orders={orders} />;
  }

  if (activeView === "withdraw") {
    return (
      <WithdrawTab
        availableBalance={availableBalance}
        bankAccounts={bankAccounts}
        selectedBankAccountId={selectedBankAccountId}
        onSelectBankAccount={onSelectBankAccount}
        withdrawInput={withdrawInput}
        onChangeWithdrawInput={onChangeWithdrawInput}
        formatMoney={formatMoney}
        withdrawAmount={withdrawAmount}
        fee={fee}
        userReceives={userReceives}
        onOpenBankModal={onOpenBankModal}
        onDeleteBankAccount={onDeleteBankAccount}
        onSubmitWithdrawRequest={onSubmitWithdrawRequest}
        canSubmitWithdraw={canSubmitWithdraw}
        withdrawals={withdrawals}
        showBankModal={showBankModal}
        onCloseBankModal={onCloseBankModal}
        onAddBankAccount={onAddBankAccount}
        pakistanBanks={pakistanBanks}
      />
    );
  }

  return <InboxTab />;
}
