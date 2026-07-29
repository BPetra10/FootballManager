using FootballLeagueManager.API.DTOs.League;
using FootballLeagueManager.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// Exposes league related endpoints.
namespace FootballLeagueManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeagueController : ControllerBase
    {
        private readonly LeagueService _leagueService;

        public LeagueController(LeagueService leagueService)
        {
            _leagueService = leagueService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(LeagueDto request)
        {
            try
            {
                await _leagueService.CreateLeagueAsync(request);

                return Ok("League created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var leagues = await _leagueService.GetAllAsync();

            return Ok(leagues);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var league = await _leagueService.GetByIdAsync(id);

            return Ok(league);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            Guid id,
            LeagueDto request)
        {
            await _leagueService.UpdateAsync(id, request);

            return Ok("League updated successfully.");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _leagueService.DeleteLeagueAsync(id);

            return Ok("League deleted successfully.");
        }

        // Returns the current league table.
        [HttpGet("{id}/table")]
        public async Task<IActionResult> GetTable(Guid id)
        {
            var table =
                await _leagueService.GetLeagueTableAsync(id);

            return Ok(table);
        }
    }
}