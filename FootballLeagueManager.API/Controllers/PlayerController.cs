using FootballLeagueManager.API.DTOs;
using FootballLeagueManager.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FootballLeagueManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly PlayerService _playerService;

        public PlayerController(PlayerService playerService)
        {
            _playerService = playerService;
        }

        [Authorize(Roles = "Admin,TeamManager")]
        [HttpPost]
        public async Task<IActionResult> Create(
            PlayerDto request)
        {
            await _playerService.CreatePlayerAsync(request);

            return Ok("Player created successfully.");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _playerService.GetAllAsync());
        }

        [Authorize(Roles = "Admin,TeamManager")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _playerService.DeleteAsync(id);

            return Ok("Player deleted successfully.");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(await _playerService.GetByIdAsync(id));
        }

        [Authorize(Roles = "Admin,TeamManager")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id,PlayerDto request)
        {
            await _playerService.UpdateAsync(id, request);

            return Ok("Player updated successfully.");
        }
    }
}