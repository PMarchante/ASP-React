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

        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<Photo> Photos {get; set;}
        public DbSet<Comment> Comments {get; set;}
        protected override void OnModelCreating(ModelBuilder builder){

            //if this isnt added, we will get an error migrating user data
            base.OnModelCreating(builder);

            builder.Entity<Value>().HasData(
                new Value {Id=1, Name="value 1"},
                new Value {Id=2, Name="value 2"},
                new Value {Id=3, Name="value 3"}
            );

            //this specifies the primary key in the table because it is a many to many relationship
            builder.Entity<UserActivity>(x => x.HasKey( a=>
            new {a.AppUserId, a.ActivityId}));

            builder.Entity<UserActivity>()
            .HasOne(u => u.AppUser)
            .WithMany(a => a.UserActivities)
            .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserActivity>()
            .HasOne(a => a.Activity)
            .WithMany(u => u.UserActivities)
            .HasForeignKey(a => a.ActivityId);
        }
    }
}
