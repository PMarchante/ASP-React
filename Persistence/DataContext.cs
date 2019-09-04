using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{   
    //the identityDbContext is the same as db contect but for identoty framework
    //we have to specify which class contains the user data and dont need a dbset
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions opt) :base(opt)
        {   
        }

        //the values name after Dbset<Value> is what will be used as the table name in the db
        public DbSet<Value> values { get; set; }
        //the DBSet makes a table modeled after Activity class and calls that table Activities
        public DbSet<Activity> Activities {get;set;}
        protected override void OnModelCreating(ModelBuilder builder){

            //if this isnt added, we will get an error migrating user data
            base.OnModelCreating(builder);

            builder.Entity<Value>().HasData(
                new Value {Id=1, Name="value 1"},
                new Value {Id=2, Name="value 2"},
                new Value {Id=3, Name="value 3"}
            );

        }
    }
}
