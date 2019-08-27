using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions opt) :base(opt)
        {   
        }

        //the values name after Dbset<Value> is what will be used as the table name in the db
        public DbSet<Value> values { get; set; }
        public DbSet<Activity> Activities {get;set;}
        protected override void OnModelCreating(ModelBuilder builder){
            builder.Entity<Value>().HasData(
                new Value {Id=1, Name="value 1"},
                new Value {Id=2, Name="value 2"},
                new Value {Id=3, Name="value 3"}
            );

        }
    }
}
