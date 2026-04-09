import React from "react";
import { MessageCircle } from "lucide-react";

const ShopEmptyState = ({ title, subtitle }) => (
  <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/80 px-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
    <MessageCircle size={56} className="text-slate-300" strokeWidth={1.5} />
    <h3 className="mt-6 text-2xl font-semibold text-slate-700">{title}</h3>
    <p className="mt-2 text-slate-500">{subtitle}</p>
  </div>
);

export default ShopEmptyState;
