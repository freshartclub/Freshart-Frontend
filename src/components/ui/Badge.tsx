import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface BadgeProps {
  children: ReactNode;
  color?:
    | "blue"
    | "red"
    | "green"
    | "yellow"
    | "gray"
    | "indigo"
    | "purple"
    | "pink";
  className?: string;
  onRemove?: () => void;
}

const colorClasses = {
  blue: "bg-blue-100 text-blue-800",
  red: "bg-red-100 text-red-800",
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  gray: "bg-gray-100 text-gray-800",
  indigo: "bg-indigo-100 text-indigo-800",
  purple: "bg-purple-100 text-purple-800",
  pink: "bg-pink-100 text-pink-800",
};

export default function Badge({
  children,
  color = "blue",
  className = "",
  onRemove,
}: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]} ${className}`}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="flex-shrink-0 ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500 focus:text-white focus:outline-none"
        >
          <span className="sr-only">Remove</span>
          <FaTimes className="h-2.5 w-2.5" />
        </button>
      )}
    </div>
  );
}
