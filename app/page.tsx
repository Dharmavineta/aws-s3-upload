"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef } from "react";

const Home = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const { scrollYProgress: horizontalScrollY } = useScroll({
    target: targetRef,
    offset: ["0.4 1.4", "1 0"],
  });
  const x = useTransform(horizontalScrollY, [0, 1], ["-1%", "-500%"]);
  const bgColor = useTransform(
    scrollYProgress,
    [0.1, 0.2],
    ["#ffffff", "#000000"]
  );
  return (
    <motion.div
      style={{ backgroundColor: bgColor }}
      ref={targetRef}
      className="h-[500vh]"
    >
      <div className="mt-[200vh] bg-inherit sticky top-0 overflow-hidden ">
        <motion.div style={{ x }} className="flex gap-20 mt-32 ml-32 ">
          {[...Array(10)].map((ele, i, arr) => (
            <div
              key={i}
              className="bg-white border flex-shrink-0 w-72 h-96 shadow-md rounded-md p-10"
            >
              <h1>This is the content</h1>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
