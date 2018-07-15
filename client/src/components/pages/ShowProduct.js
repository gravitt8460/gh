import React, { Component } from "react";
import * as api from "../../api";
import { Container, Search, Grid, Header, Segment } from "semantic-ui-react";

export default class ShowProduct extends Component {
  state = {
    product: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    this.fetchProduct(id);
  }

  fetchProduct = async id => {
    const product = await api.fetchProduct(id);
    console.log("product = ", product);
    this.setState({ product });
  };

  render() {
    const { product } = this.state;
    const { locations } = product;
    const productDetails = {
      itemId: product.itemId,
      brand: product.brand,
      title: product.title,
      sku: product.sku,
      serial: product.serial,
      dob: product.dob,
      mfg_loc: product.mfg_loc
    };

    return (
      <Container>
        <Segment>
          <Header>Product</Header>
          <pre style={{ overflowX: "auto" }}>
            {JSON.stringify(productDetails, null, 2)}
          </pre>
          <Header>Location history</Header>
          <pre style={{ overflowX: "auto" }}>
            {JSON.stringify(locations, null, 2)}
          </pre>
        </Segment>
      </Container>
    );
  }
}
