import React, { useEffect, useRef } from "react";
import { CloseCircle } from "iconsax-react";
import { createPortal } from "react-dom";

interface CertificateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

const CertificateDialog: React.FC<CertificateDialogProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, imageUrl]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300"> <div
        ref={dialogRef}
        className="relative bg-gradient-to-br from-[#1E1E1E] to-[#121212] p-6 rounded-lg border border-white/10 w-[90vw] max-w-3xl max-h-[90vh] overflow-auto shadow-2xl transition-all duration-500 animate-fadeIn"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white/90 font-[ybb] text-xl">{title}</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white/90 transition-colors duration-300"
          >
            <CloseCircle size={24} />
          </button>
        </div>
        <div className="relative w-full h-auto overflow-hidden border border-white/10 rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto object-contain max-h-[70vh]"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-certificate.jpg";
            }}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CertificateDialog;
