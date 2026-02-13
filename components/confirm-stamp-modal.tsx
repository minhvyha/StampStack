"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { StampStack } from "@/components/home"

interface ConfirmStampModalProps {
  stack: StampStack
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmStampModal({ stack, onConfirm, onCancel }: ConfirmStampModalProps) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-white stamp-border p-8">
        <h2 className="text-3xl font-black tracking-tight mb-8">CONFIRM STAMP</h2>

        <div className="space-y-6">
          {/* Goal */}
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-2">GOAL</p>
            <p className="text-2xl font-black tracking-tight">{stack.title}</p>
          </div>

          {/* Date */}
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-2">DATE</p>
            <div className="stamp-border bg-[#E9DFFF] p-4 flex items-center gap-3">
              <Calendar className="w-6 h-6" strokeWidth={2.5} />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 text-xl font-black bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onCancel}
              className="flex-1 stamp-button bg-white py-3 text-lg font-black tracking-tight"
            >
              CANCEL
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 stamp-button bg-[#FF9BBE] py-3 text-lg font-black tracking-tight"
            >
              STAMP
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
