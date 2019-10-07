using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using App.Errors;
using App.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Comments
{
    public class Create
    {
        public class Command : IRequest<CommentDto>
        {
            public Guid ActivityId { get; set; }
            public string Username { get; set; }
            public string Body { get; set; }
        }
        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler (DataContext context, IMapper mapper)
            {
                _mapper = mapper;
               
                _context = context;
            }

            public async Task<CommentDto> Handle (Command request, CancellationToken cancellationToken)
            {
               var activity = await _context.Activities.FindAsync(request.ActivityId);

               if(activity== null)
                throw new RestException(HttpStatusCode.NotFound, new {activity="Not found"});

                var user = await _context.Users.SingleOrDefaultAsync(x=> x.UserName == request.Username);

                var comment = new Comment
                {
                    Author= user,
                    Activity= activity,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                activity.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if(success)
                    return _mapper.Map<CommentDto>(comment);

                throw new Exception("Problem adding comment");
            }
        }
    }
}