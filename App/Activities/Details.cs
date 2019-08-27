using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Activities
{
    //this class will return a single activity from the db that was queried
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {

            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public DbContext Context { get; }
            
            //this  handler will take a request id and find it in the database
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Id);
                return activity;
            }
        }
    }
}