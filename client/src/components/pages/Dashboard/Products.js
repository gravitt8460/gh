import React, { Component } from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Item,
  Label
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import productIcon from "../../../images/box.png";
import moment from "moment";

import { fetchProducts } from "../../../api";

class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      products: []
    };
  }

  async componentDidMount() {
    try {
      const results = await this.products();
      console.log("results = ", results);
      this.setState({ products: results });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  products() {
    return fetchProducts();
  }

  handleProductClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  };

  renderProductsList = products => {
    console.log("renderProductsList products = ", products);
    return [{}].concat(products).map(
      (product, i) =>
        i !== 0 ? (
          <Item key={i}>
            <Item.Image src={productIcon} className="item-avatar icon" />

            <Item.Content>
              <Item.Header
                as="a"
                href={`/products/${product.serial}`}
                onClick={this.handleProductClick}
              >
                {product.title}
              </Item.Header>
              <Item.Meta>
                <p>Serial: {product.serial}</p>
                <p>SKU: {product.sku}</p>
                <p>Brand: {product.brand}</p>
                <p>Location of manufacture: {product.mfg_loc}</p>
                <p>
                  Date of manufacture:{" "}
                  {moment(product.dob * 1000).format("DD MMMM YYYY")}
                </p>
              </Item.Meta>
              <Item.Extra>
                <Button
                  floated="right"
                  primary
                  href={`/products/${product.serial}`}
                  onClick={this.handleProductClick}
                >
                  View
                  <Icon name="right chevron" />
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ) : (
          <Item
            key="new"
            href="/products/new"
            onClick={this.handleProductClick}
          >
            <h4>
              <b>{"\uFF0B"}</b> Create a new product
            </h4>
          </Item>
        )
    );
  };

  render() {
    return (
      <div className="products">
        <Container className="list" text>
          <Header
            as="h1"
            content="Products"
            // style={style.h3}
            className="list-header"
            textAlign="center"
          />
          <Item.Group divided>
            {!this.state.isLoading &&
              this.renderProductsList(this.state.products)}
          </Item.Group>
        </Container>
      </div>
    );
  }
}

export default withRouter(ProductsList);
