"use client"

import { X, ArrowRight } from "lucide-react"
import { StampStack } from "@/components/home"

interface ProgressModalProps {
  stack: StampStack
  onClose: () => void
}

export function ProgressModal({ stack, onClose }: ProgressModalProps) {
  const percentage = Math.round((stack.progress / stack.total) * 100)

  return (
    <div className="fixed inset-0 bg-[#E9DFFF] z-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Close button */}
        <div className="flex justify-end mb-8">
          <button onClick={onClose} className="stamp-button bg-white p-3">
            <X className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center">
          {/* Decorative stars */}
          <div className="absolute top-24 left-12">
            <img src="/yellowstar.svg" alt="" />
          </div>

          {/* Big star with percentage */}
          <div className="mb-8 relative">
            <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
              <path
                d="M140 20l28.7 88.3h92.9l-75.2 54.6 28.7 88.3L140 196.6 64.9 251.2l28.7-88.3-75.2-54.6h92.9z"
                fill="#FF9BBE"
                stroke="black"
                strokeWidth="4"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-5xl font-black tracking-tight">{percentage}%</p>
              <p className="text-3xl font-black tracking-tight">DONE!</p>
            </div>
          </div>

          {/* Message */}
          <div className="stamp-border bg-white px-8 py-4 mb-8 relative">
            <p className="text-2xl font-black tracking-tight">WAY TO CRUSH IT!</p>
            <div className="absolute -right-6 -bottom-6">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 4l3.09 9.51h10l-8.09 5.88 3.09 9.51L16 23.02 7.91 28.9l3.09-9.51L2.91 13.51h10z"
                  fill="#9ec7ff"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={onClose}
            className="w-full stamp-button bg-[#FF9BBE] py-4 flex items-center justify-center gap-3"
          >
            <span className="text-2xl font-black tracking-tight">KEEP GOING</span>
            <ArrowRight className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  )
}
