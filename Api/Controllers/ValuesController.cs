﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
// all this does is serve up the data in the database
namespace Api.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase {
        private readonly DataContext _context;

        public ValuesController(DataContext context)
        {
            this._context = context;
        }


        // GET api/values
        [HttpGet]
        public async Task< ActionResult<IEnumerable<Value>>> Get () {
            var values = await _context.values.ToListAsync();
            return Ok(values);
        }

        // GET api/values/5
        [HttpGet ("{id}")]
        public async Task<ActionResult<Value>> Get (int id) {
            var value = await _context.values.FindAsync(id);
            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public void Post ([FromBody] string value) { }

        // PUT api/values/5
        [HttpPut ("{id}")]
        public void Put (int id, [FromBody] string value) { }

        // DELETE api/values/5
        [HttpDelete ("{id}")]
        public void Delete (int id) { }
    }
}