import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './components/nav/NavBar';
import ActivityDashboard from './components/activities/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from 'react-router-dom';
import HomePage from './HomePage';
import ActivityForm from './components/activities/ActivityForm';
import ActivityDetails from './components/activities/ActivityDetails';
import NotFound from './components/misc/NotFound';
import { ToastContainer } from 'react-toastify';
import { RootStoreContext } from './app/stores/rootStore';
import LoadingComponent from './components/misc/LoadingComponent';
import ModalContainer from './app/modals/ModalContainer';
import ProfilePage from './components/user/ProfilePage';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content='Loading App' />;
  return (
    //switch ensure only 1 component is ever loaded onto the page
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'} //this means if url is / and anything else render whats in the body
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: 70 }}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard} />
                <Route
                  path={['/createActivity', '/manage/:id']}
                  component={ActivityForm}
                  key={location.key} //this key will make it so if i click the create activity while im editing an activity
                  //it will reinitialize the component
                />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route path='/profiles/:username' component={ProfilePage} />

                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
