import React from "react";
import { CiViewList } from "react-icons/ci";

const EmptyState = ({ title, desc, isVisible = false }: { title?: string; desc?: string; isVisible: boolean }) => {
  if (!isVisible) return null;
  return (
    <div className="py-10 flex flex-col justify-center items-center">
      <div>
        <CiViewList className="w-12 h-12 mb-4 text-gray-300" />
      </div>
      <div className="text-center text-xl font-medium">{title || "It's Empty in Here"}</div>
      <div className="text-center">{desc || "There's currently no data to render"}</div>
    </div>
  );
};

export default EmptyState;
