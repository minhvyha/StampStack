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
    <div className="fixed inset-0 bg-[#E9DFFF] z-50 flex  p-6">
      <div className="w-full max-w-md flex flex-col justify-between">
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
            <img src="/bigstar.svg" alt="" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-black tracking-tight">{percentage}%</p>
              <p className="text-4xl font-black tracking-tight">DONE!</p>
            </div>
          </div>

          {/* Message */}
          <div className="stamp-border bg-white p-3 mb-8 relative"
            style={{transform: "rotate(-2deg)"}}
          >
            <p className="text-[28px] font-black tracking-tight">WAY TO CRUSH IT!</p>
            <div className="absolute -right-12 -bottom-12">
              <img  className="w-18 h-18" src="/vector.svg" alt="" />
            </div>
          </div>

          
        </div>
        {/* Button */}
          <button
            onClick={onClose}
            className=" stamp-button bg-[#FF9BBE] py-6 px-7  flex items-center justify-center gap-3"
          >
            <span className="text-4xl font-black tracking-tight ">KEEP GOING</span>
            <ArrowRight className="w-8 h-8 bg-[#F2F2F2] border-3 border-solid border-[#000]" strokeWidth={2} />
          </button>
      </div>
    </div>
  )
}
