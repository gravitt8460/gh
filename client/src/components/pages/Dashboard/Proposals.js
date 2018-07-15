import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../actions";
import { getActiveProposals, getPastProposals } from "../../../reducers";
import ProposalsList from "../../List/ProposalsList";

class Proposals extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchProposals } = this.props;
    fetchProposals();
  }

  onApprove = id => {
    console.log("approve proposal = ", id);
    const { approveProposal } = this.props;
    approveProposal(id);
  };

  onReject = id => {
    console.log("reject proposal = ", id);
    const { rejectProposal } = this.props;
    rejectProposal(id);
  };

  onConclude = id => {
    console.log("process (conclude) proposal = ", id);
    const { processProposal } = this.props;
    processProposal(id);
  };

  renderTabPanes = () => [
    {
      menuItem: "Active Proposals",
      render: () => (
        <Tab.Pane>
          <ProposalsList
            proposals={this.props.activeProposals}
            onApprove={this.onApprove}
            onReject={this.onReject}
            onConclude={this.onConclude}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Past Proposals",
      render: () => (
        <Tab.Pane>
          <ProposalsList proposals={this.props.pastProposals} />
        </Tab.Pane>
      )
    }
  ];

  render() {
    return <Tab panes={this.renderTabPanes()} />;
  }
}

Proposals.propTypes = {
  fetchProposals: PropTypes.func.isRequired,
  activeProposals: PropTypes.arrayOf(PropTypes.object).isRequired,
  pastProposals: PropTypes.arrayOf(PropTypes.object).isRequired,
  approveProposal: PropTypes.func.isRequired,
  rejectProposal: PropTypes.func.isRequired,
  processProposal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  activeProposals: getActiveProposals(state),
  pastProposals: getPastProposals(state)
});

const ProposalsWithRouter = withRouter(
  connect(
    mapStateToProps,
    actions
  )(Proposals)
);

export default ProposalsWithRouter;
