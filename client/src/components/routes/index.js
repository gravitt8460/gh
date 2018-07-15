import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./AppliedRoute";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import ProposalBuilder from "../pages/ProposalBuilder";
import NewProduct from "../pages/NewProduct";
import ShowProduct from "../pages/ShowProduct";
import Membership from "../pages/Proposals/Membership";
import Eligibility from "../pages/Proposals/Eligibility";
import Expenditure from "../pages/Proposals/Expenditure";
import DiamondRegistrationPrice from "../pages/Proposals/DiamondRegistrationPrice";
import EarningsRate from "../pages/Proposals/EarningsRate";

const Routes = () => (
  <Switch>
    <AppliedRoute path="/" exact component={Dashboard} />
    <AppliedRoute path="/products/new" exact component={NewProduct} />
    <AppliedRoute path="/products/:id" exact component={ShowProduct} />
    <AppliedRoute path="/proposal" exact component={ProposalBuilder} />
    <AppliedRoute path="/proposal/member" exact component={Membership} />
    <AppliedRoute path="/proposal/eligibility" exact component={Eligibility} />
    <AppliedRoute path="/proposal/expenditure" exact component={Expenditure} />
    <AppliedRoute
      path="/proposal/diamond-registration-price"
      exact
      component={DiamondRegistrationPrice}
    />
    <AppliedRoute
      path="/proposal/earnings-rate"
      exact
      component={EarningsRate}
    />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
