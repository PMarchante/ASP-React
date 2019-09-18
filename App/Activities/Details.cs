using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using App.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Activities
{
    //this class will return a single activity from the db that was queried
    public class Details
    {
        public class Query : IRequest<ActivityDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ActivityDto>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public DbContext Context { get; }
            
            //this  handler will take a request id and find it in the database
            public async Task<ActivityDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                /*
                this eager loads data when a request is made
                .Include(x => x.UserActivities)
                .ThenInclude(x => x.AppUser)               
                .SingleOrDefaultAsync(x => x.Id == request.Id);
                 */
                 .FindAsync(request.Id);

                if(activity==null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Id not found, could not delete" });

                var activityToReturn = _mapper.Map<Activity, ActivityDto>(activity);

                return  activityToReturn;
            }
        }
    }
}