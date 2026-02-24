"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Petal {
  id: number;
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  fallSpeed: number;
  swaySpeed: number;
  swayAmount: number;
  size: number;
  opacity: number;
  color: string;
  phase: number;
  isDragging: boolean;
}

interface Props {
  width: number;
  height: number;
  wind?: number;
  numberOfPieces?: number;
}

const COLORS = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#00bcd4",
  "#4caf50",
  "#ff9800",
  "#ff5722",
];

const createPetal = (id: number, width: number, height: number): Petal => ({
  id,
  x: Math.random() * width,
  y: Math.random() * height - height,
  rotation: Math.random() * 360,
  rotationSpeed: (Math.random() - 0.5) * 3,
  fallSpeed: 0.3 + Math.random() * 0.8,
  swaySpeed: 0.5 + Math.random() * 1.5,
  swayAmount: 15 + Math.random() * 25,
  size: 8 + Math.random() * 10,
  opacity: 0.6 + Math.random() * 0.4,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  phase: Math.random() * Math.PI * 2,
  isDragging: false,
});

const InteractiveConfetti = ({
  width,
  height,
  wind = 0,
  numberOfPieces = 20,
}: Props) => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const dragRef = useRef<{
    id: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // 초기 꽃잎 생성
  useEffect(() => {
    if (width === 0 || height === 0) return;
    const count = Math.max(1, Math.floor(numberOfPieces));
    setPetals(
      Array.from({ length: count }, (_, i) => createPetal(i, width, height))
    );
  }, [width, height, numberOfPieces]);

  // 애니메이션 루프
  useEffect(() => {
    if (petals.length === 0) return;

    const animate = () => {
      timeRef.current += 0.016;
      setPetals((prev) =>
        prev.map((petal) => {
          if (petal.isDragging) return petal;

          let newY = petal.y + petal.fallSpeed;
          const sway =
            Math.sin(timeRef.current * petal.swaySpeed + petal.phase) *
            petal.swayAmount *
            0.016;
          let newX = petal.x + sway + wind * 50;
          const newRotation = petal.rotation + petal.rotationSpeed;

          // 화면 밖으로 나가면 위에서 다시 시작
          if (newY > height + 20) {
            newY = -20;
            newX = Math.random() * width;
          }
          if (newX > width + 20) newX = -20;
          if (newX < -20) newX = width + 20;

          return {
            ...petal,
            x: newX,
            y: newY,
            rotation: newRotation,
          };
        })
      );
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [petals.length, height, width, wind]);

  const getEventPos = (
    e: React.TouchEvent | React.MouseEvent
  ): { clientX: number; clientY: number } => {
    if ("touches" in e) {
      return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
    }
    return { clientX: e.clientX, clientY: e.clientY };
  };

  const handleStart = useCallback(
    (petalId: number, e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const { clientX, clientY } = getEventPos(e);
      const petal = petals.find((p) => p.id === petalId);
      if (!petal) return;

      dragRef.current = {
        id: petalId,
        offsetX: clientX - petal.x,
        offsetY: clientY - petal.y,
      };
      setPetals((prev) =>
        prev.map((p) => (p.id === petalId ? { ...p, isDragging: true } : p))
      );
    },
    [petals]
  );

  const handleMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!dragRef.current) return;
      e.preventDefault();
      const { clientX, clientY } = getEventPos(e);
      const { id, offsetX, offsetY } = dragRef.current;

      setPetals((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, x: clientX - offsetX, y: clientY - offsetY }
            : p
        )
      );
    },
    []
  );

  const handleEnd = useCallback(() => {
    if (!dragRef.current) return;
    const { id } = dragRef.current;
    dragRef.current = null;
    setPetals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isDragging: false } : p))
    );
  }, []);

  if (width === 0 || height === 0) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ width, height, zIndex: 0 }}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="pointer-events-auto absolute cursor-grab touch-none active:cursor-grabbing"
          style={{
            left: petal.x - petal.size / 2,
            top: petal.y - petal.size / 2,
            width: petal.size * 2.5,
            height: petal.size * 1.5,
            opacity: petal.opacity,
            transform: `rotate(${petal.rotation}deg) ${petal.isDragging ? "scale(1.5)" : ""}`,
            transition: petal.isDragging ? "transform 0.1s" : "none",
            willChange: "left, top, transform",
          }}
          onMouseDown={(e) => handleStart(petal.id, e)}
          onTouchStart={(e) => handleStart(petal.id, e)}
        >
          <svg
            viewBox="0 0 37 20"
            fill={petal.color}
            xmlns="http://www.w3.org/2000/svg"
            className="size-full drop-shadow-sm"
          >
            <path d="M37 2L23 0C23.8 7.2 13.3333 12.3333 8 14C10.5 16.5 17.6 20.9 26 18.5C34.4 16.1 36.8333 6.5 37 2Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default InteractiveConfetti;
