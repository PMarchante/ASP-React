using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace App.Activities
{
    public class Create
    {
        //when we create a db entry we need the parameters that we want to place data into
        public class Command : IRequest
        {
            public Guid Id {get;set;}
            public string Title {get;set;}
            public string Description {get;set;}
            public string Category {get;set;}
            public DateTime Date{get;set;}
            public string City{get;set;}
            public string Venue{get;set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            //this method will take in a command class object and place information in the properties
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };
                context.Activities.Add(activity);
                //this will return a task of type integer which can be used to see if the creation was successful or not
                //sucess is a bool type if the save changes returns greater than 0 the save changes was successful
                var success = await context.SaveChangesAsync() > 0;

                if(success)
                return Unit.Value;

                else 
                throw new Exception("Problem saving changes");
            }
        }
    }
}