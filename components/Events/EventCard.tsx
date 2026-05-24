import React, { memo, useState } from "react";
import { Event } from "./Events";
import Image from "next/image";
import { Calendar, DocumentText } from "iconsax-react";
import CertificateDialog from "./CertificateDialog";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Opening dialog with attachment:", event.attachment);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="group w-[80vw] lg:w-[30vw] min-w-[150px] h-auto min-h-[12rem] bg-black/20 border border-white/10 hover:border-white/20 backdrop-blur-2xl rounded-none mx-auto flex flex-col font-[ybn] transition-all duration-300 hover:-translate-y-1 cursor-pointer ease-in-out relative before:absolute before:content-[''] before:bottom-0 before:left-0 before:w-0 before:h-0 hover:before:w-full hover:before:h-full before:transition-all before:duration-500 before:border-l before:border-b before:border-[#3A0D12]/50 hover:after:w-full hover:after:h-full after:absolute after:content-[''] after:top-0 after:right-0 after:w-0 after:h-0 after:transition-all after:duration-500 after:border-t after:border-r after:border-[#3B070A]/50 after:transition-delay-300">
        <div className="PIC&CAlENDAR flex items-start w-full m-4 relative">
          <div className="overflow-hidden border border-white/10 rounded-none aspect-square">
            <Image
              className="aspect-square transition-all duration-300"
              width={60}
              height={60}
              src={event.picture}
              alt={event.name}
            />
          </div>

          <div className="absolute left-4 top-[0.75rem] z-10 bg-gradient-to-r from-[#3B070A]/20 to-[#3A0D12]/20 rounded-none flex items-center justify-center h-8 w-28 text-xs text-white/80 border border-white/10 backdrop-blur-md">
            {event.date}
          </div>
        </div>

        <div className="NAME&DESC flex flex-col px-4">
          <div className="relative text-lg py-2 text-white font-bold">
            {event.name}
          </div>

          {event.description && (
            <div className="text-sm pb-3 text-white/60 leading-6">
              {event.description}
            </div>
          )}

          {event.attachment && (
            <div className="pb-6">
              <button
                type="button"
                onClick={handleOpenDialog}
                className="flex items-center gap-2 text-[#3A0D12] hover:text-[#3B070A] transition-colors duration-300 text-sm font-[ybn] relative z-20"
              >
                <DocumentText size={16} />
                مشاهده مدرک
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
          title={event.name}
        />
      )}
    </>
  );
};

export default memo(EventCard);
