using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using App.Errors;
using App.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace App.Photos
{
    public class SetMain
    {
        public class Command : IRequest
        { 
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUsername());
                var Photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);

                if(Photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new{Photo = "Does not exist"});
                
                var currentPhoto = user.Photos.FirstOrDefault(p => p.IsMain);
                currentPhoto.IsMain=false;
                Photo.IsMain=true;

                var success = await _context.SaveChangesAsync() >0;
                if(success)
                    return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}