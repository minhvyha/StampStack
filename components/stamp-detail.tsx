"use client";

import { useState } from "react";
import {
  ArrowLeft,
  MoreVertical,
  Plus,
  Home as HomeIcon,
  Archive,
} from "lucide-react";
import { StampStack } from "@/components/home";
import { ConfirmStampModal } from "@/components/confirm-stamp-modal";

interface StampDetailProps {
  stack: StampStack;
  onBack: () => void;
  onAddStamp: () => void;
  onEdit: () => void;
}

export function StampDetail({
  stack,
  onBack,
  onAddStamp,
  onEdit,
}: StampDetailProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const percentage = Math.round((stack.progress / stack.total) * 100);

  const handleConfirmStamp = () => {
    onAddStamp();
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF3EA] pb-40 px-11">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <button onClick={onBack} className="stamp-button bg-white p-3">
          <ArrowLeft className="w-6 h-6" strokeWidth={3} />
        </button>
        <h1 className="text-xl font-black tracking-tight">{stack.title}</h1>
        <button onClick={onEdit} className="stamp-button bg-white p-3">
          <MoreVertical className="w-6 h-6" strokeWidth={3} />
        </button>
      </div>

      {/* Progress Card */}
      <div className="stamp-border">
          <div className=" border-b-3 border-solid border-[#0f0f0f] shadow-none! bg-[#FFF0A3] p-6 relative overflow-visible">
            {/* Decorative star */}
            <div className="absolute -right-7 -top-6">
              <img
                src="/star.svg"
                alt="decorative star"
                className="w-12 h-12"
              />
            </div>

            <p className="text-sm font-semibold text-gray-600 mb-1">PROGRESS</p>
            <h2 className="text-3xl font-black tracking-tight mb-1">
              {stack.progress} OF {stack.total} ({percentage}%)
            </h2>
            <p className="text-2xl font-black text-[#FF9BBE]">COMPLETED</p>
          </div>

        {/* Stamp Grid */}
        <div className="bg-white p-6">
          <div className="grid grid-cols-3 gap-4">
            {stack.stamps.map((stamped, index) => (
              <div
                key={index}
                className="aspect-square rounded-full border-3 border-gray-400 flex  items-center justify-center"
                style={{
                  borderStyle: stamped ? "solid" : "dashed",
                  borderColor: stamped ? "#000" : "#9ca3af",
                }}
              >
                {stamped && (
                  <svg width="60%" height="60%" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M16 2l2.06 6.34h6.66l-5.39 3.92 2.06 6.34L16 14.68 8.61 18.6l2.06-6.34-5.39-3.92h6.66z"
                      fill="#FF9BBE"
                      stroke="black"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
              {/* Reward Section */}
      {stack.reward && (
        <div className="border-t-3 border-solid border-[#0f0f0f]  bg-[#E9DFFF] p-3">
          <p className="text-center text-lg font-medium tracking-tight uppercase">
            REWARD: {stack.reward}
          </p>
        </div>
      )}
      </div>



      {/* Add Stamp Button */}
      {stack.progress < stack.total && (
        <div className=" mt-6">
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full stamp-button bg-[#FF9BBE] py-4 text-xl font-black tracking-tight"
          >
            ADD A STAMP
          </button>
        </div>
      )}

      {/* Decorative star bottom left */}
      <div className="absolute bottom-32 left-4">
                  <img
                    src="/vector.svg"
                    alt="decorative star"
                    className="w-11 h-11"
                  />
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <ConfirmStampModal
          stack={stack}
          onConfirm={handleConfirmStamp}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
