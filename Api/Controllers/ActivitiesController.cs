using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using App.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    //the api controller tag means this controller will only serve api data
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator mediator;

        public ActivitiesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        //this will query the database
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await mediator.Send(new List.Query());
        }

        //this method will return a single record from the database, based on the id
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> getDetails(Guid id)
        {
            return await mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> createActivity(Create.Command command)
        {
            return await mediator.Send(command);
        }
    }
}