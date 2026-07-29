using FootballLeagueManager.API.DTOs.Match;
using FootballLeagueManager.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FootballLeagueManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchController : ControllerBase
    {
        private readonly MatchService _matchService;

        public MatchController(MatchService matchService)
        {
            _matchService = matchService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(CreateMatchRequest request)
        {
            await _matchService.CreateMatchAsync(request);

            return Ok("Match created successfully.");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _matchService.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(await _matchService.GetByIdAsync(id));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _matchService.DeleteAsync(id);

            return Ok("Match deleted successfully.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/result")]
        public async Task<IActionResult> UpdateResult(
            Guid id,
            UpdateMatchResultRequest request)
        {
            await _matchService.UpdateResultAsync(id, request);

            return Ok("Result updated successfully.");
        }
    }
}