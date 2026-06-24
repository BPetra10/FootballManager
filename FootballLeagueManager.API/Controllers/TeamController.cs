using FootballLeagueManager.API.DTOs;
using FootballLeagueManager.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// Exposes football team related endpoints.
namespace FootballLeagueManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamController : ControllerBase
    {
        private readonly TeamService _teamService;

        public TeamController(TeamService teamService)
        {
            _teamService = teamService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(TeamDto request)
        {
            await _teamService.CreateTeamAsync(request);

            return Ok("Team created successfully.");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _teamService.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(await _teamService.GetByIdAsync(id));
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, TeamDto request)
        {
            await _teamService.UpdateAsync(id, request);

            return Ok("Team updated successfully.");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _teamService.DeleteAsync(id);

            return Ok("Team deleted successfully.");
        }
    }
}