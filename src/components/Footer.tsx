import Company from "../assets/icon copy - Copy - Copy 1.svg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ColorModeContext } from "../context/ColorModeContext";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const { darkMode } = useContext(ColorModeContext);

  return (
    <footer
      className={`flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 px-6 py-7 
        
        ${
          darkMode
            ? "bg-linear-to-r from-[#292F45] via-[#3F4861] to-[#151D32]"
            : "bg-linear-to-r from-[#F3FAFE] via-[rgba(204,221,221,0.62)] to-[#F3FAFE]"
        }
        ${i18n.language === "fa" ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      <div
        className={`flex items-center gap-3 text-center md:text-left
          ${i18n.language === "fa" ? "flex-row-reverse" : "flex-row"}`}
      >
        <img
          src={Company}
          alt="Company"
          className="w-6 h-6 md:w-auto md:h-auto"
        />
        <p className="text-sm leading-6">{t("footerRights")}</p>
      </div>

      <div
        className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-8
          ${i18n.language === "fa" ? "sm:flex-row-reverse" : "sm:flex-row"}`}
      >
        <div
          className={`flex items-center gap-1 
            ${i18n.language === "fa" ? "flex-row-reverse" : "flex-row"}`}
        >
          <EmailOutlinedIcon fontSize="small" />
          <a className="text-sm leading-6" href="mailto:info@nadin.ir">
            {t("footerContact")}
          </a>
        </div>

        <div
          className={`flex items-center gap-1 
            ${i18n.language === "fa" ? "flex-row-reverse" : "flex-row"}`}
        >
          <CalendarMonthOutlinedIcon fontSize="small" />
          <span className="text-sm leading-6">{t("footerDate")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
