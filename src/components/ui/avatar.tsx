"use client";

import Image, { ImageProps } from "next/image";
import React from "react";

type AvatarProps = {
  avatar: ImageProps["src"];
  alt: string;
  onClick?: () => void;
  width: number;
  height: number;
  classname?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  avatar,
  alt,
  onClick,
  width,
  height,
  classname,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${classname} rounded-full overflow-hidden`}
    >
      <Image
        src={avatar || "/avatar.webp"}
        alt={alt}
        width={width}
        height={height}
      />
    </button>
  );
};

export default Avatar;
