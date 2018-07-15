import React, { Component } from "react";
import { Button, Form, TextArea, Input } from "semantic-ui-react";

export default class Step1 extends Component {
  state = {
    address: "",
    amount: "",
    memo: ""
  };

  onInputChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
    const { address, amount, memo } = this.state;
    const { onContinue } = this.props;
    return (
      <Form>
        <Form.Input
          required
          fluid
          label="Address of recipient"
          placeholder="e.g.  0x0fABD33A3B552ea44fA736F5F5854672e71Ad978"
          value={address}
          name="address"
          onChange={this.onInputChange}
        />
        <Form.Field required>
          <label>Amount to send</label>
          <Input
            label="ETH"
            labelPosition="left"
            value={amount}
            name="amount"
            type="number"
            onChange={this.onInputChange}
          />
        </Form.Field>
        <Form.Field required>
          <label>Memo</label>
          <TextArea
            rows={6}
            autoHeight
            value={memo}
            name="memo"
            onChange={this.onInputChange}
          />
        </Form.Field>
        <p style={{ textAlign: "center" }}>
          <Button primary onClick={() => onContinue(address, amount, memo)}>
            Continue
          </Button>
        </p>
      </Form>
    );
  }
}
