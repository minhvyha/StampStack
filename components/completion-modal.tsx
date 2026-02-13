"use client"

import { X, Gift, ArrowRight } from "lucide-react"
import { StampStack } from "@/components/home"

interface CompletionModalProps {
  stack: StampStack
  onClose: () => void
}

export function CompletionModal({ stack, onClose }: CompletionModalProps) {
  return (
    <div className="fixed inset-0 bg-[#F4DEC1] z-50 overflow-y-auto">
      <div className="min-h-screen p-6 pb-24">
        {/* Close button */}
        <div className="flex justify-end mb-8">
          <button onClick={onClose} className="stamp-button bg-white p-3">
            <X className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>

        {/* Header */}
        <div className="relative inline-block mb-12">
          <div className="stamp-border bg-white px-8 py-6 relative">
            <h1 className="text-3xl font-black tracking-tight mb-1">
              STAMP STACK
            </h1>
            <h2 className="text-3xl font-black text-[#FF9BBE]">COMPLETED!</h2>
            
            {/* Decorative stars */}
            <div className="absolute -left-6 bottom-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 4l3.09 9.51h10l-8.09 5.88 3.09 9.51L16 23.02 7.91 28.9l3.09-9.51L2.91 13.51h10z"
                  fill="#9ec7ff"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="absolute -right-6 -top-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M14 2l2.06 6.34h6.66l-5.39 3.92 2.06 6.34L14 14.68 8.61 18.6l2.06-6.34-5.39-3.92h6.66z"
                  fill="#FF9BBE"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Reward card */}
        {stack.reward && (
          <div className="stamp-border bg-white p-8 mb-6">
            <div className="flex flex-col items-center">
              <div className="stamp-border bg-[#FF9BBE] p-12 mb-6">
                <Gift className="w-24 h-24" strokeWidth={2.5} />
              </div>
              <div className="border-b-4 border-black pb-2 mb-4">
                <p className="text-lg font-black tracking-tight">REWARD UNLOCKED</p>
              </div>
              <h3 className="text-4xl font-black tracking-tight">{stack.reward}</h3>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-4">
          <button className="w-full stamp-button bg-[#FF9BBE] py-4 flex items-center justify-between px-6">
            <span className="text-xl font-black tracking-tight">
              CURRENT STAMP STACKS
            </span>
            <ArrowRight className="w-6 h-6" strokeWidth={3} />
          </button>
          
          <button className="w-full stamp-button bg-white py-4 flex items-center justify-between px-6">
            <span className="text-xl font-black tracking-tight">
              COMPLETED STAMP STACKS
            </span>
            <ArrowRight className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  )
}
