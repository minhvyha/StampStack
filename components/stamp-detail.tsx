"use client";

import { useState } from "react";
import {
  ArrowLeft,
  MoreVertical,
  MoreHorizontal,
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
    <div className="min-h-screen bg-[#FFF3EA] pb-40 px-11 ">
      {/* Header */}
      <div className="py-9 flex items-center justify-between">
        <button onClick={onBack} className="stamp-button bg-white p-2">
          <ArrowLeft className="w-7 h-7" strokeWidth={2} />
        </button>
        <h1 className="text-2xl font-black tracking-tight">{stack.title}</h1>
        <button onClick={onEdit} className="stamp-button bg-white p-2">
          <MoreHorizontal className="w-7 h-7" strokeWidth={2} />
        </button>
      </div>

      {/* Progress Card */}
      <div className="stamp-border relative">
        <div className=" border-b-3  border-solid border-[#0f0f0f] shadow-none! bg-[#FFF0A3] p-6 relative overflow-visible">
          {/* Decorative star */}
          <div className="absolute -right-7 -top-6">
            <img src="/star.svg" alt="decorative star" className="w-12 h-12" />
          </div>

          <p className="text-sm font-semibold text-[#757575] mb-1">PROGRESS</p>
          <h2 className="text-3xl font-black tracking-tight mb-1">
            {stack.progress} OF {stack.total} ({percentage}%)
          </h2>
          <p className="text-3xl font-black text-[#FF9BBE]">COMPLETED</p>
        </div>

        {/* Stamp Grid */}
        <div className="bg-white px-4 py-8">
          <div className="grid grid-cols-3 gap-4">
            {stack.stamps.map((stamped, index) => (
              <div
                key={index}
                className="aspect-square rounded-full border-3 border-gray-400 bg-[#F2F2F2] flex  items-center justify-center"
                style={{
                  borderStyle: stamped ? "solid" : "dashed",
                  borderColor: stamped ? "#000" : "#9ca3af",
                }}
              >
                {stamped && (
                  <img src="/stamp.svg" alt="" style={{transform: `rotate(${Math.random() * 360}deg)`}}/>
                )}
              </div>
            ))}
            {/* Decorative star bottom left */}
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
        <div className="absolute -bottom-5 -left-5">
          <img src="/vector.svg" alt="decorative star" className="w-11 h-11" />
        </div>
      </div>

      {/* Add Stamp Button */}
      {stack.progress < stack.total && (
        <div className="w-full flex justify-center">
          <button
            onClick={() => setShowConfirm(true)}
            className=" stamp-button bg-[#FF9BBE] mt-8  p-4 text-xl font-black tracking-tight"
            style={{ transform: "rotate(-2deg)" }}
          >
            ADD A STAMP
          </button>
        </div>
      )}

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
