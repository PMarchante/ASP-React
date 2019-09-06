using System.Threading.Tasks;
using App.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    //without this, users wont be able to log in at all because the entire app requires you to be logged in to do anything
    
    public class UserController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<User>> LoggedInUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }
    }
}