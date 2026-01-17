import { FaUser } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const Avatar = () => {
  const { user } = useAuth();
  return (
    <div className="relative">
      {!user?.imageUrl ? (
        <FaUser className="text-4xl rounded-full border border-white p-1 text-white" />
      ) : (
        <div className="relative group">
          <div
            className={`relative w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center 
                   ring-2 ring-blue-500 group-hover:ring-4 transition-all duration-300 ease-in-out`}
          >
            <img
              src={user?.imageUrl}
              alt="User Avatar"
              className="rounded-full w-full h-full object-cover"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
