import { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ColorModeContext } from "../context/ColorModeContext";

const SettingsMenu = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { darkMode, toggleDarkMode } = useContext(ColorModeContext);
  const [language, setLanguage] = useState<"fa" | "en">("en");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          minWidth: 0,
          p: 1,
          borderRadius: "8px",
          borderColor: open
            ? "--color-primary-blue"
            : "var(--color-gray-light)",
          backgroundColor: open ? "var(--color-light-blue-alt)" : "transparent",
        }}
        onClick={handleClick}
      >
        <SettingsIcon
          sx={{
            color: open ? "--color-primary-blue" : "var(--color-gray-light)",
          }}
        />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
            px: 3,
          }}
        >
          <Typography>{t("mode")}</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              border: 1,
              borderRadius: 1,
              p: 1,
              width: 180,
            }}
          >
            {/* Light */}
            <Box
              onClick={() => {
                if (darkMode) toggleDarkMode();
              }}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <WbSunnyOutlinedIcon
                sx={{
                  color: !darkMode ? "var(--color-primary-blue)" : "gray",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: !darkMode ? "var(--color-primary-blue)" : "gray",
                }}
              >
                {t("light")}
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            {/* Dark */}
            <Box
              onClick={() => {
                if (!darkMode) toggleDarkMode();
              }}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <BedtimeOutlinedIcon
                sx={{
                  color: darkMode ? "var(--color-primary-blue)" : "gray",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: darkMode ? "var(--color-primary-blue)" : "gray",
                }}
              >
                {t("dark")}
              </Typography>
            </Box>
          </Box>
        </MenuItem>

        <Divider />

        <MenuItem
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
            px: 3,
          }}
        >
          <Typography>{t("language")}</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              border: 1,
              borderRadius: 1,
              p: 1,
              alignItems: "center",
              width: 180,
            }}
          >
            {/* EN */}
            <Box
              onClick={() => {
                setLanguage("en");
                i18n.changeLanguage("en");
              }}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                cursor: "pointer",
                color: language === "en" ? "var(--color-primary-blue)" : "gray",
              }}
            >
              <Typography variant="body2">EN</Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />
            {/* FA */}
            <Box
              onClick={() => {
                setLanguage("fa");
                i18n.changeLanguage("fa");
              }}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                cursor: "pointer",
                color: language === "fa" ? "var(--color-primary-blue)" : "gray",
              }}
            >
              <Typography variant="body2">FA</Typography>
            </Box>
          </Box>
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            navigate("/login");
            handleClose();
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("exit")}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SettingsMenu;
