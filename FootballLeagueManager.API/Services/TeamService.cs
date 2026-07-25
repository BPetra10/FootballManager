using FootballLeagueManager.API.Data;
using FootballLeagueManager.API.DTOs;
using FootballLeagueManager.API.Models;
using Microsoft.EntityFrameworkCore;

// Handles football team management operations.
namespace FootballLeagueManager.API.Services
{
    public class TeamService
    {
        private readonly FootballLeagueDbContext _dbContext;
        public TeamService(FootballLeagueDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateTeamAsync(TeamDto request)
        {
            var league = await _dbContext.Leagues
                .Include(l => l.Teams)
                .FirstOrDefaultAsync(l => l.Id == request.LeagueId);

            if (league == null)
            {
                throw new Exception("League not found.");
            }

            var manager = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Id == request.ManagerId);

            if (manager == null)
            {
                throw new Exception("Manager not found.");
            }

            var teamNameExists = await _dbContext.Teams
                .AnyAsync(t => t.Name == request.Name);

            if (teamNameExists)
            {
                throw new Exception("Team already exists.");
            }

            var managerAlreadyAssigned = await _dbContext.Teams
                .AnyAsync(t => t.ManagerId == request.ManagerId);

            if (managerAlreadyAssigned)
            {
                throw new Exception("Manager already has a team.");
            }

            if (league.Teams.Count >= league.MaxTeams)
            {
                throw new Exception("League is full.");
            }

            var team = new Team
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                City = request.City,
                Country = request.Country,
                LeagueId = request.LeagueId,
                ManagerId = request.ManagerId
            };

            _dbContext.Teams.Add(team);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<TeamDto>> GetAllAsync()
        {
            return await _dbContext.Teams
                .Select(t => new TeamDto
                {
                    Name = t.Name,
                    City = t.City,
                    Country = t.Country,
                    LeagueId = t.LeagueId,
                    ManagerId = t.ManagerId
                })
                .ToListAsync();
        }

        public async Task<TeamDetailsResponse> GetByIdAsync(Guid teamId)
        {
            var team = await _dbContext.Teams
                .Include(t => t.League)
                .Include(t => t.Manager)
                .Include(t => t.Players)
                .FirstOrDefaultAsync(t => t.Id == teamId);

            if (team == null)
            {
                throw new Exception("Team not found.");
            }

            return new TeamDetailsResponse
            {
                Id = team.Id,

                Name = team.Name,

                City = team.City,

                Country = team.Country,

                LeagueName = team.League.Name,

                ManagerName = team.Manager.Username,

                PlayerCount = team.Players.Count,

                AverageAge = team.Players.Any()
                    ? Math.Round(
                        team.Players.Average(p => p.Age),
                        1)
                    : 0
            };
        }
        public async Task UpdateAsync(Guid teamId, TeamDto request)
        {
            var team = await _dbContext.Teams
                .FirstOrDefaultAsync(t => t.Id == teamId);

            if (team == null)
            {
                throw new Exception("Team not found.");
            }

            var teamNameExists = await _dbContext.Teams
                .AnyAsync(t =>
                    t.Name == request.Name &&
                    t.Id != teamId);

            if (teamNameExists)
            {
                throw new Exception("Team already exists.");
            }

            var leagueExists = await _dbContext.Leagues
                .AnyAsync(l => l.Id == request.LeagueId);

            if (!leagueExists)
            {
                throw new Exception("League not found.");
            }

            var managerExists = await _dbContext.Users
                .AnyAsync(u => u.Id == request.ManagerId);

            if (!managerExists)
            {
                throw new Exception("Manager not found.");
            }

            var managerAlreadyAssigned = await _dbContext.Teams
                .AnyAsync(t =>
                    t.ManagerId == request.ManagerId &&
                    t.Id != teamId);

            if (managerAlreadyAssigned)
            {
                throw new Exception("Manager already has a team.");
            }

            team.Name = request.Name;
            team.City = request.City;
            team.Country = request.Country;
            team.LeagueId = request.LeagueId;
            team.ManagerId = request.ManagerId;

            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<PlayerListItemDto>> GetPlayersAsync(Guid teamId)
        {
            var teamExists = await _dbContext.Teams
                .AnyAsync(t => t.Id == teamId);

            if (!teamExists)
            {
                throw new Exception("Team not found.");
            }

            return await _dbContext.Players
                .Where(p => p.TeamId == teamId)
                .OrderBy(p => p.LastName)
                .ThenBy(p => p.FirstName)
                .Select(p => new PlayerListItemDto
                {
                    Id = p.Id,

                    FullName = $"{p.FirstName} {p.LastName}",

                    Age = p.Age,

                    Position = p.Position.ToString(),

                    TeamName = p.Team.Name
                })
                .ToListAsync();
        }
        public async Task DeleteAsync(Guid teamId)
        {
            var team = await _dbContext.Teams.FindAsync(teamId);

            if (team == null)
            {
                return;
            }

            var hasPlayers = await _dbContext.Players
                .AnyAsync(p => p.TeamId == teamId);

            if (hasPlayers)
            {
                throw new Exception("Cannot delete a team that still has players.");
            }

            _dbContext.Teams.Remove(team);

            await _dbContext.SaveChangesAsync();
        }
    }
}