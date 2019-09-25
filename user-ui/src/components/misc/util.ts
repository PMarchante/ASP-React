import { IActivity, IAttendee } from '../../app/models/activity';
import { IUser } from '../../app/models/user';

//a helper function that combines the date and time properties and returns a new date object with them both
export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString = time.getHours() + ':' + time.getMinutes() + ':00';
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dateString = `${year}=${month}-${day}`;

  return new Date(dateString + ' ' + timeString);
};

export const setActivityProps = (activity: IActivity, user: IUser) => {
  activity.date = new Date(activity.date);
  activity.isGoing = activity.attendees.some(
    (x) => x.username === user.username
  );

  activity.isHost = activity.attendees.some(
    (x) => x.username === user.username && x.isHost
  );
  return activity;
};

export const createAttendee = (user: IUser): IAttendee => {
  let attendee: IAttendee = {
    username: user.username,
    displayName: user.displayName,
    image: user.image!,
    isHost: false
  };
  return attendee;
};
