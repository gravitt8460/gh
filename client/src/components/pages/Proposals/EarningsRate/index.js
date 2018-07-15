import React, { Component } from "react";
import { Grid, Container, Header } from "semantic-ui-react";
import Steps from "./Steps";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

// import ConsortiumContract from "../../../../ethereum/consortium";
// import BCDEContract from "../../../../ethereum/bcde";
// import web3 from "../../../../ethereum/web3";

import * as api from "../../../../api";

const steps = {
  1: {
    number: 1,
    info: "Set earnings rate for BCDE holders"
  },
  2: {
    number: 2,
    info: "Review rate change details"
  },
  3: {
    number: 3,
    info: "Earnings rate proposal submission successful"
  }
};

export default class EarningsRate extends Component {
  state = {
    currentStep: 1,
    currentRate: null,
    proposedRate: null,
    error: null,
    loading: false
  };

  initialState = {
    ...this.state
  };

  componentDidMount() {
    this.getEarningsRate();
  }

  async getEarningsRate() {
    try {
      /*
      const currentRate = await BCDEContract.methods
        .getEarningsRatePercent()
        .call();
      */
      const currentRate = await api.getEarningsRate();
      console.log("currentRate = ", currentRate);
      this.setState({ currentRate });
    } catch (e) {
      const error = "Fetch current eligibility amount failed.";
      console.log(`${error} Reason: ${e}`);
    }
  }

  onContinue = proposedRate => {
    this.setState({ proposedRate });
    this.goToStep(2);
  };

  onCancel = () => {
    this.setState(
      {
        ...this.initialState
      },
      () => this.goToStep(1)
    );
  };

  onConfirm = () => {
    const { proposedRate } = this.state;
    this.proposeEarningsRate(proposedRate);
  };

  async proposeEarningsRate(rate) {
    this.setState({
      loading: true
    });

    try {
      /*
      const accounts = await web3.eth.getAccounts();
      const {
        transactionHash
      } = await ConsortiumContract.methods
        .proposeSetEarningsRatePercent(rate)
        .send({ from: accounts[0] });
      */
      const { transactionHash } = await api.proposeEarningsRate(rate);
      this.setState({ transactionHash });
      this.goToStep(3);
    } catch (e) {
      const error = "Propose to set a new earnings rate failed.";
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
    const { currentStep, currentRate, proposedRate } = this.state;
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
              <Step1 currentRate={currentRate} onContinue={this.onContinue} />
            )}
            {currentStep === 2 && (
              <Step2
                currentRate={currentRate}
                proposedRate={proposedRate}
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
