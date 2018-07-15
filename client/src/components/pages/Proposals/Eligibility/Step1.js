import React, { Component } from "react";
import { Button, Form, Label, Input } from "semantic-ui-react";

export default class Step1 extends Component {
  state = {
    amount: ""
  };

  onInputChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
    const { amount } = this.state;
    const { currentAmount, onContinue } = this.props;

    return (
      <Form>
        <Form.Field>
          <label>Current Member Eligiblity Amount</label>
          <Label size="large">
            {currentAmount}
            <Label.Detail>BCDE</Label.Detail>
          </Label>
        </Form.Field>
        <Form.Field>
          <label>Enter new value</label>
          <Input
            focus
            label="BCDE"
            labelPosition="right"
            value={amount}
            name="amount"
            type="number"
            onChange={this.onInputChange}
          />
        </Form.Field>
        <p style={{ textAlign: "center" }}>
          <Button primary onClick={() => onContinue(amount)}>
            Continue
          </Button>
        </p>
      </Form>
    );
  }
}
