namespace App.User
{
    //this class has the properties we cant to return when the user signs into the app
    public class User
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }
    }
}