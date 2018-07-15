import React, { Component } from "react";
import { Form, Button, Input, Message, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Eos from "eosjs";

import * as api from "../../api";

export default class NewProduct extends Component {
  state = {
    title: "",
    mfg_loc: "",
    brand: "",
    sku: "",
    serial: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, errorMessage: "" });
    const { title, mfg_loc, brand, sku, serial } = this.state;

    try {
      const result = await api.createProduct({
        title,
        serial,
        brand,
        mfg_loc,
        sku
      });
      console.log("create product success. result = ", result);
      this.props.history.push("/");
    } catch (e) {
      const error = "create product failed.";
      console.log(`${error} Reason: ${e}`);
    }

    this.setState({ loading: false });
  };

  render() {
    const {
      title,
      mfg_loc,
      brand,
      sku,
      serial,
      errorMessage,
      loading
    } = this.state;
    return (
      <Container>
        <Link to={`/`}>Back</Link>
        <h3>Create a product</h3>
        <Form onSubmit={this.onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label>Title</label>
            <Input
              value={title}
              onChange={e => this.setState({ title: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Serial Number</label>
            <Input
              value={serial}
              onChange={e => this.setState({ serial: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Brand</label>
            <Input
              value={brand}
              onChange={e => this.setState({ brand: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <Input
              value={mfg_loc}
              onChange={e => this.setState({ mfg_loc: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>SKU</label>
            <Input
              value={sku}
              onChange={e => this.setState({ sku: e.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={errorMessage} />
          <Button loading={loading} primary>
            Create
          </Button>
        </Form>
      </Container>
    );
  }
}
