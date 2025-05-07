import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  FileText,
  FileArchive,
  Book,
  ScrollText,
  Languages,
  Landmark,
  Upload,
  Eye,
  Settings,
  Menu,
  X,
  LogOut,
  Gem
} from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth";
const AdminSidebar = ({ mobileMenuOpen, toggleMobileMenu,setMobileMenuOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };
  const navItems = [
    {
      title: "Lessons",
      icon: <BookOpen size={18} />,
      subItems: [
        {
          title: "Upload Lessons",
          path: "/admin/lessons/upload",
          icon: <Upload size={16} />,
        },
        {
          title: "Upload Excersises",
          path: "/admin/excercises/upload",
          icon: <Upload size={16} />,
        },
      ],
    },
    {
      title: "Resources",
      icon: <FileArchive size={18} />,
      subItems: [
        {
          title: "Upload Resources",
          path: "/admin/resources/upload",
          icon: <Upload size={16} />,
        },
        {
          title: "Manage Resources",
          path: "/resources",
          icon: <FileText size={16} />,
        },
      ],
    },
    {
      title: "Dictionary",
      icon: <Book size={18} />,
      subItems: [
        {
          title: "Add Words",
          path: "/dictionary/add",
          icon: <Upload size={16} />,
        },
        {
          title: "Review Dictionary",
          path: "/dictionary",
          icon: <Eye size={16} />,
        },
      ],
    },
    {
      title: "Historical Docs",
      icon: <ScrollText size={18} />,
      subItems: [
        {
          title: "Upload Documents",
          path: "/history/upload",
          icon: <Upload size={16} />,
        },
        {
          title: "Review Documents",
          path: "/history",
          icon: <Eye size={16} />,
        },
      ],
    },
    {
      title: "Linguistics",
      icon: <Languages size={18} />,
      subItems: [
        {
          title: "Upload Analysis",
          path: "/linguistics/upload",
          icon: <Upload size={16} />,
        },
        {
          title: "Review Analysis",
          path: "/linguistics",
          icon: <Eye size={16} />,
        },
      ],
    },
    {
      title: "Cultural Studies",
      icon: <Landmark size={18} />,
      subItems: [
        {
          title: "Upload Studies",
          path: "/culture/upload",
          icon: <Upload size={16} />,
        },
        { title: "Review Studies", path: "/culture", icon: <Eye size={16} /> },
      ],
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-between h-16 p-3 border-b">
            <X
              className="text-gray-600 cursor-pointer lg:hidden"
              onClick={toggleMobileMenu}
            />
            <div className="flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-800">
                Akan Heritage
              </span>
              <Gem className="text-amber-600 ml-2" />
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navItems.map((item) => (
              <div key={item.title} className="mb-4">
                <div className="flex items-center px-4 py-2 text-gray-700">
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </div>
                <div className="ml-12 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`flex items-center px-3 py-2 text-sm transition-colors ${
                        location.pathname === subItem.path
                          ? "bg-amber-50 text-amber-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mr-2">{subItem.icon}</span>
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Settings */}
          <div className="p-4 border-t w-full">
            <Button
              onClick={handleLogout}
              variant={"outline"}
              className={"w-full"}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;
