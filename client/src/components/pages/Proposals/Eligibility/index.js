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
    info: "Set Member Eligibility Amount"
  },
  2: {
    number: 2,
    info: "Review eligibility details"
  },
  3: {
    number: 3,
    info: "Proposal submission successful"
  }
};

export default class Eligibility extends Component {
  state = {
    currentStep: 1,
    currentAmount: null,
    proposedAmount: "",
    transactionHash: null,
    error: null,
    loading: false
  };

  componentDidMount() {
    this.getEligibilityAmount();
  }

  async getEligibilityAmount() {
    try {
      /*
      const currentAmount = await ConsortiumContract.methods
        .minimumBalance()
        .call();
      */
      const currentAmount = await api.getMinimumEligibilityAmount();
      this.setState({ currentAmount });
    } catch (e) {
      const error = "Fetch current eligibility amount failed.";
      console.log(`${error} Reason: ${e}`);
    }
  }

  onContinue = proposedAmount => {
    this.setState({ proposedAmount });
    this.goToStep(2);
  };

  onCancel = () => {
    this.goToStep(1);
  };

  onConfirm = () => {
    const { proposedAmount } = this.state;
    this.proposeNewAmount(proposedAmount);
  };

  async proposeNewAmount(amount) {
    this.setState({
      loading: true
    });

    try {
      const { transactionHash } = await api.proposeMinimumMemberEligibility(
        amount
      );
      console.log("proposeNewAmount transactionHash = ", transactionHash);
      this.setState({ transactionHash });
      this.goToStep(3);
    } catch (e) {
      const error = "Propose to set a new amount failed.";
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

  onProposeNew = () => {
    this.props.history.push("/proposal");
  };

  render() {
    const { currentStep, currentAmount, proposedAmount } = this.state;
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
                currentAmount={currentAmount}
                onContinue={this.onContinue}
              />
            )}
            {currentStep === 2 && (
              <Step2
                currentAmount={currentAmount}
                proposedAmount={proposedAmount}
                onCancel={() => this.onCancel()}
                onConfirm={() => this.onConfirm()}
              />
            )}
            {currentStep === 3 && (
              <Step3
                data={{ ...this.state }}
                onProposeNew={() => this.onProposeNew()}
              />
            )}
          </Container>
        </Grid.Row>
      </Grid>
    );
  }
}
