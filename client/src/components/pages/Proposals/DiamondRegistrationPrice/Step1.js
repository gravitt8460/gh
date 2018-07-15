import React, { Component } from "react";
import { Button, Form, Input } from "semantic-ui-react";

export default class Step1 extends Component {
  state = {
    proposedPrice: "",
    proposedPower: ""
  };

  onInputChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
    const { proposedPrice, proposedPower } = this.state;
    const { currentPrice, currentPower, onContinue } = this.props;
    return (
      <Form>
        <Form.Field required>
          <label>
            Proposed Base Price (Current base price: {currentPrice} USD)
          </label>
          <Input
            label="USD"
            labelPosition="left"
            value={proposedPrice}
            name="proposedPrice"
            type="number"
            onChange={this.onInputChange}
          />
        </Form.Field>
        {/* <Form.Input
          required
          fluid
          label={`Proposed Power (Current power: ${currentPower})`}
          value={proposedPower}
          name="proposedPower"
          onChange={this.onInputChange}
        /> */}
        <p style={{ textAlign: "center" }}>
          <Button
            primary
            onClick={() => onContinue(proposedPrice, proposedPower)}
          >
            Continue
          </Button>
        </p>
      </Form>
    );
  }
}
