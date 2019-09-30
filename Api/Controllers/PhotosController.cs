using System.Threading.Tasks;
using App.Photos;
using Domain;
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
    }
}