import React from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import moment from "moment";

const Proposal = ({
  onApprove,
  onReject,
  onConclude,
  proposer,
  endDate,
  proposalType,
  closed,
  addressValue
}) => (
  <Table.Row>
    <Table.Cell collapsing>{proposer}</Table.Cell>
    <Table.Cell collapsing>{addressValue}</Table.Cell>
    <Table.Cell collapsing>
      {moment(endDate * 1000).format("DD MMMM YYYY")}
    </Table.Cell>
    <Table.Cell>{web3.utils.hexToUtf8(proposalType)}</Table.Cell>

    <Table.Cell textAlign="center" collapsing>
      {closed ? null : (
        <Button.Group vertical>
          <Button color="green" onClick={onApprove}>
            Approve
          </Button>
          <Button.Or />
          <Button color="black" onClick={onReject}>
            Reject
          </Button>
        </Button.Group>
      )}
    </Table.Cell>
    <Table.Cell textAlign="center" collapsing>
      {closed || moment().diff(moment(endDate * 1000), "minutes") < 0 ? null : (
        <Button color="grey" basic onClick={onConclude}>
          Conclude
        </Button>
      )}
    </Table.Cell>
  </Table.Row>
);

export default Proposal;
