import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { faqsContent } from "../contents/FAQ'sContent";

const FAQ = () => {
  const [openItem, setOpenItem] = useState(2);

  const handleToggle = (id) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full min-h-screen bg-slate-100/80 py-14 sm:py-16 text-black">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3 animate-pulse">
            FAQ
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <div className="w-16 h-1 bg-red-500 mx-auto mb-6"></div>
          <p className="sm:text-lg text-gray-600 font-light">
            Find answers to common questions about our platform, services, and
            policies. We're here to help!
          </p>
        </div>

        <div className="space-y-4">
          {faqsContent?.map((item) => {
            const isOpen = openItem === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-xl border bg-white px-4 sm:px-5 py-4 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md ${
                  isOpen ? "border-red-300" : "border-red-200"
                }`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-3 text-left cursor-pointer"
                  onClick={() => handleToggle(item.id)}
                >
                  <span className="text-xl font-semibold text-slate-900 transition-colors duration-300">
                    {item.question}
                  </span>
                  <span
                    className={`transition-transform duration-300 ease-in-out ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <ExpandMoreIcon className="text-slate-600" />
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${
                    isOpen
                      ? "max-h-40 opacity-100 translate-y-0 mt-3"
                      : "max-h-0 opacity-0 -translate-y-1 mt-0"
                  }`}
                >
                  <p className="text-slate-600 font-light leading-relaxed pb-1">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
