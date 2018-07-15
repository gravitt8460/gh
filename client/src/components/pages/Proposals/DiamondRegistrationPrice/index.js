import React, { Component } from "react";
import { Grid, Container, Header } from "semantic-ui-react";
import Steps from "./Steps";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

//import ConsortiumContract from "../../../../ethereum/consortium";
//import RegistryContract from "../../../../ethereum/registry";
//import web3 from "../../../../ethereum/web3";

import * as api from "../../../../api";

const steps = {
  1: {
    number: 1,
    info: "Set Diamond Registry Price"
  },
  2: {
    number: 2,
    info: "Review price change"
  },
  3: {
    number: 3,
    info: "Price change proposal submission successful"
  }
};

export default class DiamondRegistrationPrice extends Component {
  state = {
    currentStep: 1,
    currentPrice: "",
    proposedPrice: "",
    currentPower: "",
    proposedPower: "",
    error: null,
    loading: false
  };

  componentDidMount() {
    this.getCurrentBasePrice();
    this.getCurrentPower();
  }

  async getCurrentBasePrice() {
    try {
      /*
      const currentPrice = await RegistryContract.methods
        .getBasePricePerCarat()
        .call();
      */
      const currentPrice = await api.getBasePricePerCarat();
      console.log("currentPrice = ", currentPrice);
      this.setState({ currentPrice });
    } catch (e) {
      const error = "Fetch current base price failed.";
      console.log(`${error} Reason: ${e}`);
    }
  }

  async getCurrentPower() {
    try {
      /*
      const currentPower =
        (await RegistryContract.methods.getPricePowerx100().call()) / 100;
      */
      const currentPower = await api.getPricePower();
      console.log("currentPower = ", currentPower);
      this.setState({ currentPower });
    } catch (e) {
      const error = "Fetch current price power failed.";
      console.log(`${error} Reason: ${e}`);
    }
  }

  onContinue = (proposedPrice, proposedPower) => {
    this.setState({ proposedPrice, proposedPower });
    this.goToStep(2);
  };

  onCancel = () => {
    this.goToStep(1);
  };

  onConfirm = () => {
    const { proposedPrice, proposedPower } = this.state;
    this.proposeRegistryPrice(proposedPrice, proposedPower);
  };

  async proposeRegistryPrice(proposedPrice, proposedPower) {
    this.setState({
      loading: true
    });

    try {
      /*
      const accounts = await web3.eth.getAccounts();
      const {
        transactionHash
      } = await ConsortiumContract.methods
        .proposeSetPriceBase(proposedPrice, proposedPower * 100)
        .send({ from: accounts[0] });
      */
      const { transactionHash } = await api.proposeBasePrice(
        proposedPrice,
        proposedPower
      );
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
    const {
      currentStep,
      currentPrice,
      currentPower,
      proposedPrice,
      proposedPower
    } = this.state;
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
                onContinue={this.onContinue}
                currentPrice={currentPrice}
                currentPower={currentPower}
              />
            )}
            {currentStep === 2 && (
              <Step2
                currentPrice={currentPrice}
                currentPower={currentPower}
                proposedPrice={proposedPrice}
                proposedPower={proposedPower}
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
