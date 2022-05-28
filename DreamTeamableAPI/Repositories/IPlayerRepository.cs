using DreamTeamableAPI.Models;

namespace DreamTeamableAPI.Repositories
{
    public interface IPlayerRepository
    {
        List<Player> GetAllPlayers();
        Player GetPlayerById(int id);
        void AddPlayer(Player player);
        void UpdatePlayer(Player player);
        void DeletePlayer(int id);
    }
}
