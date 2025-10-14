// pages/HomePage.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(false);

  return (
    // Center the inner card; keep same two-div structure
    <div className="w-full min-h-screen flex items-center justify-center">
      <div
        className={`relative overflow-hidden rounded-2xl
                    border-2 border-gray-600
                    backdrop-blur-xl bg-white/5
                    shadow-[inset_0_0_0_1px_rgba(148,163,184,0.25),0_20px_60px_-20px_rgba(0,0,0,0.6)]
                    w-full max-w-[1200px] h-[80vh]
                    grid grid-cols-1
                    ${
                      selectedUser
                        ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
                        : "md:grid-cols-2"
                    }`}
      >
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
