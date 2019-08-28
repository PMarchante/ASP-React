using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
namespace App.Activities
{
    public class Edit
    {
        public class Command:IRequest
        {
            public Guid Id {get;set;}
            public string Title {get;set;}
            public string Description {get;set;}
            public string Category {get;set;}
            public DateTime? Date{get;set;}
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

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //gets activity from db
                var activity = await context.Activities.FindAsync(request.Id);

                if(activity==null)
                    throw new Exception("could not find activity");

                //this means that the activity title will be changed to the passed in update to change the title.
                //but if the passed in request is null. shown by the ??. then keep the old update. 
                activity.Title = request.Title ?? activity.Title;
                activity.Category = request.Category ?? activity.Category;
                activity.City = request.City ?? activity.City;
                activity.Date = request.Date ?? activity.Date;
                activity.Description = request.Description ?? activity.Description;
                activity.Venue = request.Venue ?? activity.Venue;

                //after we do the changes, we need to save it
                var success = await context.SaveChangesAsync() > 0;

                if(success)
                    return Unit.Value;

                throw new Exception("error saving changes");
            }
        }
    }
}