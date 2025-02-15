"use client";

import { motion, AnimatePresence } from "framer-motion";
import Avatar from "../ui/avatar";
import Socials from "../ui/socials";
import { FaTimes } from "react-icons/fa";
import { FaCheck, FaCopy } from "react-icons/fa6";
import AvatarIcon from "@/assets/avatar.webp";
import Nav from "./Nav";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  solanaAddress: string;
};

function MobileSidebar({
  isOpen,
  onClose,
  userName,
  solanaAddress,
}: MobileSidebarProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(solanaAddress);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    copyToClipboard();
    setCopied(true);
    toast({ description: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 7500);
  };

  return (
    <div className="lg:hidden">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40 left-0"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar text-white z-50 shadow-lg mobile-sidebar"
            >
              <div className="flex flex-col h-full py-4">
                <div className=" flex justify-end px-4">
                  <button
                    onClick={onClose}
                    className="text-secondary hover:text-secondary-hover"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
                <div className="flex flex-col items-center my-8 space-y-2">
                  <Avatar
                    avatar={AvatarIcon}
                    alt="profile-avatar"
                    width={80}
                    height={80}
                  />
                  <h2 className="text-xl font-semibold">{userName}</h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCopy}
                      className="text-secondary hover:text-secondary-hover flex gap-2 items-center"
                    >
                      <span className="text-sm truncate text-secondary max-w-[180px]">
                        {`${solanaAddress.slice(0, 6)}...${solanaAddress.slice(
                          -6
                        )}`}
                      </span>
                      {copied ? (
                        <FaCheck
                          size={16}
                          className="text-white/60 hover:text-secondary-hover"
                        />
                      ) : (
                        <FaCopy
                          size={16}
                          className="text-secondary hover:text-secondary-hover"
                        />
                      )}
                    </button>
                  </div>
                </div>
                <div className="max-lg:pr-6">
                  <Nav />
                </div>
                <div className="mt-auto mx-auto">
                  <Socials />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileSidebar;
