import React, { useState, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { ActivityFormValues } from '../../app/models/activity'
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router'
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../form/TextInput'
import TextAreaInput from '../form/TextAreaInput'
import SelectInput from '../form/SelectInput'
import { category } from '../form/options/categoryOptions'
import DateInput from '../form/DateInput'
import { combineDateAndTime } from '../misc/util'
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from 'revalidate'
import { RootStoreContext } from '../../app/stores/rootStore'

const validate = combineValidators({
  title: isRequired({ message: 'event title is required' }),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description has to be more than 5 characters'
    })
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
})
interface DetailParams {
  id: string
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext)
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity
  } = rootStore.activityStore

  const [activity, setActivity] = useState(new ActivityFormValues())
  const [loading, setLoading] = useState(false)
  //this function will allow us to still get the activity details in the form when we refresh the page
  useEffect(() => {
    if (match.params.id) {
      setLoading(true)
      loadActivity(match.params.id)
        .then(activity => setActivity(new ActivityFormValues(activity)))
        .finally(() => setLoading(false))
    }
    //will only rerender if the loadActivity param changes or params.id changes
  }, [loadActivity, match.params.id])

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time)
    //this function omits the date and time from the values object
    const { date, time, ...activity } = values
    activity.date = dateAndTime
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity)
    } else {
      editActivity(activity)
    }
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment loading={loading}>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  component={TextInput}
                  name='title'
                  placeholder='Title'
                  value={activity.title}
                />
                <Field
                  component={SelectInput}
                  options={category}
                  placeholder='Category'
                  name='category'
                  value={activity.category}
                />
                <Form.Group widths='equal'>
                  <Field
                    component={DateInput}
                    placeholder='Date'
                    name='date'
                    date={true}
                    value={activity.date}
                  />
                  <Field
                    component={DateInput}
                    placeholder='Time'
                    name='time'
                    time={true}
                    value={activity.time}
                  />
                </Form.Group>
                <Field
                  component={TextInput}
                  placeholder='City'
                  name='city'
                  value={activity.city}
                />
                <Field
                  component={TextInput}
                  placeholder='Venue'
                  name='venue'
                  value={activity.venue}
                />
                <Field
                  component={TextAreaInput}
                  rows={5}
                  placeholder='Description'
                  name='description'
                  value={activity.description}
                />
                <Button.Group widths={2}>
                  <Button
                    disabled={pristine || invalid}
                    loading={submitting}
                    color='green'
                    type='submit'
                    content='Submit'
                  />
                  <Button
                    onClick={
                      activity.id
                        ? () => history.push(`/activities/${activity.id}`)
                        : () => history.push('/activities')
                    }
                    color='red'
                    content='Cancel'
                  />
                </Button.Group>
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  )
}
export default observer(ActivityForm)
