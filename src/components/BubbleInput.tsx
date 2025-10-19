import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  anchorRect: DOMRect | null;
  label: string;
  placeholder?: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
};

export default function BubbleInput({
  open, anchorRect, label, placeholder="입력하세요", onClose, onSubmit
}: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
    else setValue("");
  }, [open]);

  const style: React.CSSProperties = anchorRect
    ? {
        position: "fixed",
        top: Math.min(window.innerHeight - 200, anchorRect.top + anchorRect.height + 12),
        left: Math.max(12, Math.min(anchorRect.left - 60, window.innerWidth - 300)),
      }
    : { position: "fixed", top: "40%", left: 10 };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-40" onClick={onClose}
            initial={{opacity:0}} animate={{opacity:0}} exit={{opacity:0}} />
          <motion.div className="z-50" style={style}
            initial={{y:10,opacity:0,scale:.98}} animate={{y:0,opacity:1,scale:1}} exit={{y:10,opacity:0,scale:.98}}>
            <div className="bubble-card">
              <div className="bubble-arrow" />
              <div className="bubble-label text-xs font-bold text-[color:var(--color-primary)]">{label}</div>
              <input
                ref={inputRef}
                className="bubble-input"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSubmit(value)}
              />
              <div className="bubble-actions">
                <button className="btn btn-secondary btn-44" onClick={onClose}>닫기</button>
                <button className="btn btn-primary btn-44" onClick={() => onSubmit(value)}>확인</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
