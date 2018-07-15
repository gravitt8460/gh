import React, { Component } from "react";
import { Header, Button, Table } from "semantic-ui-react";

export default class Step2 extends Component {
  renderMemberDetails(member) {
    return (
      <Table attached="bottom" columns={2} celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Address</Table.Cell>
            <Table.Cell>{member}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

  render() {
    const { proposal, member, onCancel, onConfirm } = this.props;
    return (
      <div>
        <Header as="h5" dividing>
          Proposal type:
        </Header>
        <p>{proposal}</p>
        <div style={{ marginBottom: "1em" }}>
          <Header attached="top">Member's Information</Header>
          {this.renderMemberDetails(member)}
        </div>
        <p style={{ textAlign: "center" }}>
          <Button basic secondary onClick={onCancel}>
            Cancel
          </Button>
          <Button primary onClick={onConfirm}>
            Confirm
          </Button>
        </p>
      </div>
    );
  }
}
