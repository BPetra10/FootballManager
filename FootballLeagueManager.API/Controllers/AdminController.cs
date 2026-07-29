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

    [Authorize(Roles = "Admin")]
    [HttpGet("available-managers")]
    public async Task<IActionResult> GetAvailableManagers()
    {
        var managers =
            await _adminService.GetAvailableManagersAsync();

        return Ok(managers);
    }
}