using FootballLeagueManager.API.Data;
using FootballLeagueManager.API.DTOs.Admin;
using FootballLeagueManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FootballLeagueManager.API.Services
{
    public class AdminService
    {
        private readonly FootballLeagueDbContext _dbContext;

        public AdminService(FootballLeagueDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<AdminDashboardDto> GetDashboardAsync()
        {
            return new AdminDashboardDto
            {
                Leagues = await _dbContext.Leagues.CountAsync(),

                Teams = await _dbContext.Teams.CountAsync(),

                Managers = await _dbContext.Users.CountAsync(
                    u => u.Role == UserRole.TeamManager),

                Matches = await _dbContext.Matches.CountAsync()
            };
        }

        public async Task<List<ManagerOptionDto>> GetAvailableManagersAsync()
        {
            return await _dbContext.Users

                .Where(user =>
                    user.Role == UserRole.TeamManager &&
                    !_dbContext.Teams.Any(team => team.ManagerId == user.Id))

                .OrderBy(user => user.Username)

                .Select(user => new ManagerOptionDto
                {
                    Id = user.Id,
                    Username = user.Username
                })
                
                .ToListAsync();
        }

        public async Task<List<TeamWithoutManagerDto>> GetTeamsWithoutManagerAsync()
        {
            return await _dbContext.Teams

                .Where(team => team.ManagerId == null)

                .OrderBy(team => team.Name)

                .Select(team => new TeamWithoutManagerDto
                {
                    Id = team.Id,
                    Name = team.Name
                })

                .ToListAsync();
        }

        public async Task AssignManagerAsync(AssignManagerDto request)
        {
            var team = await _dbContext.Teams
                .FirstOrDefaultAsync(team => team.Id == request.TeamId);

            if (team == null)
            {
                throw new Exception("Team not found.");
            }

            var manager = await _dbContext.Users
                .FirstOrDefaultAsync(user =>
                    user.Id == request.ManagerId &&
                    user.Role == UserRole.TeamManager);

            if (manager == null)
            {
                throw new Exception("Manager not found.");
            }

            team.ManagerId = request.ManagerId;

            await _dbContext.SaveChangesAsync();
        }
    }
}