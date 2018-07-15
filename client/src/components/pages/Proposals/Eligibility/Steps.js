import React from "react";
import { Step } from "semantic-ui-react";

export default ({ currentStep }) => {
  return (
    <Step.Group ordered>
      <Step active={currentStep === 1}>
        <Step.Content>
          <Step.Title>BCDE</Step.Title>
        </Step.Content>
      </Step>
      <Step {...currentStep === 2 && { active: true }}>
        <Step.Content>
          <Step.Title>Review</Step.Title>
        </Step.Content>
      </Step>
      <Step {...(currentStep === 3 ? { active: true } : {})}>
        <Step.Content>
          <Step.Title>Confirm</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  );
};
