using DreamTeamableAPI.Models;

namespace DreamTeamableAPI.Repositories
{
    public interface IFavoriteRepository
    {
        List<Favorite> GetAllFavorites();
        Favorite GetFavoriteById(int id);
        void AddFavorite(Favorite favorite);
        void UpdateFavorite(Favorite favorite);
        void DeleteFavorite(int id);
    }
}
