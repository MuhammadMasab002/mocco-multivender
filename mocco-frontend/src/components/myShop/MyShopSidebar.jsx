import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CalendarClock,
  Hash,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  PencilLine,
  Phone,
} from "lucide-react";
import { formatJoinedDate, toTitle } from "./utils";
import { createConversation } from "../../services/store/actions/conversation";

const InfoRow = ({ icon, label, value }) => {
  const IconComponent = icon;

  return (
    <div>
      <p className="mb-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        <IconComponent size={13} />
        {label}
      </p>
      <p className="text-[15px] font-medium text-slate-700 wrap-break-word">
        {value || "-"}
      </p>
    </div>
  );
};

const MyShopSidebar = ({
  displayShop,
  totalProducts,
  sellerCreatedAt,
  onEditClick,
  onLogout,
  isOwner,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { seller: currentSeller } = useSelector((state) => state.seller);

  const handleSendMessage = async () => {
    if (!user?._id) {
      toast.error("Please login to send message!");
      return;
    }

    if (!displayShop?._id) {
      toast.error("Shop information is unavailable.");
      return;
    }

    toast.loading("Creating conversation...", { id: "conv-toast" });

    const res = await dispatch(
      createConversation({
        userId: user._id,
        sellerId: displayShop._id,
        groupTitle: `Shop_${displayShop._id}`,
      }),
    );

    if (res?.success && res?.conversation) {
      toast.success("Conversation opened!", { id: "conv-toast" });
      if (currentSeller?._id) {
        navigate(
          `/shop-dashboard/?tab=inbox&conversationId=${res.conversation._id}`,
        );
      } else {
        navigate(
          `/my-profile?tab=inbox&conversationId=${res.conversation._id}`,
        );
      }
    } else {
      toast.error(res?.message || "Failed to create conversation.", {
        id: "conv-toast",
      });
    }
  };

  return (
    <aside className="h-fit self-start rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_36px_rgba(15,23,42,0.08)] sm:p-6 xl:sticky xl:top-20">
      <div className="flex flex-col items-center text-center">
        <img
          src={displayShop.avatarUrl}
          alt="Shop avatar"
          className="h-24 w-24 rounded-full border border-slate-200 object-cover shadow sm:h-28 sm:w-28"
        />
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-800">
          {toTitle(displayShop.name)}
        </h2>
        {isOwner && (
          <p className="mt-1 text-sm text-slate-500">
            Manage your storefront with confidence
          </p>
        )}
      </div>

      <div className="my-5 h-px bg-slate-200" />

      <div className="space-y-2">
        {isOwner && (
          <InfoRow icon={Mail} label="Email" value={displayShop.email} />
        )}
        <InfoRow icon={MapPin} label="Address" value={displayShop.addresses} />
        {isOwner && (
          <InfoRow
            icon={Phone}
            label="Phone Number"
            value={displayShop.phoneNumber}
          />
        )}
        {isOwner && (
          <InfoRow icon={Hash} label="Zip Code" value={displayShop.zipCode} />
        )}
        <InfoRow
          icon={Package}
          label="Total Products"
          value={String(totalProducts)}
        />
        <InfoRow
          icon={CalendarClock}
          label="Joined On"
          value={formatJoinedDate(sellerCreatedAt)}
        />
      </div>

      {isOwner ? (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <button
            type="button"
            onClick={onEditClick}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-sky-200 bg-linear-to-b from-sky-50 to-sky-100 px-4 py-2.5 text-sm font-semibold text-sky-700 transition hover:from-sky-100 hover:to-sky-100"
          >
            <PencilLine size={16} />
            Edit Shop
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-slate-900 to-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:from-slate-800 hover:to-slate-700"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <button
            type="button"
            onClick={handleSendMessage}
            className="w-full inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 px-4 py-3 text-sm font-semibold text-white transition shadow-sm"
          >
            <MessageSquare size={16} />
            Send Message to Seller
          </button>
        </div>
      )}
    </aside>
  );
};

export default MyShopSidebar;
