//doing this so we can stringly type the info we are getting from the api
export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  city: string;
  venue: string;
  isGoing: boolean; //specific to currently logged in user
  isHost: boolean;
  attendees: IAttendee[];
}

export interface IActivityFormValues extends Partial<IActivity> {
  time?: Date;
}

export class ActivityFormValues implements IActivityFormValues {
  id?: string = undefined;
  title: string = '';
  category: string = '';
  description: string = '';
  date?: Date = undefined;
  time?: Date = undefined;
  city: string = '';
  venue: string = '';

  constructor(init?: IActivityFormValues) {
    if (init && init.date) {
      init.time = init.date;
    }
    //this will map the properties in the empty class to the properties of the object we choose to edit
    Object.assign(this, init);
  }
}

//this is what we get back from the attendee array from api
export interface IAttendee {
  username: string;
  displayName: string;
  image: string;
  isHost: boolean;
}
