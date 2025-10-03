import React, { memo } from "react";

// Memoized for better performance
const Footer = memo(function Footer() {
  return (
    <div className="relative w-full py-[3vh] pr-[3vw] flex flex-col items-center justify-center font-[ybn] 2xl:text-lg border-t border-white/10 mt-0 mb-0 bg-black/20 backdrop-blur-sm">
      {/* Subtle gradient at the top of footer */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#8C9EFF]/30 to-[#0F3D3E]/30"></div>

      {/* Footer content with subtle animation */}
      <p className="text-wrap text-white/80 px-14 lg:px-0 relative z-10 group">
        {`© ${
          new Date().toLocaleDateString("fa-IR").split("/")[0]
        } تمامی حقوق مادی و معنوی این سایت متعلق به `}
        <strong className="text-nowrap relative">
          یوسف هاشم زاده
          <span className="absolute -bottom-1 right-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-[#8C9EFF] to-[#0F3D3E] transition-all duration-700"></span>
        </strong>
        {" می باشد."}
      </p>
    </div>
  );
});

export default Footer;
