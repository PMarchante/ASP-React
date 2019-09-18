using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

        //this will define relationship between App user class and Activity class
        public virtual ICollection<UserActivity> UserActivities {get; set;}
    }
}