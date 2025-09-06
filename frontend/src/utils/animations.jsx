export const randomFloat = () => {
  const x = Math.random() * 20 - 10; // between -10 and 10
  const y = Math.random() * 20 - 10;
  const rotate = Math.random() * 10 - 5;

  return {
    animate: {
      x: [0, x, 0],
      y: [0, y, 0],
      rotate: [0, rotate, 0],
      transition: {
        duration: 4 + Math.random() * 2, // different speed
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };
};
// Animation Variants for Feature Component
export const featureCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
};
// Animation Variants for Gallery Component
export const textAnimation = {
  initial: { opacity: 0, scale: 0.8, y: 30 },
  animate: { opacity: 1, scale: 1, y: 0 },
};

export const slideVariants = {
  initial: { opacity: 0, scale: 0.9, x: 100 },
  animate: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.9, x: -100 },
};

export const slideTransition = {
  duration: 0.6,
  ease: "easeInOut",
};

//Animation Variants for pricing page
export const headingVariants = {
  initial: { y: -40, opacity: 0, scale: 0.9 },
  animate: { y: 0, opacity: 1, scale: 1 },
  exit: { y: 40, opacity: 0, scale: 0.9 },
};

export const cardContainerVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const cardHoverEffect = {
  rotateX: 6,
  rotateY: -6,
  scale: 1.04,
  transition: { duration: 0.25 },
};

export const menuVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
};

//Shimmer Animations for Overview Section
export const ShimmerActivity = () => {
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="inline-flex w-8 h-8 rounded-xl bg-gray-700 shimmer-bg"></span>
        <div>
          <div className="h-3 w-28 bg-gray-700 rounded mb-2 shimmer-bg"></div>
          <div className="h-2 w-16 bg-gray-700 rounded shimmer-bg"></div>
        </div>
      </div>
      <span className="h-2 w-10 bg-gray-700 rounded shimmer-bg"></span>
    </li>
  );
};
export const ShimmerImage = () => {
  return (
    <div className="rounded-xl overflow-hidden">
      <div className="shimmer-bg w-full aspect-square rounded-xl"></div>
    </div>
  );
};

export const ChatListItemSkeleton = () => {
  return (
    <div className="flex items-center gap-3 p-2">
      <div className="shimmer-bg size-12 shrink-0 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="shimmer-bg h-4 w-1/3 rounded-md"></div>
        <div className="shimmer-bg h-4 w-3/4 rounded-md"></div>
      </div>
    </div>
  );
};
