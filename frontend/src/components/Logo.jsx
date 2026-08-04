import { Leaf } from "lucide-react";

function Logo() {
  return (
    <div className="flex flex-col items-center">

      <div className="bg-[#DDEFD8] p-4 rounded-full">
        <Leaf size={42} className="text-[#7BAE7F]" />
      </div>

      <h1 className="text-4xl font-bold text-[#334155] mt-5">
        MindGuard
      </h1>

      <p className="text-gray-500 mt-2">
        Build Better Focus 🍵
      </p>

    </div>
  );
}

export default Logo;