"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import potionLogo from "@/assets/potion-logo.webp";

function Logo() {
  return (
    <Link href={"/"} className="flex flex-row gap-4 items-center">
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Image
          src={potionLogo || "/placeholder.svg"}
          alt="potion-logo"
          className="max-w-14 max-md:max-w-8"
        />
      </motion.div>
      <div className="flex flex-col">
        <span className="uppercase font-black text-3xl max-md:text-xl text-white">
          Potion
        </span>
        <span className="uppercase font-black text-base max-md:text-[10px] max-md:-mt-2 text-fuchsia-500">
          Leaderboard
        </span>
      </div>
    </Link>
  );
}

export default Logo;
