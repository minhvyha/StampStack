"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Home as HomeIcon, Archive, Gift } from "lucide-react"

interface NewStampStackProps {
  onBack: () => void
  onCreate: (title: string, total: number, reward: string) => void
}

export function NewStampStack({ onBack, onCreate }: NewStampStackProps) {
  const [title, setTitle] = useState("")
  const [times, setTimes] = useState<number>(10)
  const [showReward, setShowReward] = useState(false)
  const [reward, setReward] = useState("")

  const handleCreate = () => {
    if (title.trim()) {
      onCreate(title, times, showReward ? reward : "")
    }
  }

  return (
    <div className="min-h-screen bg-[#E9DFFF] pb-24">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <button onClick={onBack} className="stamp-button bg-white p-3">
          <ArrowLeft className="w-6 h-6" strokeWidth={3} />
        </button>
        <div className="flex-1 stamp-border bg-white px-6 py-3">
          <h1 className="text-xl font-black tracking-tight">NEW STAMP STACK</h1>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 mt-8 space-y-6">
        {/* What do you want to do */}
        <div>
          <div className="border-l-4 border-black pl-4 mb-3">
            <h2 className="text-lg font-black tracking-tight">
              WHAT DO YOU WANT TO DO?
            </h2>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.G. TRY SOMETHING NEW"
            className="w-full stamp-border bg-white px-4 py-4 text-base font-medium placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        {/* How many times */}
        <div>
          <div className="border-l-4 border-black pl-4 mb-3">
            <h2 className="text-lg font-black tracking-tight">
              HOW MANY TIMES THIS YEAR?
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={times}
                onChange={(e) => setTimes(Number(e.target.value))}
                className="stamp-border bg-white px-6 py-3 pr-12 text-base font-bold appearance-none focus:outline-none cursor-pointer"
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
            <div className="stamp-border bg-[#9ec7ff] px-4 py-2 ml-auto">
              <p className="text-xs font-bold leading-tight max-w-[140px]">
                {"DON'T OVERTHINK IT! YOU CAN CHANGE THIS LATER"}
              </p>
            </div>
          </div>
        </div>

        {/* Add a reward */}
        <div>
          <div className="border-l-4 border-black pl-4 mb-3 flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight">ADD A REWARD?</h2>
            <button
              onClick={() => setShowReward(!showReward)}
              className={`w-16 h-8 rounded-full stamp-border relative transition-colors ${
                showReward ? "bg-[#FF9BBE]" : "bg-white"
              }`}
            >
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-black transition-all ${
                  showReward ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>
          {showReward && (
            <div className="stamp-border bg-white flex items-center gap-3 px-4 py-3">
              <div className="bg-[#FF9BBE] p-2 border-2 border-black">
                <Gift className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <input
                type="text"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="TYPE REWARD HERE..."
                className="flex-1 text-base font-medium placeholder:text-gray-400 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={onBack}
            className="flex-1 stamp-button bg-white py-4 text-xl font-black tracking-tight"
          >
            CANCEL
          </button>
          <button
            onClick={handleCreate}
            className="flex-1 stamp-button bg-[#FF9BBE] py-4 text-xl font-black tracking-tight disabled:opacity-50"
            disabled={!title.trim()}
          >
            CREATE
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white stamp-border mx-4 mb-4">
        <div className="flex items-center justify-around py-4 relative">
          <button className="p-3">
            <HomeIcon className="w-8 h-8" strokeWidth={2.5} />
          </button>
          
          <button className="absolute left-1/2 -translate-x-1/2 -top-6 bg-[#FF9BBE] stamp-button p-4 rounded-lg">
            <Plus className="w-8 h-8" strokeWidth={3} />
          </button>
          
          <button className="p-3">
            <Archive className="w-8 h-8" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
