import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Inbox,
  Loader2,
  MessageSquare,
  Search,
  Send,
  User as UserIcon,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getSellerConversations,
  getMessages,
  createMessage,
} from "../../../services/store/actions/conversation";
import { setActiveConversation } from "../../../services/store/slices/conversationSlice";

const InboxTab = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const targetConvId = searchParams.get("conversationId");

  const { seller } = useSelector((state) => state.seller);
  const {
    conversations,
    activeConversation,
    messages,
    conversationsLoading,
    messagesLoading,
    sendLoading,
  } = useSelector((state) => state.conversation);

  const [newMessageText, setNewMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const messagesEndRef = useRef(null);

  // Fetch seller conversations on mount
  useEffect(() => {
    if (seller?._id) {
      dispatch(getSellerConversations(seller._id));
    }
  }, [dispatch, seller?._id]);

  // Handle target conversation ID from search params if present
  useEffect(() => {
    if (targetConvId && conversations.length > 0) {
      const found = conversations.find((c) => c._id === targetConvId);
      if (found) {
        dispatch(setActiveConversation(found));
        setMobileShowChat(true);
      }
    }
  }, [targetConvId, conversations, dispatch]);

  // Fetch messages whenever active conversation changes
  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getMessages(activeConversation._id));
    }
  }, [dispatch, activeConversation?._id]);

  // Select a conversation
  const handleSelectConversation = (conv) => {
    dispatch(setActiveConversation(conv));
    setMobileShowChat(true);
    setSearchParams({ tab: "inbox", conversationId: conv._id });
  };

  // Close active conversation and return to list view
  const handleCloseConversation = () => {
    dispatch(setActiveConversation(null));
    setMobileShowChat(false);
    setSearchParams({ tab: "inbox" });
  };

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    if (!activeConversation?._id || !seller?._id) {
      toast.error("No active conversation selected!");
      return;
    }

    const payload = {
      conversationId: activeConversation._id,
      sender: seller._id,
      text: newMessageText.trim(),
    };

    const textToSend = newMessageText;
    setNewMessageText("");

    const res = await dispatch(createMessage(payload));
    if (!res?.success) {
      toast.error(res?.message || "Failed to send message.");
      setNewMessageText(textToSend);
    }
  };

  // Filter conversations by search query
  const filteredConversations = conversations.filter((c) => {
    const userName = c.user?.name || "Customer";
    const userEmail = c.user?.email || "";
    const q = searchQuery.toLowerCase();
    return (
      userName.toLowerCase().includes(q) || userEmail.toLowerCase().includes(q)
    );
  });

  // Format timestamp helper
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden min-h-[650px] flex flex-col">
      {/* Tab Header Banner */}
      <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-50 rounded-2xl border border-teal-100 text-teal-600">
            <Inbox size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Shop Inbox</h2>
            <p className="text-xs text-slate-500">
              Communicate directly with your buyers & customers
            </p>
          </div>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600">
          {conversations.length}{" "}
          {conversations.length === 1 ? "Conversation" : "Conversations"}
        </div>
      </div>

      {/* Inbox Body: Grid layout with list + chat area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 relative">
        {/* Left Panel: Conversations List */}
        <div
          className={`lg:col-span-4 border-r border-slate-100 flex flex-col bg-slate-50/30 ${
            mobileShowChat ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Search Bar */}
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search
                className="absolute left-3.5 top-3 text-slate-400"
                size={16}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search customers..."
                className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition bg-white"
              />
            </div>
          </div>

          {/* Conversations Scroll Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 max-h-[550px]">
            {conversationsLoading ? (
              <div className="p-10 flex flex-col items-center justify-center text-slate-400 gap-2">
                <Loader2 className="animate-spin" size={24} />
                <span className="text-xs">Loading conversations...</span>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-10 text-center text-slate-400">
                <MessageSquare
                  className="mx-auto mb-2 text-slate-300"
                  size={32}
                />
                <p className="text-sm font-medium text-slate-600">
                  No conversations found
                </p>
                <p className="text-xs mt-1">
                  Customer inquiries will appear here when they message your
                  shop.
                </p>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isActive = activeConversation?._id === conv._id;
                const customerName = conv.user?.name || "Customer";
                const customerAvatar =
                  conv.user?.avatar?.url || conv.user?.avatar;

                return (
                  <button
                    key={conv._id}
                    onClick={() => handleSelectConversation(conv)}
                    className={`w-full p-4 text-left flex items-start gap-3 transition cursor-pointer ${
                      isActive
                        ? "bg-purple-50/70 border-l-4 border-purple-600"
                        : "hover:bg-slate-100/60"
                    }`}
                  >
                    <div className="relative shrink-0">
                      {customerAvatar ? (
                        <img
                          src={customerAvatar}
                          alt={customerName}
                          className="w-11 h-11 rounded-full object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm">
                          {customerName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-slate-900 truncate">
                          {customerName}
                        </h4>
                        <span className="text-[11px] text-slate-400 shrink-0">
                          {formatTime(conv.updatedAt)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {conv.lastMessage || "No messages yet"}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Panel: Active Chat UI */}
        <div
          className={`lg:col-span-8 flex flex-col bg-white ${
            mobileShowChat ? "flex" : "hidden lg:flex"
          }`}
        >
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  {/* Mobile Back Button */}
                  <button
                    onClick={handleCloseConversation}
                    className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition cursor-pointer"
                    title="Close conversation"
                  >
                    <ArrowLeft size={18} className="lg:hidden" />
                    <X size={18} className="hidden lg:block" />
                  </button>

                  <div className="relative">
                    {activeConversation.user?.avatar?.url ? (
                      <img
                        src={activeConversation.user.avatar.url}
                        alt={activeConversation.user?.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold text-sm">
                        {(activeConversation.user?.name || "C")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {activeConversation.user?.name || "Customer"}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {activeConversation.user?.email || "Customer Inquiry"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Customer Active
                  </span>
                  <button
                    onClick={handleCloseConversation}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
                  >
                    Close Chat
                  </button>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[460px] bg-slate-50/20">
                {messagesLoading ? (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-2">
                    <Loader2 className="animate-spin" size={24} />
                    <span className="text-xs">Loading messages...</span>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-center px-4">
                    <MessageSquare size={36} className="text-slate-300 mb-2" />
                    <p className="text-sm font-medium text-slate-600">
                      Start your conversation
                    </p>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">
                      Send a message below to communicate directly with this
                      customer.
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isSellerSender =
                      String(msg.sender) === String(seller?._id);

                    return (
                      <div
                        key={msg._id || msg.createdAt}
                        className={`flex flex-col ${
                          isSellerSender ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs sm:max-w-md px-4 py-3 rounded-2xl text-sm shadow-xs ${
                            isSellerSender
                              ? "bg-slate-900 text-white rounded-br-none"
                              : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                          }`}
                        >
                          <p className="whitespace-pre-wrap leading-relaxed">
                            {msg.text}
                          </p>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 px-1">
                          {formatTime(msg.createdAt)}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Footer */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 sm:p-4 border-t border-slate-100 bg-white flex items-center gap-2"
              >
                <input
                  type="text"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  placeholder="Write your message..."
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-100 transition"
                />

                <button
                  type="submit"
                  disabled={sendLoading || !newMessageText.trim()}
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition cursor-pointer flex items-center gap-2 disabled:opacity-50 shrink-0"
                >
                  {sendLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      <span className="hidden sm:inline">Send</span>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center text-slate-400">
              <div className="p-4 bg-slate-100 rounded-full mb-3 text-slate-400">
                <Inbox size={40} />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Select a Conversation
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Choose a customer from the left conversation list to read and
                respond to messages.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxTab;
