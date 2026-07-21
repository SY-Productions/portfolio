import React, { memo, useState } from "react";
import { Event } from "./Events";
import Image from "next/image";
import { DocumentText } from "iconsax-react";
import CertificateDialog from "./CertificateDialog";
import { useLang } from "@/app/context/LanguageContext";

interface EventCardProps {
  event: Event;
  lang?: string;
}

const EventCard = ({ event, lang }: EventCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useLang();

  const handleOpenDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const displayName =
    lang === "en" && event.nameEn
      ? event.nameEn
      : lang === "ar" && event.nameAr
      ? event.nameAr
      : event.name;

  const displayDesc =
    lang === "en" && event.descriptionEn
      ? event.descriptionEn
      : lang === "ar" && event.descriptionAr
      ? event.descriptionAr
      : event.description;

  return (
    <>
      <div className="glass-card group w-[80vw] max-w-[500px] lg:w-[30vw] min-w-[150px] h-auto min-h-[12rem] overflow-hidden mx-auto flex flex-col font-[ybn] cursor-pointer">
        <div className="PIC&CAlENDAR flex items-start w-full p-5 relative">
          <div className="overflow-hidden border border-white/10 rounded-none aspect-square">
            <Image
              className="aspect-square transition-all duration-300"
              width={60}
              height={60}
              src={event.picture}
              alt={displayName}
            />
          </div>

          <div className="absolute end-5 top-5 z-10 bg-gradient-to-r from-[#3B070A]/20 to-[#3A0D12]/20 rounded-none flex items-center justify-center h-8 w-28 text-xs text-white/80 border border-white/10 backdrop-blur-md">
            {event.date}
          </div>
        </div>

        <div className="NAME&DESC flex flex-col px-5">
          <div className="relative text-lg pb-2 text-white font-bold break-words">
            {displayName}
          </div>

          {displayDesc && (
            <div className="text-sm pb-3 text-white/60 leading-6 break-words">
              {displayDesc}
            </div>
          )}

          {event.attachment && (
            <div className="pb-5">
              <button
                type="button"
                onClick={handleOpenDialog}
                className="flex items-center gap-2 text-xs font-[ybn] px-3 py-2 bg-[#3B070A]/40 hover:bg-[#5A0E12]/60 border border-[#5A0E12]/40 hover:border-[#5A0E12]/70 text-white/70 hover:text-white transition-all duration-300 relative z-20"
              >
                <DocumentText size={14} />
                {t("events.viewCertificate")}
              </button>
            </div>
          )}
        </div>
      </div>

      {event.attachment && (
        <CertificateDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          imageUrl={event.attachment}
          title={displayName}
        />
      )}
    </>
  );
};

export default memo(EventCard);
