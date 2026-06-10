"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  slug: string;
  initialLikes: number;
  className?: string;
}

export function LikeButton({ slug, initialLikes, className }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [animating, setAnimating] = useState(false);

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setAnimating(true);
    const newLikes = likes + 1;
    setLikes(newLikes);
    setTimeout(() => setAnimating(false), 600);

    const { error } = await supabase
      .from("skills")
      .update({ likes: newLikes })
      .eq("slug", slug);

    if (error) {
      setLiked(false);
      setLikes(likes);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 ${
        liked
          ? "text-red-500 scale-110"
          : "text-muted-foreground hover:text-red-500"
      } ${className || ""}`}
      disabled={liked}
    >
      <Heart
        className={`h-5 w-5 transition-all duration-300 ${
          liked ? "fill-red-500 scale-125" : animating ? "scale-110" : ""
        }`}
      />
      <span>{likes}</span>
    </button>
  );
}
