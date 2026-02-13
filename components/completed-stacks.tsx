"use client"

import { Plus, Home as HomeIcon, Archive } from "lucide-react"
import type { StampStack } from "./home"

type CompletedStacksProps = {
  completedStacks: StampStack[]
  onBack: () => void
  onNewStack: () => void
}

export function CompletedStacks({ completedStacks, onBack, onNewStack }: CompletedStacksProps) {
  return (
    <div className="min-h-screen bg-[#F4DEC1] pb-24">
      {/* Header */}
      <div className="pt-12 pb-6 px-6">
        <div className="relative inline-block">
          <div className="bg-white stamp-border px-8 py-4 relative">
            <h1 className="text-2xl font-black tracking-tight leading-tight">
              COMPLETED<br />STAMP STACKS
            </h1>
            {/* Decorative stars */}
            <div className="absolute -left-6 bottom-2">
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
      </div>

      {/* Completed Stamp Cards */}
      <div className="px-6 grid grid-cols-2 gap-4">
        {completedStacks.map((stack) => {
          const completionDate = new Date()
          const monthYear = completionDate.toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
          }).toUpperCase()

          return (
            <div
              key={stack.id}
              className="bg-[#f5dcc4] stamp-border p-0 overflow-hidden"
            >
              <div className="flex">
                {/* Color stripe */}
                <div className={`${stack.color} w-8 flex-shrink-0`} />
                
                {/* Content */}
                <div className="flex-1 p-4 flex flex-col">
                  <h3 className="text-xl font-black tracking-tight mb-2">
                    {stack.title}
                  </h3>
                  <p className="text-xl font-bold text-gray-500 mb-3">
                    {stack.total} / {stack.total}
                  </p>
                  <div className="bg-[#fff8dc] stamp-border-sm px-3 py-1.5 inline-block self-start">
                    <span className="text-sm font-black tracking-tight">
                      {monthYear}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Find More Stamp Stacks */}
        <button
          onClick={onNewStack}
          className="col-span-2 w-full border-4 border-dashed border-gray-400 bg-[#F4DEC1] p-12 flex flex-col items-center justify-center gap-4 hover:border-[#757575] transition-colors"
        >
          <div className="w-16 h-16 rounded-full border-3 border-gray-400 flex items-center justify-center">
            <Plus className="w-8 h-8 text-[#757575]" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold text-gray-500 tracking-wide text-center">
            FIND MORE STAMP STACKS TO FILL
          </span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white stamp-border mx-4 mb-4">
        <div className="flex items-center justify-around py-4 relative">
          <button onClick={onBack} className="p-3">
            <HomeIcon className="w-8 h-8" strokeWidth={2.5} />
          </button>
          
          <button 
            onClick={onNewStack}
            className="absolute left-1/2 -translate-x-1/2 -top-6 bg-[#FF9BBE] stamp-button p-4 rounded-lg"
          >
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
