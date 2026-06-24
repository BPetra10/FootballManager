using FootballLeagueManager.API.Data;
using FootballLeagueManager.API.DTOs;
using FootballLeagueManager.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FootballLeagueManager.API.Services
{
    public class PlayerService
    {
        private readonly FootballLeagueDbContext _dbContext;

        public PlayerService(FootballLeagueDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreatePlayerAsync(PlayerDto request)
        {
            var teamExists = await _dbContext.Teams
                .AnyAsync(t => t.Id == request.TeamId);

            if (!teamExists)
            {
                throw new Exception("Team not found.");
            }

            var exists = await _dbContext.Players.AnyAsync(p =>
                p.FirstName == request.FirstName &&
                p.LastName == request.LastName &&
                p.Age == request.Age &&
                p.Position == request.Position &&
                p.PreferredFoot == request.PreferredFoot &&
                p.Pace == request.Pace &&
                p.Shooting == request.Shooting &&
                p.Passing == request.Passing &&
                p.Dribbling == request.Dribbling &&
                p.Defending == request.Defending &&
                p.Physical == request.Physical &&
                p.TeamId == request.TeamId);

            if (exists)
            {
                throw new Exception("Player already exists.");
            }

            var player = new Player
            {
                Id = Guid.NewGuid(),
                FirstName = request.FirstName,
                LastName = request.LastName,
                Age = request.Age,
                Position = request.Position,
                PreferredFoot = request.PreferredFoot,
                Pace = request.Pace,
                Shooting = request.Shooting,
                Passing = request.Passing,
                Dribbling = request.Dribbling,
                Defending = request.Defending,
                Physical = request.Physical,
                TeamId = request.TeamId
            };

            _dbContext.Players.Add(player);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<PlayerListItemDto>> GetAllAsync()
        {
            return await _dbContext.Players
                .Include(p => p.Team)
                .Select(p => new PlayerListItemDto
                {
                    Id = p.Id,
                    FullName = p.FirstName + " " + p.LastName,
                    TeamName = p.Team.Name
                })
                .ToListAsync();
        }

        public async Task DeleteAsync(Guid playerId)
        {
            var player = await _dbContext.Players
                .FindAsync(playerId);

            if (player == null)
            {
                return;
            }

            _dbContext.Players.Remove(player);

            await _dbContext.SaveChangesAsync();
        }
        public async Task<PlayerDto> GetByIdAsync(Guid playerId)
        {
            var player = await _dbContext.Players
                .FirstOrDefaultAsync(p => p.Id == playerId);

            if (player == null)
            {
                throw new Exception("Player not found.");
            }

            return new PlayerDto
            {
                FirstName = player.FirstName,
                LastName = player.LastName,
                Age = player.Age,
                Position = player.Position,
                PreferredFoot = player.PreferredFoot,
                Pace = player.Pace,
                Shooting = player.Shooting,
                Passing = player.Passing,
                Dribbling = player.Dribbling,
                Defending = player.Defending,
                Physical = player.Physical,
                TeamId = player.TeamId
            };
        }
        public async Task UpdateAsync(Guid playerId, PlayerDto request)
        {
            var player = await _dbContext.Players
                .FindAsync(playerId);

            if (player == null)
            {
                throw new Exception("Player not found.");
            }

            var teamExists = await _dbContext.Teams
                .AnyAsync(t => t.Id == request.TeamId);

            if (!teamExists)
            {
                throw new Exception("Team not found.");
            }

            player.FirstName = request.FirstName;
            player.LastName = request.LastName;
            player.Age = request.Age;
            player.Position = request.Position;
            player.PreferredFoot = request.PreferredFoot;
            player.Pace = request.Pace;
            player.Shooting = request.Shooting;
            player.Passing = request.Passing;
            player.Dribbling = request.Dribbling;
            player.Defending = request.Defending;
            player.Physical = request.Physical;
            player.TeamId = request.TeamId;

            await _dbContext.SaveChangesAsync();
        }
    }
}