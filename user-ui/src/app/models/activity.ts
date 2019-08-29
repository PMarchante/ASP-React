//doing this so we can stringly type the info we are getting from the api
export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  city: string;
  venue: string;
}
