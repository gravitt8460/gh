import * as api from "../api";

export const fetchProposals = () => dispatch => {
  dispatch({
    type: "FETCH_PROPOSALS_REQUEST"
  });

  return api.fetchProposals().then(
    response =>
      dispatch({
        type: "FETCH_PROPOSALS_SUCCESS",
        response
      }),
    error =>
      dispatch({
        type: "FETCH_PROPOSALS_FAILURE",
        message: error.message || "Something went wrong!"
      })
  );
};

export const approveProposal = id => dispatch =>
  api.approveProposal(id).then(response =>
    dispatch({
      type: "APPROVE_PROPOSAL_SUCCESS",
      response
    })
  );

export const rejectProposal = id => dispatch =>
  api.rejectProposal(id).then(response =>
    dispatch({
      type: "REJECT_PROPOSAL_SUCCESS",
      response
    })
  );

export const processProposal = id => dispatch =>
  api.processProposal(id).then(response =>
    dispatch({
      type: "PROCESS_PROPOSAL_SUCCESS",
      response
    })
  );
