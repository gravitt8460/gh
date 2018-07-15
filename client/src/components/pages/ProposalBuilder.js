import React, { Component } from "react";
import { Card, Icon } from "semantic-ui-react";

export default class ProposalBuilder extends Component {
  items = [
    {
      header: <Icon name="add user" size="huge" />,
      description: "Add/Remove a Consortium member",
      onClick: () => this.props.history.push("/proposal/member")
    },
    {
      header: <Icon name="gavel" size="huge" />,
      description: "Set member eligibility BCDE amount",
      onClick: () => this.props.history.push("/proposal/eligibility")
    },
    {
      header: <Icon name="payment" size="huge" />,
      description: "New expenditure",
      onClick: () => this.props.history.push("/proposal/expenditure")
    },
    {
      header: <Icon name="diamond" size="huge" />,
      description: "Set diamond registration price",
      onClick: () =>
        this.props.history.push("/proposal/diamond-registration-price")
    },
    {
      header: <Icon name="percent" size="huge" />,
      description: "Set earnings rate",
      onClick: () => this.props.history.push("/proposal/earnings-rate")
    }
  ];

  render() {
    return (
      <div className="proposal-builder">
        <Card.Group centered items={this.items} />
      </div>
    );
  }
}
