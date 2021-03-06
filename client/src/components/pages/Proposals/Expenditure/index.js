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
    info: "New Expenditure"
  },
  2: {
    number: 2,
    info: "Review expenditure details"
  },
  3: {
    number: 3,
    info: "Expenditure proposal submission successful"
  }
};

export default class Expenditure extends Component {
  state = {
    currentStep: 1,
    recipient: "",
    amount: "",
    memo: "",
    error: null,
    loading: false
  };

  onContinue = (recipient, amount, memo) => {
    this.setState({ recipient, amount, memo });
    this.goToStep(2);
  };

  onCancel = () => {
    this.goToStep(1);
  };

  onConfirm = () => {
    const { recipient, amount, memo } = this.state;
    this.proposeExpenditure(recipient, amount, memo);
  };

  async proposeExpenditure(recipient, amount, memo) {
    this.setState({
      loading: true
    });

    try {
      /*
      const accounts = await web3.eth.getAccounts();
      const {
        transactionHash
      } = await ConsortiumContract.methods
        .proposeSendEther(recipient, web3.utils.toWei(amount, "ether"))
        .send({ from: accounts[0] });
      */
      const { transactionHash } = await api.proposeExpenditure(
        recipient,
        amount,
        memo
      );
      this.setState({ transactionHash });
      this.goToStep(3);
    } catch (e) {
      const error = "Propose to create a new expense failed.";
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
    const { currentStep, recipient, amount, memo } = this.state;
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
            {currentStep === 1 && <Step1 onContinue={this.onContinue} />}
            {currentStep === 2 && (
              <Step2
                recipient={recipient}
                amount={amount}
                memo={memo}
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
