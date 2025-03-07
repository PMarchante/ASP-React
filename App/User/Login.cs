using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using App.Errors;
using App.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;


namespace App.User {
    public class Login {
        //we dont actually save anything to the server, we just do a query to check if the usernames and passwords match
        //to log in a user
        public class Query : IRequest<User> {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query> {
            public QueryValidator () {
                RuleFor (x => x.Email).EmailAddress ();
                RuleFor (x => x.Password).NotEmpty ();
            }
        }

        public class Handler : IRequestHandler<Query, User> {

            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler (UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator) {
                _jwtGenerator = jwtGenerator;
                _signInManager = signInManager;
                _userManager = userManager;
            }

            public async Task<User> Handle (Query request, CancellationToken cancellationToken) {
                var user = await _userManager.FindByEmailAsync (request.Email);

                if (user == null)
                    throw new RestException (HttpStatusCode.Unauthorized);

                var result = await _signInManager.CheckPasswordSignInAsync (user, request.Password, false);

                if (result.Succeeded) {
                    //TODO: generate token
                    return new User {
                        DisplayName = user.DisplayName,
                            Token = _jwtGenerator.CreateToken(user),
                            Username = user.UserName,
                            Image = user.Photos.FirstOrDefault(p => p.IsMain)?.Url
                    };
                }

                throw new RestException (HttpStatusCode.Unauthorized);
            }
        }

    }
}