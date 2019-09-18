using System;
using System.Threading;
using System.Threading.Tasks;
using App.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Activities {
    public class Create {
        //when we create a db entry we need the parameters that we want to place data into
        public class Command : IRequest {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command> {

            public CommandValidator () {
                RuleFor (x => x.Title).NotEmpty ();
                RuleFor (x => x.Description).NotEmpty ();
                RuleFor (x => x.Category).NotEmpty ();
                RuleFor (x => x.Date).NotEmpty ();
                RuleFor (x => x.City).NotEmpty ();
                RuleFor (x => x.Venue).NotEmpty ();
            }
        }
        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler (DataContext context, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
            }

            //this method will take in a command class object and place information in the properties
            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
                var activity = new Activity {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };
                _context.Activities.Add (activity);

                //will get the currently logged in user
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                //will create a new user activity entry and make the user that created the event, the host.
                var attendee = new UserActivity
                {
                    AppUser = user,
                    Activity = activity,
                    IsHost = true,
                    DateJoined = DateTime.Now
                };

                //adds the attendee to the database
                _context.UserActivities.Add(attendee);
                    
                //this will return a task of type integer which can be used to see if the creation was successful or not
                //sucess is a bool type if the save changes returns greater than 0 the save changes was successful
                var success = await _context.SaveChangesAsync () > 0;

                if (success)
                    return Unit.Value;

                else
                    throw new Exception ("Problem saving changes");
            }
        }
    }
}