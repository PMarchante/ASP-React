using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using App.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Api.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub (IMediator mediator)
        {
            _mediator = mediator;
        }

        //unlike the controller. The name here MATTERS, it is what will be used to invoke the method from the client side
        public async Task SendComment (Create.Command command)
        {
            //this will get the username from the claims
            var username = Context.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            command.Username = username;

            var comment = await _mediator.Send(command);

            await Clients.All.SendAsync("ReceiveComment", comment);
        }
    }
}