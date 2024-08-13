import React from "react";

export default function Footer() {
  return (
    <div className="w-full py-4 flex items-center justify-center font-[ybn] border-t border-white/10 mt-6">
      <p className="text-wrap px-14">
        {"© 1403 تمامی حقوق مادی و معنوی این سایت متعلق به "}
        <strong className="text-nowrap">یوسف هاشم زاده</strong>
        {" می باشد."}
      </p>
    </div>
  );
}
