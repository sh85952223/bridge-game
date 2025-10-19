import { motion } from "framer-motion";

type Props = { label?: string; onClick?: () => void; ariaLabel?: string };

export default function NextFab({
  label = "시작하기",
  onClick,
  ariaLabel = "다음으로 진행",
}: Props) {
  return (
    <motion.button
      aria-label={ariaLabel}
      onClick={onClick}
      className="fixed right-4 bottom-4 safe-bottom btn btn-primary shadow-md"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </motion.button>
  );
}
