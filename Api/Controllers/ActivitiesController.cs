using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using App.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    //looks very lean because we created a base class called basecontroller and specified the mediator fields
    //also gave it the routes and api controller attribute
    public class ActivitiesController : BaseController
    {
        

        //this will query the database
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        //this method will return a single record from the database, based on the id
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Activity>> getDetails(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> createActivity(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> updateActivity(Guid id,Edit.Command command)
        {   command.Id = id;
            return await Mediator.Send(command);
        }

        //looks very similar to the get method 
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> delete(Guid id)
        {
           
            return await Mediator.Send(new Delete.Command{Id=id});
        }
    }
}