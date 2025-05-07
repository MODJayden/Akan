import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/component/AdminSidebar";
import { Menu } from "lucide-react";
import { useState } from "react";

const AdminLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button is handled inside AdminSidebar */}
      <AdminSidebar mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={toggleMobileMenu} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Mobile header - only shows on small screens */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
          <h1 className="text-xl font-semibold">Akan Heritage Admin</h1>
          <button onClick={toggleMobileMenu} className="p-2 rounded-md bg-amber-600 text-white">
            {" "}
            {/* Spacer to balance layout */}
            <Menu size={18} className="text-white" />
          </button>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
