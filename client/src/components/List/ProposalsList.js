import React, { Component } from "react";
import ReactTable from "react-table";
import { Form, Button, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import moment from "moment";
import web3 from "../../ethereum/web3";

const decodeDate = date => moment(date * 1000).format("DD MMMM YYYY");

const decodeProposalType = proposalType => {
  const type = web3.utils.hexToUtf8(proposalType);
  console.log("type = ", type);
  switch (type) {
    case "addMember":
      return "Add a new member";
    case "removeMember":
      return "Remove a member";
    case "setMinimumMemberEligibility":
      return "Change membership eligibility amount";
    case "setEarningsRatePercent":
      return "Change earnings rate for members";
    case "setBasePricePerCarat":
      return "Change diamond registration price";
    case "sendEther":
      return "New expenditure";
    default:
      return "Unknown type";
  }
};

const decodeIcon = proposalType => {
  const type = web3.utils.hexToUtf8(proposalType);
  switch (type) {
    case "addMember":
      return "add user";
    case "removeMember":
      return "remove user";
    case "setMinimumMemberEligibility":
      return "gavel";
    case "setEarningsRatePercent":
      return "percent";
    case "setBasePricePerCarat":
      return "diamond";
    case "sendEther":
      return "payment";
    default:
      return "";
  }
};

const renderProposalDetails = proposal => {
  const { proposalType, addressValue, numValue, stringValue } = proposal;
  const type = web3.utils.hexToUtf8(proposalType);
  switch (type) {
    case "addMember":
    case "removeMember":
      return (
        <Form.Field>
          <label>Member address</label>
          <div>{addressValue}</div>
        </Form.Field>
      );
    case "setMinimumMemberEligibility":
      return (
        <Form.Field>
          <label>Eligibility Amount</label>
          <div>{numValue} BCDE</div>
        </Form.Field>
      );
    case "setEarningsRatePercent":
      return (
        <Form.Field>
          <label>Earnings rate</label>
          <div>{numValue} %</div>
        </Form.Field>
      );
    case "setBasePricePerCarat":
      return (
        <Form.Field>
          <label>Diamond registration price per carat</label>
          <div>{numValue} USD</div>
        </Form.Field>
      );
    case "sendEther":
      return (
        <div>
          <Form.Field>
            <label>Recipient address</label>
            <div>{addressValue}</div>
          </Form.Field>
          <Form.Field>
            <label>Amount to send</label>
            <div>{web3.utils.fromWei(numValue, "ether")} ETH</div>
          </Form.Field>
          <Form.Field>
            <label>Memo</label>
            <div>{stringValue}</div>
          </Form.Field>
        </div>
      );
    default:
      console.log("encountered unknown type ...");
      return null;
  }
};

const Vote = ({ onApprove, onReject }) => (
  <Button.Group>
    <Button color="black" onClick={onReject}>
      Reject
    </Button>
    <Button.Or />
    <Button color="green" onClick={onApprove}>
      Approve
    </Button>
  </Button.Group>
);

class ProposalsList extends Component {
  onApprove = id => this.props.onApprove(id);

  onReject = id => this.props.onReject(id);

  onConclude = id => this.props.onConclude(id);

  renderProposal = proposal => {
    // console.log("proposal = ", proposal);
    const { proposalId, proposalType, proposer, endDate, closed } = proposal;
    return (
      <div style={{ padding: "20px" }}>
        <Form>
          <Form.Field>
            <label>Proposal type</label>
            <div>{decodeProposalType(proposalType)}</div>
          </Form.Field>
          <Form.Field>
            <label>Proposed by</label>
            <div>{proposer}</div>
          </Form.Field>
          <Form.Field>
            <label>End date</label>
            <div>{decodeDate(endDate)}</div>
          </Form.Field>
          {renderProposalDetails(proposal)}
          {/* {closed ? null : (
            <Vote
              onApprove={() => this.onApprove(proposalId)}
              onReject={() => this.onReject(proposalId)}
            />
          )} */}
        </Form>
      </div>
    );
  };

  columns = [
    {
      Header: "",
      id: "icon",
      accessor: d => decodeIcon(d.proposalType),
      maxWidth: 50,
      className: "right",
      Cell: ({ value }) => <Icon name={value} />
    },
    {
      Header: "Proposal type",
      id: "proposalType",
      minWidth: 300,
      accessor: d => decodeProposalType(d.proposalType),
      headerClassName: "column-header"
    },
    {
      Header: "Proposed by",
      accessor: "proposer",
      minWidth: 380,
      maxWidth: 500,
      headerClassName: "column-header"
    },
    {
      Header: "End date",
      id: "date",
      accessor: d => decodeDate(d.endDate),
      maxWidth: 100,
      headerClassName: "column-header"
    },
    {
      Header: "Vote",
      accessor: "proposalId",
      headerClassName: "column-header",
      className: "center",
      minWidth: 300,
      maxWidth: 340,
      Cell: ({ value, original: { closed } }) =>
        closed ? null : (
          <Vote
            onApprove={() => this.onApprove(value)}
            onReject={() => this.onReject(value)}
          />
        )
    },
    {
      Header: "",
      accessor: "proposalId",
      className: "center",
      minWidth: 150,
      maxWidth: 180,
      Cell: ({ value, original: { closed, endDate } }) =>
        closed ||
        moment().diff(moment(endDate * 1000), "minutes") < 0 ? null : (
          <Button color="grey" basic onClick={() => this.onConclude(value)}>
            Conclude
          </Button>
        )
    }
  ];

  render() {
    const { proposals } = this.props;
    return (
      <ReactTable
        data={proposals}
        columns={this.columns}
        defaultPageSize={10}
        minRows={0}
        className="-striped -highlight"
        SubComponent={row => this.renderProposal(row.original)}
        showPageJump={false}
        showPageSizeOptions={false}
        noDataText="No records found"
      />
    );
  }
}

ProposalsList.propTypes = {
  proposals: PropTypes.arrayOf(PropTypes.object).isRequired,
  onApprove: PropTypes.func,
  onReject: PropTypes.func,
  onConclude: PropTypes.func
};

export default ProposalsList;
