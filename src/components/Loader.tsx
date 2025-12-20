"use client";

import React from "react";
import { Loader2 } from "lucide-react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Loader2 className="animate-spin text-[#7851A9] w-12 h-12" />
    </div>
  );
};

export default Loading;
