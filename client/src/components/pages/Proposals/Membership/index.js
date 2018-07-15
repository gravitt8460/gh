import React, { Component } from "react";
import { Grid, Container, Header } from "semantic-ui-react";
import Steps from "./Steps";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

// import ConsortiumContract from "../../../../ethereum/consortium";
// import web3 from "../../../../ethereum/web3";
import * as api from "../../../../api";

const steps = {
  1: {
    number: 1,
    info: "Add / Remove a Consortium member"
  },
  2: {
    number: 2,
    info: "Review member details"
  },
  3: {
    number: 3,
    info: "Proposal submission successful"
  }
};

const proposals = {
  add: "Add member",
  remove: "Remove member"
};

export default class Membership extends Component {
  state = {
    currentStep: 1,
    member: "",
    proposalType: null,
    transactionHash: null,
    error: null,
    loading: false
  };

  initialState = {
    ...this.state
  };

  onAddMember = address => {
    this.setProposal("add", address);
  };

  onRemoveMember = address => {
    this.setProposal("remove", address);
  };

  setProposal(proposalType, member) {
    this.setState({
      proposalType,
      member
    });
    this.goToStep(2);
  }

  onCancel = () => {
    this.setState(
      {
        ...this.initialState
      },
      () => this.goToStep(1)
    );
  };

  onConfirm = () => {
    const { member, proposalType } = this.state;
    proposalType === "add"
      ? this.proposeAddMember(member)
      : this.proposeRemoveMember(member);
  };

  async proposeAddMember(member) {
    this.setState({
      loading: true
    });

    try {
      /*
      const accounts = await web3.eth.getAccounts();
      const {
        transactionHash
      } = await ConsortiumContract.methods.proposeAddMember(member).send({
        from: accounts[0]
      });
      */
      const { transactionHash } = await api.addMember(member);
      console.log("proposeAddMember transactionHash = ", transactionHash);
      this.setState({ transactionHash });
      this.goToStep(3);
    } catch (e) {
      const error = "Proposal to add a new member failed.";
      console.log(`${error} Reason: ${e}`);
    }

    this.setState({
      loading: false
    });
  }

  async proposeRemoveMember(member) {
    this.setState({
      loading: true
    });

    try {
      /*
      const accounts = await web3.eth.getAccounts();
      const txn = await ConsortiumContract.methods
        .proposeRemoveMember(member)
        .send({
          from: accounts[0]
        });
      */
      const { transactionHash } = await api.removeMember(member);
      this.setState({ transactionHash });
      this.goToStep(3);
    } catch (e) {
      const error = "Proposal to remove a member failed.";
      console.log(`${error} Reason: ${e}`);
    }

    this.setState({
      loading: false
    });
  }

  goToStep = step => {
    this.setState({
      currentStep: step
    });
  };

  render() {
    const { currentStep, member, proposalType, transactionHash } = this.state;
    const proposal = proposals[proposalType];
    return (
      <Grid container>
        <Grid.Row>
          <Container textAlign="center">
            <Header as="h3">Create a Proposal</Header>
            <p>{steps[currentStep].info}</p>
          </Container>
        </Grid.Row>
        <Grid.Row>
          <Container textAlign="center">
            <Steps currentStep={currentStep} />
          </Container>
        </Grid.Row>
        <Grid.Row>
          <Container text style={{ padding: "20px 0" }}>
            {currentStep === 1 && (
              <Step1
                onAddMember={this.onAddMember}
                onRemoveMember={this.onRemoveMember}
              />
            )}
            {currentStep === 2 && (
              <Step2
                proposal={proposal}
                member={member}
                onCancel={() => this.onCancel()}
                onConfirm={() => this.onConfirm()}
              />
            )}
            {currentStep === 3 && (
              <Step3
                data={{ member, proposal, transactionHash }}
                onProposeNew={() => this.onCancel()}
              />
            )}
          </Container>
        </Grid.Row>
      </Grid>
    );
  }
}
