import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return selectedUser ? (
    <div className="h-full overflow-hidden relative backdrop-blur-lg">
      {/* header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500/60">
        <img src={assets.profile_martin} alt="" className="w-8 h-8 rounded-full object-cover" />
        <p className="flex-1 text-lg text-white/90 flex items-center gap-2">
          Martin Johnson
          <span className="w-2 h-2 rounded-full bg-green-500" />
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden w-7 cursor-pointer"
        />
        <img src={assets.help_icon} alt="" className="max-md:hidden w-5 opacity-80" />
      </div>

      {/* chat area */}
      <div className="flex flex-col h-[calc(100%-56px-72px)] overflow-y-auto px-4 pt-5 pb-24">
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`w-full flex items-end gap-3 mb-4 ${
              msg.senderId === "680f50e4f10f3cd28382ecf9"
                ? "justify-end flex-row-reverse"
                : "justify-start"
            }`}
          >
            {/* message bubble / image */}
            {msg.image ? (
              <img
                src={msg.image}
                alt=""
                className={`max-w-[70%] md:max-w-[60%] rounded-2xl border border-white/10 shadow-sm ${
                  msg.senderId === "680f50e4f10f3cd28382ecf9"
                    ? "rounded-br-md"
                    : "rounded-bl-md"
                }`}
              />
            ) : (
              <p
                className={`px-4 py-2 md:text-sm leading-relaxed text-white rounded-2xl shadow-md max-w-[75%] md:max-w-[65%] break-words ${
                  msg.senderId === "680f50e4f10f3cd28382ecf9"
                    ? "bg-violet-500/30 backdrop-blur rounded-br-md"
                    : "bg-white/10 backdrop-blur rounded-bl-md"
                }`}
              >
                {msg.text}
              </p>
            )}

            {/* avatar + time (stick to extreme edge) */}
            <div className="text-center text-[10px] leading-tight shrink-0">
              <img
                src={
                  msg.senderId === "680f50e4f10f3cd28382ecf9"
                    ? assets.avatar_icon
                    : assets.profile_martin
                }
                alt=""
                className="w-7 h-7 rounded-full object-cover mx-auto"
              />
              <p className="text-gray-400 mt-1">{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd} />
      </div>

      {/* buttom area */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-gradient-to-t from-black/30 to-transparent">
        <div className="flex items-center gap-2 flex-1 bg-white/10 border border-white/10 rounded-xl px-3 py-2">
          <input
            type="text"
            placeholder="Send a message"
            className="w-full bg-transparent text-sm text-white placeholder-gray-400 outline-none border-rounded"
          />
          <input type="file" id="image" accept="image/png,image/jpeg" hidden />
          <label htmlFor="image" className="cursor-pointer">
            <img src={assets.gallery_icon} alt="" className="w-5" />
          </label>
        </div>
        <img src={assets.send_button} alt="" className="w-7 cursor-pointer" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} alt="" className="w-16" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
