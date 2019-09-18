using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Activities {
    //this class will return a list of all activities in the db
    public class List {
        public class Query : IRequest<List<ActivityDto>> { }

        //the handler class is in charge of looking at the request and returning a list of the results
        public class Handler : IRequestHandler<Query, List<ActivityDto>> {
            //this datacontext gotten from persistence project which models the data
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            //the constructor gets the data model and can then
            public Handler (DataContext context, IMapper mapper) {
                _mapper = mapper;
                _context = context;
            }

            //the Handle method gets the query request and responds by looking at the context data model and looks in 
            //the activities table then returns the results
            //use async because all db querys should be async
            public async Task<List<ActivityDto>> Handle (Query request, CancellationToken cancellationToken) {
                //eager loading off all related data to be included with the query
                var Activities = await _context.Activities
                /*
                    needed to eager load the page
                    .Include (x => x.UserActivities)
                    .ThenInclude (x => x.AppUser)
                 */
                    .ToListAsync ();

                return _mapper.Map<List<Activity>, List<ActivityDto>>(Activities);
            }
        }
    }
}