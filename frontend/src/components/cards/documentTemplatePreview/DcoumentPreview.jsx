import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

function DcoumentPreview({ documentTemplate, showPreview, setShowPreview }) {
  const [htmlContent, setHtmlContent] = useState();

  useEffect(() => {
    setHtmlContent(replacePlaceholder(documentTemplate, imageData));
  }, [showPreview]);

  const imageData = {
    spu_logo: "/SPU-logo-1024x1024.jpg",
    ict_banner: "/ict-banner.png",
    header_image: "/images/header.png",
    page_banner: "/page_banner.png",
  };

  const replacePlaceholder = (template, data) => {
    return template.replace(/{{\s*(spu_logo|ict_banner|header_image|page_banner)\s*}}/g, (_, key) => data[key] ?? "");
  };

  return (
    <div className="w-fit h-[690px] flex flex-col gap-3  bg-white rounded-md pt-2  ">
      <div
        onClick={() => {
          setShowPreview(false);
        }}
        className="flex justify-end items-center text-black hover:text-red-500 p-2"
      >
        <IoMdClose size={25} />
      </div>
      <div className="rounded-md" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}

export default DcoumentPreview;
