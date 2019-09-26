using App.Activities;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using FluentValidation.AspNetCore;
using Api.MiddleWare;
using Domain;
using Microsoft.AspNetCore.Identity;
using App.Interfaces;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using AutoMapper;
using Infrastructure.Photos;

namespace Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                //this lets us use lazy loading after installing the package
                opt.UseLazyLoadingProxies();
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });
            //if we dont add cors, another program cannot use our API data
            services.AddCors(opt =>{
                opt.AddPolicy("CorsPolicy",policy=>{
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });
            //this mediator service adds the list of all handlers to the services container
            services.AddMediatR(typeof(List.Handler).Assembly);
            //the add fluent valudation is a package downloaded to help validate input client side
            //it takes in the class where validations will occur
            services.AddMvc(opt=>{
                //this code will only allow logged in users to acces the data in the api
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
            
            .AddFluentValidation(config => config.RegisterValidatorsFromAssemblyContaining<Create>())
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            //addidentitycore adds and configures identity system base on used type roles
            //we have to pass in the use type
            var builder = services.AddIdentityCore<AppUser>();

            //
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);

            //use this to add a new requirement so only a host of the activity can edit or delete the activity
            services.AddAuthorization(opt =>{
                opt.AddPolicy("IsActivityHost", policy =>{
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });
            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

            //creates user stores
            identityBuilder.AddEntityFrameworkStores<DataContext>();

            //need this service to manage the sign in of users
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();

            //this token key is stored in local development machine and will have to be regenerated if i clone the
            //project somewhere else. it will only work in development mode
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).
            AddJwtBearer(Opt=>{
                Opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateAudience = false,
                    ValidateIssuer = false
                };
            });

            //looks in this assembly for auto mapper mapping profiles
            services.AddAutoMapper(typeof(List.Handler));

            services.AddScoped<IJwtGenerator, JwtGenerator>();
            
            //this will let us get the username from the token in user-secrets
            services.AddScoped<IUserAccessor, UserAccessor>();

            //gets the cloudinary config from the  dotnet user-secrets
            services.Configure<CloudinarySettings>(Configuration.GetSection("Cloudinary"));
            
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //this will handel all errors by returning our own customized responses
            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //app.UseHsts();
            }

            app.UseAuthentication();
            //this cors is middleware configured in services. allows only localhost 3000 to get the data from api
            //can also write, or do anything with the data
            app.UseCors("CorsPolicy");
            app.UseMvc();
        }
    }
}
