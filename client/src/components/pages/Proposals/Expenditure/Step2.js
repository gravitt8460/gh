import React, { Component } from "react";
import { Header, Button, Table } from "semantic-ui-react";

export default class Step2 extends Component {
  renderExpenditureDetails() {
    const { recipient, amount, memo } = this.props;
    return (
      <Table attached="bottom" columns={2} celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>Recipient address</Table.Cell>
            <Table.Cell>{recipient}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>Amount to send</Table.Cell>
            <Table.Cell>
              {amount}
              {` ETH`}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>Memo</Table.Cell>
            <Table.Cell>{memo}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

  render() {
    const { onCancel, onConfirm } = this.props;
    return (
      <div>
        <div style={{ marginBottom: "1em" }}>
          <Header attached="top">Details</Header>
          {this.renderExpenditureDetails()}
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
