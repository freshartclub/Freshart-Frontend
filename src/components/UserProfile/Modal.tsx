import { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children, dark }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${dark ? "bg-black/70" : "bg-black/50"}`}>
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative z-10 md:w-[40%] sm:w-[50%] w-[90%] max-h-full overflow-y-auto">{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
