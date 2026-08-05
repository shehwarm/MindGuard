import { Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-[#E6EEDB] h-20 px-8 flex items-center justify-between">

      <h2 className="text-2xl font-bold text-[#334155]">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">

        <Bell className="text-[#7BAE7F]" />

        <div className="flex items-center gap-3">

          <div className="h-10 w-10 rounded-full bg-[#DDEFD8] flex items-center justify-center font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>

            <p className="font-semibold">
              {user?.name}
            </p>

            <p className="text-sm text-gray-500">
              {user?.email}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;