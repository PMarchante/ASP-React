import React, { Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import { useEffect } from "react";
import NavBar from "./components/nav/NavBar";
import ActivityDashboard from "./components/activities/ActivityDashboard";
import LoadingComponent from "./components/misc/LoadingComponent";
import ActivityStore from "./app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePage from "./HomePage";
import ActivityForm from "./components/activities/ActivityForm";
import ActivityDetails from "./components/activities/ActivityDetails";
const App: React.FC<RouteComponentProps> = ({ location }) => {
  //using fragment is a better way to return multiple components instead of returning them in a div
  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route
        path={"/(.+)"} //this means if url is / and anything else render whats in the body
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: 70 }}>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
                key={location.key} //this key will make it so if i click the create activity while im editing an activity
                //it will reinitialize the component
              />
              <Route path='/activities/:id' component={ActivityDetails} />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
