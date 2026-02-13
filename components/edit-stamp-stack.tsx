"use client"

import React, { useState } from "react"
import { ArrowLeft, Plus, Home as HomeIcon, Archive, Gift } from "lucide-react"
import { StampStack } from "@/components/home"

interface EditStampStackProps {
  stack: StampStack
  onBack: () => void
  onSave: (stackId: string, title: string, total: number, reward: string) => void
}

export function EditStampStack({ stack, onBack, onSave }: EditStampStackProps) {
  const [title, setTitle] = useState(stack.title)
  const [times, setTimes] = useState<number>(stack.total)
  const [showReward, setShowReward] = useState(!!stack.reward)
  const [reward, setReward] = useState(stack.reward || "")

  const handleSave = () => {
    if (title.trim()) {
      onSave(stack.id, title, times, showReward ? reward : "")
    }
  }

  return (
    <div className="min-h-screen bg-[#E9DFFF] p-11">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="stamp-button bg-white p-3">
          <ArrowLeft className="w-6 h-6" strokeWidth={3} />
        </button>

        <div className="flex-1 stamp-border bg-white px-4 py-2" style={{ transform: "rotate(-1deg)" }}>
          <h1 className="text-2xl font-black tracking-tight">EDIT STAMP STACK</h1>
        </div>
      </div>

      {/* Form */}
      <div className="mt-8 space-y-6">
        {/* What do you want to do */}
        <div>
          <div className="border-l-4 border-black pl-2 mb-3">
            <h2 className="text-lg font-black tracking-tight">WHAT DO YOU WANT TO DO?</h2>
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.G. TRY SOMETHING NEW"
            className="w-full stamp-border bg-white px-4 py-4 text-base font-medium placeholder:text-[#757575] focus:outline-none"
          />
        </div>

        {/* How many times */}
        <div>
          <div className="border-l-4 border-black pl-2 mb-3">
            <h2 className="text-lg font-black tracking-tight">HOW MANY TIMES THIS YEAR?</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={times}
                onChange={(e) => setTimes(Number(e.target.value))}
                className="stamp-border bg-white px-3 py-3 pr-8 text-base font-bold appearance-none focus:outline-none cursor-pointer"
              >
                {[5, 10, 15, 20, 25, 30, 50, 100].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="black" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <span className="text-base font-black">TIMES</span>

            <div className="stamp-border bg-[#9ec7ff] px-2 py-2 ml-auto" style={{ transform: "rotate(-2deg)" }}>
              <p className="text-[9px] font-bold leading-tight max-w-[140px]">
                {"DON'T OVERTHINK IT! YOU CAN CHANGE THIS LATER"}
              </p>
            </div>
          </div>
        </div>

        {/* Add a reward */}
        <div>
          <div className="border-l-4 border-black pl-2 mb-3 flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight">ADD A REWARD?</h2>

            <button
              onClick={() => setShowReward(!showReward)}
              className={`w-16 h-8 rounded-full stamp-border relative transition-colors ${showReward ? "bg-[#FF9BBE]" : "bg-white"}`}
            >
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-black transition-all ${showReward ? "right-1" : "left-1"}`}
              />
            </button>
          </div>

          <div className={`stamp-border bg-white flex items-center gap-3 px-4 py-3 ${showReward ? "" : "opacity-70"}`}>
            <div className="bg-[#FF9BBE] p-1 border-2 border-black">
              <Gift className="w-8 h-8" strokeWidth={2.5} />
            </div>

            <input
              type="text"
              value={reward}
              disabled={!showReward}
              onChange={(e) => setReward(e.target.value)}
              placeholder="TYPE REWARD HERE..."
              className="flex-1 text-base font-medium placeholder:text-[#757575] focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={onBack}
            className="flex-1 stamp-button bg-white py-2 text-2xl font-black tracking-tight"
            style={{ transform: "rotate(-1deg)" }}
          >
            CANCEL
          </button>

          <button
            onClick={handleSave}
            className="flex-1 stamp-button bg-[#FF9BBE] py-2 text-2xl font-black tracking-tight disabled:opacity-50"
            disabled={!title.trim()}
            style={{ transform: "rotate(1deg)" }}
          >
            SAVE
          </button>
        </div>
      </div>

   
    </div>
  )
}
