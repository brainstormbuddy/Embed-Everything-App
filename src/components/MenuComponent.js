import React from "react";
import {
  MenuButton,
  Menu,
  MenuTitle,
  MenuItem,
} from "monday-ui-react-core";
import {
  CreditCard,
  Duplicate,
  ExternalPage,
  Comment,
  Idea,
  Bug,
  Doc,
  Announcement,
} from "monday-ui-react-core/icons";
import "../css/MenuComponent.css";

const MenuComponent = ({ monday, context }) => {
  const theme = context?.theme;

  const handleMenuItemClick = (action) => {
    switch (action) {
      case "manage_subscription":
        // Execute relevant logic or monday SDK command
        break;
      case "switch_column_mode":
        // Execute relevant logic or monday SDK command
        break;
      case "open_url":
        break;
      case "whats_new":
        // Execute relevant logic or monday SDK command
        break;
      case "documentation":
        // Execute relevant logic or monday SDK command
        break;
      case "report_issue":
        // Execute relevant logic or monday SDK command
        break;
      case "request_feature":
        // Execute relevant logic or monday SDK command
        break;
      case "send_feedback":
        // Execute relevant logic or monday SDK command
        break;
      default:
        break;
    }
  };

  return (
    <div className="menu-container">
      <MenuButton
        className={
          theme === "light"
            ? "menu-button--wrapper"
            : "menu-button--wrapper-dark"
        }
      >
        <Menu
          id="menu"
          size="medium"
          className={
            theme === "light"
              ? "dialog-content--wrapper"
              : "dialog-content--wrapper-dark"
          }
        >
          <MenuTitle
            caption="Embed Anything - Up to 2 seats"
            captionPosition="top"
          />
          <MenuItem
            className={theme === "dark" && "menu-item--wrapper-dark"}
            icon={CreditCard}
            iconType="SVG"
            onClick={() => handleMenuItemClick("manage_subscription")}
            title="Manage subscription"
          />
          <MenuItem
            className={theme === "dark" && "menu-item--wrapper-dark"}
            icon={Duplicate}
            iconType="SVG"
            onClick={() => handleMenuItemClick("switch_mode")}
            title="Switch to single column mode"
          />
          <MenuItem
            className={theme === "dark" && "menu-item--wrapper-dark"}
            icon={ExternalPage}
            iconType="SVG"
            onClick={() => handleMenuItemClick("open_url")}
            title="Open URL in new tab"
          />
          <MenuItem
            className={theme === "dark" && "menu-item--wrapper-dark"}
            icon={Announcement}
            iconType="SVG"
            onClick={() => handleMenuItemClick("whats_new")}
            title="What's new"
          />
          <MenuItem
            className={theme === "dark" && "menu-item--wrapper-dark"}
            icon={Doc}
            iconType="SVG"
            onClick={() => handleMenuItemClick("documentation")}
            title="Documentation"
          />
          <MenuItem
            className={theme === "dark" && "menu-item--wrapper-dark"}
            icon={Bug}
            iconType="SVG"
            onClick={() => handleMenuItemClick("report_issue")}
            title="Report an issue"
          />
          <MenuItem
            className={theme === "dark" && "menu-item--wrapper-dark"}
            icon={Idea}
            iconType="SVG"
            onClick={() => handleMenuItemClick("request_feature")}
            title="Request a feature"
          />
          <MenuItem
            className={theme === "dark" && "menu-item--wrapper-dark"}
            icon={Comment}
            iconType="SVG"
            onClick={() => handleMenuItemClick("send_feedback")}
            title="Send us feedback"
          />
        </Menu>
      </MenuButton>
    </div>
  );
};

export default MenuComponent;
