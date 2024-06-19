import { FC } from "react";
import { BiChevronUp, BiLogOutCircle } from "react-icons/bi";
import { AiOutlineBarChart, AiOutlineUnorderedList } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import BooksTable from "@/app/pages/books/Books";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface RouteWithLayout {
  name: string;
  path: string;
  icon: any;
  element?: JSX.Element;
}

const routes: RouteWithLayout[] = [
  {
    name: "Books",
    path: "/dashboard/books",
    icon: BsPeople,
    element: <BooksTable />,
  },

];

interface SidebarProps {
  onRouteChange: (element: JSX.Element | null) => void;
}

const Sidebar: FC<SidebarProps> = ({ onRouteChange }) => {
  const location = useLocation();

  const handleLinkClick = (route: RouteWithLayout) => {
    onRouteChange(route.element || null);
  };

  const isActiveLink = (linkPath: string) => {
    return (
      location.pathname === linkPath || location.pathname.startsWith(linkPath)
    );
  };
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const logout = async () => {
    // Remove token from sessionStorage
    sessionStorage.removeItem("token");
  
    // Check if token exists (before removal)
    if (token) {
      // If token exists, log out was unsuccessful
      toast.error("Failed to log out");
    } else {
      // If token does not exist, log out was successful
      toast.success("User logged out successfully");
      navigate("/auth/login");
    }
  };
  
  return (
    <div className="bg-white min-w-[230px] h-screen px-4 py-4 flex flex-col">
      <Link to={"/dashboard/books"} className="py-4"></Link>
      {routes.map((route, i) => (
        <Link
          key={i}
          to={route.path}
          className={`${
            isActiveLink(route.path)
              ? "w-full items-center px-4 flex flex-row gap-x-2 rounded-lg bg-[#35454510] text-[#354545] duration-300"
              : "w-full items-center px-4 flex flex-row gap-x-2 text-[#4F4F4F] rounded-lg hover:bg-[#35454510] duration-300 hover:text-[#354545]"
          } py-3 whitespace-nowrap`}
          onClick={() => handleLinkClick(route)}
        >
          <route.icon size={20} />
          <p className="whitespace-nowrap">{route.name}</p>
        </Link>
      ))}
      <button className="flex flex-row text-[#354545] gap-x-2 py-[10%]" onClick={logout}>
        <BiLogOutCircle size={24} />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default Sidebar;
