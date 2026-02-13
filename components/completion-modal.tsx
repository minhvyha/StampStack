"use client"

import { X, Gift, ArrowRight } from "lucide-react"
import { StampStack } from "@/components/home"

interface CompletionModalProps {
  stack: StampStack
  onClose: () => void
  onHome: () => void
}

export function CompletionModal({ stack, onClose, onHome }: CompletionModalProps) {
  return (
    <div className="fixed inset-0 bg-[#FFF3EA] z-50 overflow-y-auto px-11 pb-11">
      <div className="min-h-screen  flex flex-col items-center">
        {/* Close button */}
        <div className="flex justify-end mb-4 ml-auto">
          <button onClick={onClose} className="stamp-button bg-white p-3">
            <X className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>

        {/* Header */}
        <div className="relative inline-block mb-10">
          <div className="stamp-border bg-white px-8 py-6 relative"
            style={{transform: "rotate(-2.5deg)"}}>
            <h1 className="text-3xl font-black tracking-tight mb-1">
              STAMP STACK
            </h1>
            <h2 className="text-3xl font-black text-[#FF9BBE]">COMPLETED!</h2>
            
            {/* Decorative stars */}
                            <div className="absolute -left-7 -bottom-4">
                  <img
                    src="/vector.svg"
                    alt="decorative star"
                    className="w-11 h-11"
                  />
                </div>
                <div className="absolute -right-5 -top-5">
                  <img
                    src="/star.svg"
                    alt="decorative star"
                    className="w-12 h-12"
                  />
                </div>
          </div>
        </div>

        {/* Reward card */}
        {stack.reward && (
          <div className="stamp-border bg-white p-8 mb-6 w-full">
            <div className="flex flex-col items-center">
              <div className="stamp-border bg-[#FF9BBE] p-8 mb-6">
                <Gift className="w-18 h-18" strokeWidth={2} />
              </div>
              <div className="border-b-4 border-black pb-2 mb-3">
                <p className=" font-black tracking-tight">REWARD UNLOCKED</p>
              </div>
              <h3 className="text-4xl font-black tracking-tight">{stack.reward}</h3>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-4 w-full">
          <button className="w-full stamp-button bg-[#FF9BBE] py-4 flex items-center justify-between px-3" onClick={onHome}>
            <span className="text-lg font-black tracking-tight">
              CURRENT STAMP STACKS
            </span>
            <ArrowRight className="w-8 h-8 border-3 bg-white border-black border-solid" strokeWidth={2} />
          </button>
          
          <button className="w-full stamp-button bg-white py-4 flex items-center justify-between px-3" onClick={onClose}>
            <span className="text-lg font-black tracking-tight">
              COMPLETED STAMP STACKS
            </span>
            <ArrowRight className="w-8 h-8 border-3 border-black border-solid" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}
