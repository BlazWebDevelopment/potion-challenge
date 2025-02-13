"use client";

import React from "react";
import { FaCopy } from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/utils/functions";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn-avatar";

type AvatarProps = {
  avatar?: string;
  classname?: string;
  solAdress: string;
  alt?: string;
  name: string;
};

const AvatarLarge: React.FC<AvatarProps> = ({
  avatar,
  alt,
  classname,
  solAdress,
  name,
}) => {
  const { toast } = useToast();
  return (
    <div className={`${classname} overflow-hidden flex flex-col gap-10`}>
      <div className="flex flex-row gap-2 items-center">
        <Avatar className="size-20">
          <AvatarImage src={avatar} alt={alt} />
          <AvatarFallback>
            <div className="bg-accent size-20 text-center flex justify-center text-xl items-center text-white/80 font-black">
              {name[0]}
            </div>
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-white font-black text-xl">{name}</span>
          <div className="flex flex-row gap-1.5">
            <span className="text-secondary text-base">
              {`${solAdress.slice(0, 6)}...${solAdress.slice(-6)}`}
            </span>
            <button
              onClick={() => {
                toast({
                  description: "Copied to clipboard!",
                });
                copyToClipboard(solAdress);
              }}
            >
              <FaCopy
                size={14}
                className="text-secondary hover:text-secondary-hover"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="bg-sidebar border-b border-accent-border justify-between max-sm:max-w-full max-w-[376px] flex items-center h-[58px] px-4">
          <span className="text-white font-bold text-base">X Account</span>
          <div className="flex flex-col justify-end">
            <span className="text-white font-normal text-base text-end">
              {"@orangie"}
            </span>
            <span className="text-secondary font-light text-sm">
              {"279K followers"}
            </span>
          </div>
        </div>
        <div className="bg-sidebar max-w-[376px] flex items-center max-sm:max-w-full justify-between h-[58px] px-4">
          <span className="text-white font-bold text-base">Last Trade</span>
          <span className="text-white font-normal text-base">30 min ago</span>
        </div>
      </div>
    </div>
  );
};

export default AvatarLarge;
