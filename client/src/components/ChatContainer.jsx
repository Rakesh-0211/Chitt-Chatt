import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";

const ChatContainer = () => {
  const{messages,selectedUser,setSelectedUser,sendMessage,getMessages}=useContext(ChatContext);
  const{authUser,onlineUsers}=useContext(AuthContext);
  const scrollEnd = useRef();
  const[input,setInput]=useState('');
  const handleSendMessage=async(e)=>{
      e.preventDefault();
      if(input.trim()===""){
        return null;
      }
      await sendMessage({text:input.trim()});
      setInput("");
  }
  //Handle sending an image
  const handleSendImage=async(e)=>{
      const file=e.target.files[0];
      if(!file||!file.type.startsWith("image/")){
         toast.error("select an image file");
         return;
      }
      const reader=new FileReader();
      reader.onloadend=async()=>{
        await sendMessage({image:reader.result})
      }
      reader.readAsDataURL(file);
  }
  useEffect(()=>{
    if(selectedUser){
      getMessages(selectedUser._id)
    }
  },[selectedUser])
  useEffect(() => {
    if (scrollEnd.current&&messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full overflow-hidden relative backdrop-blur-lg">
      {/* header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500/60">
        <img src={selectedUser.profilePic|| assets.avatar_icon} alt="" className="w-8 h-8 rounded-full object-cover" />
        <p className="flex-1 text-lg text-white/90 flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id)}
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
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`w-full flex items-end gap-3 mb-4 ${
              msg.senderId !== authUser._id
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
                  msg.senderId === authUser._id
                    ? "rounded-br-md"
                    : "rounded-bl-md"
                }`}
              />
            ) : (
              <p
                className={`px-4 py-2 md:text-sm leading-relaxed text-white rounded-2xl shadow-md max-w-[75%] md:max-w-[65%] break-words ${
                  msg.senderId === authUser._id
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
                  msg.senderId === authUser._id
                    ? authUser?.profilePic|| assets.avatar_icon
                    : selectedUser?.profilePic || assets.avatar_icon
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
          <input onChange={(e)=>setInput(e.target.value)}
            value={input} onKeyDown={(e)=>e.key==="Enter"? handleSendMessage(e):null}
            type="text"
            placeholder="Send a message"
            className="w-full bg-transparent text-sm text-white placeholder-gray-400 outline-none border-rounded"
          />
          <input onChange={handleSendImage} type="file" id="image" accept="image/png,image/jpeg" hidden />
          <label htmlFor="image" className="cursor-pointer">
            <img src={assets.gallery_icon} alt="" className="w-5" />
          </label>
        </div>
        <img onClick={handleSendMessage}
        src={assets.send_button} alt="" className="w-7 cursor-pointer" />
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
