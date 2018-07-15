import React from "react";
import { Segment, Menu, Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import logo from "../../images/oc_logo.png";

const TopNavigation = () => (
  <Segment inverted className="app-header">
    <Menu inverted secondary>
      <Menu.Item style={{ marginRight: "5.0em", fontSize: "1.4em" }}>
        <Image size="mini" src={logo} />
        Trakit
      </Menu.Item>
      <Menu.Item as={NavLink} exact to="/">
        Dashboard
      </Menu.Item>
    </Menu>
  </Segment>
);

export default TopNavigation;
