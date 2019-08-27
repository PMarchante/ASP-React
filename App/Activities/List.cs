using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Activities
{
    public class List
    {
        //this class will return a list with activity objects
        public class Query:IRequest<List<Activity>>{}

        //the handler class is in charge of looking at the request and returning a list of the results
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            //this datacontext gotten from persistence project which models the data
            private readonly DataContext context;

            //the constructor gets the data model and can then
            public Handler(DataContext context)
            {
                this.context = context;
            }

            //the Handle method gets the query request and responds by looking at the context data model and looks in 
            //the activities table then returns the results
            //use async because all db querys should be async
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var Activities = await context.Activities.ToListAsync();
                return Activities;
            }
        }
    }
}