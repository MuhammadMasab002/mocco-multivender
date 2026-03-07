// Features.jsx
import React from "react";

const featureList = [
  {
    id: 1,
    title: "FREE AND FAST DELIVERY",
    desc: "Free delivery for all orders over $140",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 7h13l4 4v6H3V7z"
          stroke="#DC2626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 17a1 1 0 11-2 0 1 1 0 012 0zM7 17a1 1 0 11-2 0 1 1 0 012 0z"
          stroke="#DC2626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "24/7 CUSTOMER SERVICE",
    desc: "Friendly 24/7 customer support",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 8a6 6 0 10-12 0v6h12V8z"
          stroke="#DC2626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "MONEY BACK GUARANTEE",
    desc: "We return money within 30 days",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2v6l4-4"
          stroke="#DC2626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 12A9 9 0 1112 3v0"
          stroke="#DC2626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const FeatureSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      {featureList.map((f) => (
        <div
          key={f.id}
          className="p-6 border border-black rounded-lg hover:shadow-md transition"
        >
          <div className="mx-auto mb-4 text-red-600">{f.icon}</div>
          <h4 className="font-semibold text-gray-800">{f.title}</h4>
          <p className="text-gray-500 mt-2 text-sm">{f.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureSection;
