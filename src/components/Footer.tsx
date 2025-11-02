import Company from "../assets/icon copy - Copy - Copy 1.svg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer
      className={`flex justify-between px-6 py-7 bg-gradient-to-r from-[#F3FAFE] via-[rgba(204,221,221,0.62)] to-[#F3FAFE] ${
        i18n.language === "fa" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`flex items-center gap-3 ${
          i18n.language === "fa" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <img src={Company} alt="Company" />
        <p className="text-sm leading-6">{t("footerRights")}</p>
      </div>

      <div
        className={`flex gap-10 ${
          i18n.language === "fa" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`flex items-center gap-1 ${
            i18n.language === "fa" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <EmailOutlinedIcon />
          <a className="text-sm leading-6" href="mailto:info@nadin.ir">
            {t("footerContact")}
          </a>
        </div>
        <div
          className={`flex items-center gap-1 ${
            i18n.language === "fa" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <CalendarMonthOutlinedIcon />
          <span className="text-sm leading-6">{t("footerDate")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
