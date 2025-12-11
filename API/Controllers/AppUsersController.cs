using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class AppUsersController(AppDbContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetUsers() => await context.AppUsers.ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(Guid id) {
            var user = await context.AppUsers.FindAsync(id);
            if (user == null) return NotFound();
            return user;
        }
    }
}