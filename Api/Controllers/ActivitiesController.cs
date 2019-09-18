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
        public async Task<ActionResult<List<ActivityDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        //this method will return a single record from the database, based on the id
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityDto>> GetDetails(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateActivity(Create.Command command)
        {
            return await Mediator.Send(command);
        }
        //policy added in services to only allow the host to update activity
        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> UpdateActivity(Guid id,Edit.Command command)
        {   command.Id = id;
            return await Mediator.Send(command);
        }

        //policy added in services to only allow the host to delete an activity
        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
           
            return await Mediator.Send(new Delete.Command{Id=id});
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> AttendActivity(Guid id)
        {
            return await Mediator.Send(new Attend.Command{Id=id});
        }

        [HttpDelete("{id}/attend")]
        public async Task<ActionResult<Unit>> LeaveEvent(Guid id)
        {
            return await Mediator.Send(new UnAttend.Command{Id=id});
        }
    }
}