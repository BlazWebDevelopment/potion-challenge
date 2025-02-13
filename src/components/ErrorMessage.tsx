import React from "react";

function ErrorMessage() {
  return (
    <div className="bg-sidebar flex gap-6 justify-center items-center border-purple/20 border rounded-xl flex-col p-10">
      <span className="text-white/70 text-xl">
        {"There has been an error!"}
      </span>
      <span className="text-white/70">{"try refreshing page"}</span>
    </div>
  );
}

export default ErrorMessage;
