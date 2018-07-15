import _ from "lodash";
import {
  FETCH_PROPOSALS_SUCCESS,
  FETCH_PROPOSALS_FAILURE,
  FETCH_PROPOSAL_SUCCESS
} from "../types";

export default function Proposals(state = {}, action) {
  switch (action.type) {
    case FETCH_PROPOSALS_SUCCESS:
      return _.mapKeys(action.response, "proposalId");
    case FETCH_PROPOSALS_FAILURE:
      return {};
    case FETCH_PROPOSAL_SUCCESS:
      return { ...state, [action.id]: action.response };
    default:
      return state;
  }
}

export const getProposals = state => _.map(state);

export const getActiveProposals = state =>
  _.filter(getProposals(state), proposal => !proposal.closed);

export const getPastProposals = state =>
  _.filter(getProposals(state), proposal => proposal.closed);

export const getProposal = (state, id) => state[id] || {};
