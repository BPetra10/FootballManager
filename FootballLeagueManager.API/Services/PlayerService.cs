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

                TeamId = request.TeamId
            };

            if (request.Position == Position.Goalkeeper)
            {
                if (request.GoalkeeperStats == null)
                {
                    throw new Exception("Goalkeeper stats are required.");
                }

                player.GoalkeeperStats = new GoalkeeperStats
                {
                    PlayerId = player.Id,

                    Diving = request.GoalkeeperStats.Diving,

                    Handling = request.GoalkeeperStats.Handling,

                    Kicking = request.GoalkeeperStats.Kicking,

                    Reflexes = request.GoalkeeperStats.Reflexes,

                    Speed = request.GoalkeeperStats.Speed,

                    Positioning = request.GoalkeeperStats.Positioning
                };
            }
            else
            {
                if (request.FieldStats == null)
                {
                    throw new Exception("Field player stats are required.");
                }

                player.FieldPlayerStats = new FieldPlayerStats
                {
                    PlayerId = player.Id,

                    Pace = request.FieldStats.Pace,

                    Shooting = request.FieldStats.Shooting,

                    Passing = request.FieldStats.Passing,

                    Dribbling = request.FieldStats.Dribbling,

                    Defending = request.FieldStats.Defending,

                    Physical = request.FieldStats.Physical
                };
            }

            _dbContext.Players.Add(player);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<PlayerListItemDto>> GetAllAsync()
        {
            return await _dbContext.Players
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

        public async Task<PlayerResponse> GetByIdAsync(Guid playerId)
        {
            var player = await _dbContext.Players
                .Include(p => p.Team)
                .Include(p => p.FieldPlayerStats)
                .Include(p => p.GoalkeeperStats)
                .FirstOrDefaultAsync(p => p.Id == playerId);

            if (player == null)
            {
                throw new Exception("Player not found.");
            }

            var response = new PlayerResponse
            {
                FirstName = player.FirstName,

                LastName = player.LastName,

                Age = player.Age,

                Position = player.Position.ToString(),

                PreferredFoot = player.PreferredFoot.ToString(),

                TeamId = player.TeamId,

                TeamName = player.Team.Name,

                Overall = CalculateOverall(player)
            };

            if (player.Position == Position.Goalkeeper)
            {
                if (player.GoalkeeperStats == null)
                {
                    throw new Exception("Goalkeeper stats not found.");
                }

                response.GoalkeeperStats = new GoalkeeperStatsDto
                {
                    Diving = player.GoalkeeperStats.Diving,

                    Handling = player.GoalkeeperStats.Handling,

                    Kicking = player.GoalkeeperStats.Kicking,

                    Reflexes = player.GoalkeeperStats.Reflexes,

                    Speed = player.GoalkeeperStats.Speed,

                    Positioning = player.GoalkeeperStats.Positioning
                };
            }
            else
            {
                if (player.FieldPlayerStats == null)
                {
                    throw new Exception("Field player stats not found.");
                }

                response.FieldStats = new FieldPlayerStatsDto
                {
                    Pace = player.FieldPlayerStats.Pace,

                    Shooting = player.FieldPlayerStats.Shooting,

                    Passing = player.FieldPlayerStats.Passing,

                    Dribbling = player.FieldPlayerStats.Dribbling,

                    Defending = player.FieldPlayerStats.Defending,

                    Physical = player.FieldPlayerStats.Physical
                };
            }

            return response;
        }

        public async Task UpdateAsync(Guid playerId, PlayerDto request)
        {
            var player = await _dbContext.Players
                .Include(p => p.FieldPlayerStats)
                .Include(p => p.GoalkeeperStats)
                .FirstOrDefaultAsync(p => p.Id == playerId);

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
            player.TeamId = request.TeamId;

            if (request.Position == Position.Goalkeeper)
            {
                if (request.GoalkeeperStats == null)
                {
                    throw new Exception("Goalkeeper stats are required.");
                }

                if (player.GoalkeeperStats == null)
                {
                    player.GoalkeeperStats = new GoalkeeperStats
                    {
                        PlayerId = player.Id
                    };
                }

                player.GoalkeeperStats.Diving = request.GoalkeeperStats.Diving;
                player.GoalkeeperStats.Handling = request.GoalkeeperStats.Handling;
                player.GoalkeeperStats.Kicking = request.GoalkeeperStats.Kicking;
                player.GoalkeeperStats.Reflexes = request.GoalkeeperStats.Reflexes;
                player.GoalkeeperStats.Speed = request.GoalkeeperStats.Speed;
                player.GoalkeeperStats.Positioning = request.GoalkeeperStats.Positioning;

                if (player.FieldPlayerStats != null)
                {
                    _dbContext.FieldPlayerStats.Remove(player.FieldPlayerStats);
                }
            }
            else
            {
                if (request.FieldStats == null)
                {
                    throw new Exception("Field player stats are required.");
                }

                if (player.FieldPlayerStats == null)
                {
                    player.FieldPlayerStats = new FieldPlayerStats
                    {
                        PlayerId = player.Id
                    };
                }

                player.FieldPlayerStats.Pace = request.FieldStats.Pace;
                player.FieldPlayerStats.Shooting = request.FieldStats.Shooting;
                player.FieldPlayerStats.Passing = request.FieldStats.Passing;
                player.FieldPlayerStats.Dribbling = request.FieldStats.Dribbling;
                player.FieldPlayerStats.Defending = request.FieldStats.Defending;
                player.FieldPlayerStats.Physical = request.FieldStats.Physical;

                if (player.GoalkeeperStats != null)
                {
                    _dbContext.GoalkeeperStats.Remove(player.GoalkeeperStats);
                }
            }

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid playerId)
        {
            var player = await _dbContext.Players
                .Include(p => p.FieldPlayerStats)
                .Include(p => p.GoalkeeperStats)
                .FirstOrDefaultAsync(p => p.Id == playerId);

            if (player == null)
            {
                return;
            }

            _dbContext.Players.Remove(player);

            await _dbContext.SaveChangesAsync();
        }

        private static int CalculateOverall(Player player)
        {
            double overall = player.Position switch
            {
                Position.Goalkeeper => CalculateGoalkeeperOverall(player.GoalkeeperStats),

                Position.Defender => CalculateDefenderOverall(player.FieldPlayerStats),

                Position.Midfielder => CalculateMidfielderOverall(player.FieldPlayerStats),

                Position.Forward => CalculateForwardOverall(player.FieldPlayerStats),

                _ => 0
            };

            return (int)Math.Round(overall);
        }

        private static double CalculateGoalkeeperOverall(GoalkeeperStats? stats)
        {
            if (stats == null)
            {
                return 0;
            }

            return
                stats.Diving * 0.22 +
                stats.Handling * 0.20 +
                stats.Reflexes * 0.22 +
                stats.Positioning * 0.20 +
                stats.Kicking * 0.08 +
                stats.Speed * 0.08;
        }

        private static double CalculateDefenderOverall(FieldPlayerStats? stats)
        {
            if (stats == null)
            {
                return 0;
            }

            return
                stats.Defending * 0.35 +
                stats.Physical * 0.25 +
                stats.Pace * 0.15 +
                stats.Passing * 0.10 +
                stats.Dribbling * 0.10 +
                stats.Shooting * 0.05;
        }

        private static double CalculateMidfielderOverall(FieldPlayerStats? stats)
        {
            if (stats == null)
            {
                return 0;
            }

            return
                stats.Passing * 0.35 +
                stats.Dribbling * 0.25 +
                stats.Pace * 0.15 +
                stats.Defending * 0.10 +
                stats.Shooting * 0.10 +
                stats.Physical * 0.05;
        }

        private static double CalculateForwardOverall(FieldPlayerStats? stats)
        {
            if (stats == null)
            {
                return 0;
            }

            return
                stats.Shooting * 0.35 +
                stats.Pace * 0.25 +
                stats.Dribbling * 0.20 +
                stats.Passing * 0.10 +
                stats.Physical * 0.05 +
                stats.Defending * 0.05;
        }

    }
}