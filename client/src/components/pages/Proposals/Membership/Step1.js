import React, { Component } from "react";
import { Button, Form, Icon } from "semantic-ui-react";

export default class Step1 extends Component {
  state = {
    name: "",
    address: ""
  };

  onInputChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
    const { name, address } = this.state;
    const { onAddMember, onRemoveMember } = this.props;

    return (
      <Form>
        {/* <Form.Input
          required
          fluid
          label="Enter member's name"
          placeholder="Member name"
          value={name}
          name="name"
          onChange={this.onInputChange}
        /> */}
        <Form.Input
          required
          fluid
          label="Enter member's address"
          placeholder="Member address"
          value={address}
          name="address"
          onChange={this.onInputChange}
        />
        <p style={{ textAlign: "center" }}>
          <Button
            primary
            icon
            labelPosition="left"
            onClick={() => onAddMember(address, name)}
            size="large"
            style={{ width: "240px", padding: "20px", margin: "10px" }}
          >
            <Icon name="add user" size="large" />
            Propose to <br />Add member
          </Button>

          <Button
            secondary
            icon
            labelPosition="left"
            onClick={() => onRemoveMember(address, name)}
            size="large"
            style={{ width: "240px", padding: "20px", margin: "10px" }}
          >
            <Icon name="remove user" />
            Propose to Remove member
          </Button>
        </p>
      </Form>
    );
  }
}
