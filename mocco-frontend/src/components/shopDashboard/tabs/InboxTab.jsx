import { Inbox } from "lucide-react";

const InboxTab = () => (
  <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
    <Inbox className="mx-auto text-slate-300" size={52} />
    <h3 className="mt-4 text-2xl font-semibold text-slate-800 sm:text-3xl">
      Shop Inbox
    </h3>
    <p className="mt-2 text-sm text-slate-500 sm:text-base">
      No new messages yet
    </p>
  </div>
);

export default InboxTab;
