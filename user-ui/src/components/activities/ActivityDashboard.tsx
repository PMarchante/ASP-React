import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import { observer } from 'mobx-react-lite'
import LoadingComponent from '../misc/LoadingComponent'
import { RootStoreContext } from '../../app/stores/rootStore'

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext)
  const { loadActivities, loadingInitial } = rootStore.activityStore
  //this uses hooks to take the place of componentDidMount, componentDidUpdate, and componentDidUnmount
  useEffect(() => {
    loadActivities()
  }, [loadActivities]) //this array is a dependency array we have to put all out dependecies used in here

  if (loadingInitial) return <LoadingComponent content='Loading activities..' />
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>

      <h2>Activity filters</h2>
    </Grid>
  )
}

export default observer(ActivityDashboard)
