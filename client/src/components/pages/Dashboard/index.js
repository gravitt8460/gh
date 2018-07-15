import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
//import Proposals from "./Proposals";
import Products from "./Products";

export default class Dashboard extends Component {
  render() {
    return (
      <Grid padded>
        <Grid.Column>
          <Products />
        </Grid.Column>
      </Grid>
    );
  }
}
