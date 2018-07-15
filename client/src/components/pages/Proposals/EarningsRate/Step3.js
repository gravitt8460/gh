import React from "react";
import { Button, Header, Table } from "semantic-ui-react";

const renderProposalDetails = (data = {}) => {
  const { currentRate, proposedRate, transactionHash } = data;
  return (
    <div>
      <Header as="h5" attached="top">
        New proposal Information
      </Header>
      <Table columns={2} attached>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Confirmation Number</Table.Cell>
            <Table.Cell style={{ fontSize: "0.8em" }}>
              {transactionHash}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Proposal type</Table.Cell>
            <Table.Cell>Earnings rate for BCDE holders</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Current rate</Table.Cell>
            <Table.Cell>{`${currentRate} %`}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Proposed rate</Table.Cell>
            <Table.Cell>{`${proposedRate} %`}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default ({ data = {}, onProposeNew }) => {
  return (
    <div>
      <div style={{ marginBottom: "1em" }}>{renderProposalDetails(data)}</div>
      <p style={{ textAlign: "center" }}>
        <Button primary onClick={onProposeNew}>
          Create another proposal
        </Button>
      </p>
    </div>
  );
};
