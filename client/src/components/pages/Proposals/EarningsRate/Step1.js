import React, { Component } from "react";
import { Button, Form, Label, Input } from "semantic-ui-react";

export default class Step1 extends Component {
  state = {
    proposedRate: ""
  };

  onInputChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
    const { proposedRate } = this.state;
    const { currentRate, onContinue } = this.props;

    return (
      <Form>
        <Form.Field>
          <label>Current earnings rate for BCDE holders</label>
          <Label size="large">
            {currentRate}
            <Label.Detail>%</Label.Detail>
          </Label>
        </Form.Field>
        <Form.Field>
          <label>Enter new value</label>
          <Input
            focus
            label="%"
            labelPosition="right"
            value={proposedRate}
            name="proposedRate"
            type="number"
            onChange={this.onInputChange}
          />
        </Form.Field>
        <p style={{ textAlign: "center" }}>
          <Button primary onClick={() => onContinue(proposedRate)}>
            Continue
          </Button>
        </p>
      </Form>
    );
  }
}
