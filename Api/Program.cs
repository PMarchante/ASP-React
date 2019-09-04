using System;
using Domain;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();
            //this will create a db migration and seed data if one does not exist
            using (var scope = host.Services.CreateScope())
            {
                var Services=scope.ServiceProvider;
                try{
                    var context = Services.GetRequiredService<DataContext>();
                    var userManager = Services.GetRequiredService<UserManager<AppUser>>();
                    context.Database.Migrate();
                    //have to use wait because the seed method is now async and get the
                    // user manager class
                    Seed.SeedData(context, userManager).Wait();
                }
                catch(Exception e){
                    var logger = Services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(e, "Error occured migrating");
                }
            }
            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
