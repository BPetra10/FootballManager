using FootballLeagueManager.API.DTOs.Admin;
using FootballLeagueManager.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly AdminService _adminService;

    public AdminController(AdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard()
    {
        return Ok(await _adminService.GetDashboardAsync());
    }

    [HttpGet("available-managers")]
    public async Task<IActionResult> GetAvailableManagers()
    {
        var managers =
            await _adminService.GetAvailableManagersAsync();

        return Ok(managers);
    }

    [HttpGet("teams-without-manager")]
    public async Task<IActionResult> GetTeamsWithoutManager()
    {
        var teams =
            await _adminService.GetTeamsWithoutManagerAsync();

        return Ok(teams);
    }

    [HttpPut("assign-manager")]
    public async Task<IActionResult> AssignManager(
        AssignManagerDto request)
    {
        await _adminService.AssignManagerAsync(request);

        return Ok("Manager assigned successfully.");
    }
}