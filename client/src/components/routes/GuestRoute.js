import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import * as reducers from "../../reducers";

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const { from } = props.location.state || {
        from: { pathname: "/dashboard" }
      };
      //debugger;
      return !isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={from} />
      );
    }}
  />
);

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: reducers.isAuthenticated(state)
  };
}

export default connect(mapStateToProps)(GuestRoute);
