using System.Collections.Generic;
using Domain;

namespace App.Profiles
{
    //properties to return in user profile
    public class Profile
    {
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }
        public string Bio { get; set; }
        public ICollection<Photo> Photos {get; set;}
    }
}