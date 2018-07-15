import { combineReducers } from "redux";
import proposals, * as fromProposals from "./proposals";

const bitcarbonApp = combineReducers({
  proposals
});

export default bitcarbonApp;

export const getActiveProposals = state =>
  fromProposals.getActiveProposals(state.proposals);

export const getPastProposals = state =>
  fromProposals.getPastProposals(state.proposals);
