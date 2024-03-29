import React from "react";
import { MenuButton, Menu, MenuTitle, MenuItem } from "monday-ui-react-core";
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

const MenuComponent = () => {
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
      <MenuButton className="menu-button--wrapper">
        <Menu id="menu" size="medium" className="dialog-content--wrapper">
          <MenuTitle
            caption="Embed Anything - Up to 2 seats"
            captionPosition="top"
          />
          <MenuItem
            icon={CreditCard}
            iconType="SVG"
            onClick={() => handleMenuItemClick("manage_subscription")}
            title="Manage subscription"
          />
          <MenuItem
            icon={Duplicate}
            iconType="SVG"
            onClick={() => handleMenuItemClick("switch_mode")}
            title="Switch to single column mode"
          />
          <MenuItem
            icon={ExternalPage}
            iconType="SVG"
            onClick={() => handleMenuItemClick("open_url")}
            title="Open URL in new tab"
          />
          <MenuItem
            icon={Announcement}
            iconType="SVG"
            onClick={() => handleMenuItemClick("whats_new")}
            title="What's new"
          />
          <MenuItem
            icon={Doc}
            iconType="SVG"
            onClick={() => handleMenuItemClick("documentation")}
            title="Documentation"
          />
          <MenuItem
            icon={Bug}
            iconType="SVG"
            onClick={() => handleMenuItemClick("report_issue")}
            title="Report an issue"
          />
          <MenuItem
            icon={Idea}
            iconType="SVG"
            onClick={() => handleMenuItemClick("request_feature")}
            title="Request a feature"
          />
          <MenuItem
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
