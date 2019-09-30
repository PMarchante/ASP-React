using System.Threading;
using System.Threading.Tasks;
using App.Interfaces;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using App.Errors;
using System.Net;
using System;

namespace Infrastructure.Photos
{
    public class Delete
    {
        public class Command : IRequest
        {
            //string for the ID of the image
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //get reference to user
                var user = await _context.Users.SingleOrDefaultAsync(x=> x.UserName== _userAccessor.GetCurrentUsername());
                var photo = user.Photos.FirstOrDefault(p =>p.Id==request.Id);

                if (photo == null)
                     throw new RestException(HttpStatusCode.NotFound, new {Photo = "Not found"});

                if(photo.IsMain)
                    throw new RestException(HttpStatusCode.BadRequest, new {Photo = "Cannot delete main photo"});
                
                var result = _photoAccessor.DeletePhoto(photo.Id);

                if(result==null)
                    throw new Exception("Problem deleting photo");
                
                user.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync()>0;
                if(success)
                    return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}