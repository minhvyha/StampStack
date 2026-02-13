"use client";

import { useState, useEffect } from "react";
import { Plus, Home as HomeIcon, Archive } from "lucide-react";
import { StampCard } from "@/components/stamp-card";
import { StampDetail } from "@/components/stamp-detail";
import { NewStampStack } from "@/components/new-stamp-stack";
import { CompletionModal } from "@/components/completion-modal";
import { ProgressModal } from "@/components/progress-modal";
import { CompletedStacks } from "@/components/completed-stacks";
import { EditStampStack } from "@/components/edit-stamp-stack";

export type StampStack = {
  id: string;
  title: string;
  progress: number;
  total: number;
  color: string;
  reward?: string;
  stamps: boolean[];
};

const STORAGE_KEY_STACKS = "stamp-stack-active";
const STORAGE_KEY_COMPLETED = "stamp-stack-completed";

export function Home() {
  const [stacks, setStacks] = useState<StampStack[]>([]);
  const [completedStacks, setCompletedStacks] = useState<StampStack[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedStack, setSelectedStack] = useState<string | null>(null);
  const [editingStack, setEditingStack] = useState<string | null>(null);
  const [showNewStack, setShowNewStack] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [completedStack, setCompletedStack] = useState<StampStack | null>(null);
  const [progressStack, setProgressStack] = useState<StampStack | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedStacks = localStorage.getItem(STORAGE_KEY_STACKS);
    const savedCompleted = localStorage.getItem(STORAGE_KEY_COMPLETED);

    if (savedStacks) {
      setStacks(JSON.parse(savedStacks));
    }
    if (savedCompleted) {
      setCompletedStacks(JSON.parse(savedCompleted));
    }
    setIsLoaded(true);
  }, []);

  // Save active stacks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY_STACKS, JSON.stringify(stacks));
    }
  }, [stacks, isLoaded]);

  // Save completed stacks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        STORAGE_KEY_COMPLETED,
        JSON.stringify(completedStacks),
      );
    }
  }, [completedStacks, isLoaded]);

  const handleAddStamp = (stackId: string) => {
    setStacks((prev) =>
      prev.map((stack) => {
        if (stack.id === stackId && stack.progress < stack.total) {
          const newProgress = stack.progress + 1;
          const newStamps = [...stack.stamps];
          newStamps[newProgress - 1] = true;

          const percentage = Math.round((newProgress / stack.total) * 100);
          const updatedStack = {
            ...stack,
            progress: newProgress,
            stamps: newStamps,
          };

          // Check if stack is completed (100%)
          if (newProgress === stack.total && completedStack) {
            setCompletedStack(updatedStack);
            setShowCompletion(true);
            // Move to completed stacks
            setCompletedStacks((prev) => [...prev, completedStack]);
            // Remove from active stacks
            setStacks((prev) => prev.filter((s) => s.id !== completedStack.id));
          }
          // Check for milestone progress (25%, 50%, 75%)
          else if (
            percentage === 25 ||
            percentage === 50 ||
            percentage === 75
          ) {
            setProgressStack(updatedStack);
            setShowProgress(true);
          }

          return updatedStack;
        }
        return stack;
      }),
    );
  };

  const handleCompletionClose = () => {
    if (completedStack) {
      // Clear selected stack and close modal
      setSelectedStack(null);
      setShowCompletion(false);
      setCompletedStack(null);
      setShowArchive(true); // Show archive after completion
    }
  };

  const handleCreateStack = (title: string, total: number, reward: string) => {
    const colors = [
      "bg-[#FF9BBE]",
      "bg-[#9EC7FF]",
      "bg-[#FFF0A3]",
      "bg-[#E9DFFF]",
    ];
    const newStack: StampStack = {
      id: Date.now().toString(),
      title: title.toUpperCase(),
      progress: 0,
      total,
      color: colors[stacks.length % colors.length],
      reward,
      stamps: Array(total).fill(false),
    };
    setStacks([...stacks, newStack]);
    setShowNewStack(false);
  };

  const handleEditStack = (
    stackId: string,
    title: string,
    total: number,
    reward: string,
  ) => {
    setStacks((prev) =>
      prev.map((stack) => {
        if (stack.id === stackId) {
          // Adjust stamps array if total changed
          let newStamps = [...stack.stamps];
          if (total !== stack.total) {
            if (total > stack.total) {
              // Add more stamps
              newStamps = [
                ...newStamps,
                ...Array(total - stack.total).fill(false),
              ];
            } else {
              // Reduce stamps (keep progress intact)
              newStamps = newStamps.slice(0, total);
            }
          }
          const newProgress = Math.min(stack.progress, total);
          return {
            ...stack,
            title: title.toUpperCase(),
            total,
            reward,
            stamps: newStamps,
            progress: newProgress,
          };
        }
        return stack;
      }),
    );
    setEditingStack(null);
  };

  return (
    <>
      {showArchive && (
        <CompletedStacks
          completedStacks={completedStacks}
          onBack={() => setShowArchive(false)}
          onNewStack={() => {
            setShowArchive(false);
            setShowNewStack(true);
          }}
        />
      )}

      {showNewStack && (
        <NewStampStack
          onBack={() => setShowNewStack(false)}
          onCreate={handleCreateStack}
        />
      )}

      {editingStack &&
        (() => {
          const stack = stacks.find((s) => s.id === editingStack);
          if (!stack) return null;
          return (
            <EditStampStack
              stack={stack}
              onBack={() => setEditingStack(null)}
              onSave={handleEditStack}
            />
          );
        })()}

      {selectedStack &&
        !showArchive &&
        !showNewStack &&
        !editingStack &&
        (() => {
          const stack = stacks.find((s) => s.id === selectedStack);
          if (!stack) return null;
          return (
            <StampDetail
              stack={stack}
              onBack={() => setSelectedStack(null)}
              onAddStamp={() => handleAddStamp(selectedStack)}
              onEdit={() => setEditingStack(selectedStack)}
            />
          );
        })()}

      {!selectedStack && !showNewStack && !showArchive && !editingStack && (
        <div className="min-h-screen bg-[#FFF3EA] pb-38 px-11">
          {/* Header */}
          <div className="pt-11 pb-11">
            <div className="flex justify-center">
              <div
                className=" stamp-border bg-[#F2F2F2] px-8 py-4 relative"
                style={{ transform: "rotate(-3deg)" }}
              >
                <h1 className="text-3xl font-black tracking-tight">
                  STAMP STACK
                </h1>
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
          </div>

          {/* Stamp Cards */}
          <div className=" grid grid-cols-2 gap-4">
            {stacks.map((stack) => (
              <StampCard
                key={stack.id}
                stack={stack}
                rotate={Math.random() * 4 - 2} // Random rotation between -2 and 2 degrees
                onClick={() => setSelectedStack(stack.id)}
              />
            ))}

            {/* New Stamp Stack Card */}
            <button
              onClick={() => setShowNewStack(true)}
              className=" rounded-[5px] border-4 border-dashed! shadow-none! border-[#757575]!  px-4 py-7 flex flex-col items-center justify-center gap-3 hover:border-[#757575] transition-colors"
            >
              <div className="w-7 h-7 rounded-full border-[2.5px] border-[#757575]! flex items-center justify-center">
                <Plus className="w-4 h-4 text-[#757575]" strokeWidth={3} />
              </div>
              <span className="text-xs font-bold text-[#757575] tracking-wide text-center">
                NEW STAMP STACK
              </span>
            </button>
          </div>

          {showProgress && progressStack && (
            <ProgressModal
              stack={progressStack}
              onClose={() => setShowProgress(false)}
            />
          )}
        </div>
      )}

      {/* Global Modals - Show on top of any view */}
      {showCompletion && completedStack && (
        <CompletionModal
          stack={completedStack}
          onClose={handleCompletionClose}
          onHome={() => {
            setShowCompletion(false);
            setSelectedStack(null);
          }}
        />
      )}

      {showProgress && progressStack && (
        <ProgressModal
          stack={progressStack}
          onClose={() => setShowProgress(false)}
        />
      )}
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F2F2F2] stamp-border nav-border mx-11 mb-10">
        <div className="flex justify-between px-11 py-[18px] relative">
          <button
            className=" border-none! shadow-none!"
            onClick={() => {
              setSelectedStack(null);
              setShowNewStack(false);
              setShowArchive(false);
            }}
          >
            <img src="/home.svg" alt="" />
          </button>

          <button
            onClick={() => {
              setShowArchive(false);
              setShowNewStack(true)}}
            className="absolute left-1/2 -translate-x-1/2 -top-6 bg-[#FF9BBE] stamp-button w-16 h-16 flex justify-center items-center rounded-[5px]"
          >
            <Plus className="w-8 h-8" strokeWidth={2} />
          </button>

          <button
            className=" border-none! shadow-none!"
            onClick={() => setShowArchive(true)}
          >
            <img src="/archive.svg" alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
