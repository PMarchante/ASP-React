using System.Threading.Tasks;
using App.Photos;
using Domain;
using Infrastructure.Photos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class PhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Photo>> Add([FromForm]Add.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await Mediator.Send(new Delete.Command{Id=id});
        }

        [HttpPost("{id}/setmain")]
        public async Task<ActionResult<Unit>> SetNewMainPhoto(string id)
        {
            return await Mediator.Send(new SetMain.Command{Id = id});
        }
    }

}