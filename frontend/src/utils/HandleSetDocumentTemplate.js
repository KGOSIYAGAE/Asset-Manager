import { getTodayDate } from "./helperMethods";

export const HandleSetDocumentTemplate = (documentTemplate, userData, deviceData, signaturesData, setHtmlContent) => {
  const IMAGE_DATA = {
    spu_logo: "/SPU-logo-1024x1024.jpg",
    ict_banner: "/ict-banner.png",
    header_image: "/images/header.png",
    page_banner: "/page_banner.png",
    ict_banner_image: "/page_banner.png",
  };

  const year = new Date().getFullYear();
  const date = getTodayDate();

  const rawHtml = typeof documentTemplate === "String" ? documentTemplate : documentTemplate?.[0]?.template_content;

  if (!rawHtml) return;

  const finalTemplateData = { ...IMAGE_DATA, ...userData, ...deviceData, ...signaturesData, year, date };

  const replacePlaceholder = (template, data) => {
    if (typeof template !== "string") return "";

    return template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (match, key) => {
      // Only replace if the key exists in data and is not null/undefined
      return data[key] !== undefined && data[key] !== null ? data[key] : "";
    });
  };

  return setHtmlContent(replacePlaceholder(rawHtml, finalTemplateData));
};
