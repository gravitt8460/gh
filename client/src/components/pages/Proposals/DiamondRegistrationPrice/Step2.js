import React, { Component } from "react";
import { Header, Button, Table } from "semantic-ui-react";

export default class Step2 extends Component {
  renderPriceDetails() {
    const { currentPrice, proposedPrice } = this.props;
    return (
      <Table attached="bottom" columns={2} celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>Current value</Table.Cell>
            <Table.Cell>
              {currentPrice}
              {` USD`}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>Proposed new value</Table.Cell>
            <Table.Cell>
              {proposedPrice}
              {` USD`}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

  renderPowerDetails() {
    const { currentPower, proposedPower } = this.props;
    return (
      <Table attached="bottom" columns={2} celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>Current value</Table.Cell>
            <Table.Cell>{currentPower}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>Proposed new value</Table.Cell>
            <Table.Cell>{proposedPower}</Table.Cell>
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
          <Header attached="top">Base Price</Header>
          {this.renderPriceDetails()}
        </div>
        {/* <div style={{ marginBottom: "1em" }}>
          <Header attached="top">Power</Header>
          {this.renderPowerDetails()}
        </div> */}
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
