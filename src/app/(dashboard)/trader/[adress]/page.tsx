"use client";

import ProfileStats from "@/components/ProfileStats";
import potionLogo from "@/assets/potion-logo.webp";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Image from "next/image";
import ErrorMessage from "@/components/ErrorMessage";

export default function ProfilePage() {
  const { adress } = useParams();
  const {
    isLoading,
    error,
    data: trader,
    refetch,
  } = useQuery({
    queryKey: ["trader", adress],
    queryFn: () => fetch(`/api/trader/${adress}`).then((res) => res.json()),
  });

  if (error) {
    return <ErrorMessage />;
  }

  if (isLoading) {
    return (
      <div className="mt-40 max-sm:mt-40 max-md:mt-14 flex justify-center items-center max-lg:mt-16">
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Image
            src={potionLogo}
            alt="potion-logo"
            className="max-w-20 max-md:max-w-20 opacity-50 animate-pulse"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mt-20 max-sm:mt-10 max-md:mt-14 max-lg:mt-16">
      <ProfileStats trader={trader} handleRefetch={refetch} />
    </div>
  );
}
