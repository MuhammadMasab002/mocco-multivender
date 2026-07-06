import React from "react";
import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Shipping" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Complete" },
];

const CheckoutStepper = ({ currentStep = 1 }) => {
  return (
    <div className="w-full flex items-center justify-center">
      {STEPS.map((step, idx) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;
        const isLast = idx === STEPS.length - 1;

        return (
          <React.Fragment key={step.id}>
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold
                  transition-all duration-300
                  ${isCompleted ? "bg-gray-900 text-white" : ""}
                  ${isActive ? "bg-gray-900 text-white ring-4 ring-gray-200" : ""}
                  ${!isCompleted && !isActive ? "bg-gray-100 text-gray-400 border-2 border-gray-200" : ""}
                `}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span
                className={`text-xs font-semibold tracking-wide ${
                  isActive
                    ? "text-gray-900"
                    : isCompleted
                      ? "text-gray-600"
                      : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line between steps */}
            {!isLast && (
              <div
                className={`
                  flex-1 h-0.5 mx-3 mb-5 transition-all duration-300
                  ${isCompleted ? "bg-gray-900" : "bg-gray-200"}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CheckoutStepper;
