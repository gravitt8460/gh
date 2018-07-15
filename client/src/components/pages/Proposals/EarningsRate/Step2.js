import React, { Component } from "react";
import { Header, Button, Table } from "semantic-ui-react";

export default class Step2 extends Component {
  renderPropposalDetails() {
    const { currentRate, proposedRate } = this.props;
    return (
      <Table attached="bottom" columns={2} celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Current value</Table.Cell>
            <Table.Cell>{`${currentRate} %`}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Proposed value</Table.Cell>
            <Table.Cell>{`${proposedRate} %`}</Table.Cell>
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
          <Header attached="top">Earnings rate</Header>
          {this.renderPropposalDetails()}
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
