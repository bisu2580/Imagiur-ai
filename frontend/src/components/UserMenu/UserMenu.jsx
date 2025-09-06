import { Banknote, LayoutDashboard, LogOut, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { MenuItem } from "../MenuItem/MenuItem";
import { menuVariants } from "../../utils/animations";

const UserMenu = ({ handleSignout }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const imagesArray = user?.activities?.filter(
    (activity) => activity.type === "image_generation"
  );
  return (
    <motion.div
      className="absolute right-0 top-13 mt-3 w-[320px] bg-[#1e1e2f] text-white rounded-xl shadow-lg border border-gray-700 p-3 z-50 flex items-center justify-between"
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <ul className="space-y-1 w-full">
        <li className="p-2 rounded-lg hover:bg-[#2a2a3d] transition-colors">
          <div className="flex items-center">
            <Avatar />
            <div className="ml-3">
              <p className="font-semibold truncate">
                {user?.fullname || user?.username || "User Name"}
              </p>
              <p className="text-sm text-gray-400 truncate">
                {user?.email || "Email ID"}
              </p>
            </div>
          </div>
        </li>

        <hr className="border-gray-700" />
        <MenuItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          onClick={() => navigate("/dashboard")}
        />
        {/* Non-clickable credits item */}
        <li className="flex items-center p-2 text-gray-300">
          <span className="mr-3">
            <Image size={20} />
          </span>
          <span>
            Images Generated:{" "}
            <span className="text-green-400 font-semibold">
              {imagesArray?.length ?? 0}
            </span>
          </span>
        </li>
        <li className="flex items-center p-2 text-gray-300">
          <span className="mr-3">
            <Banknote size={20} />
          </span>
          <span>
            Credits:{" "}
            <span className="text-green-400 font-semibold">
              {user?.credits ?? 0}
            </span>
          </span>
        </li>

        <hr className="border-gray-700" />

        <MenuItem
          icon={<LogOut size={20} />}
          text="Sign Out"
          onClick={handleSignout}
          className="text-red-400 hover:bg-red-600/20 hover:text-red-300" // Special styling
        />
      </ul>
    </motion.div>
  );
};

export default UserMenu;
