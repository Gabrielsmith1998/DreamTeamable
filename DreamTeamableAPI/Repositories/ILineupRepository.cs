using DreamTeamableAPI.Models;

namespace DreamTeamableAPI.Repositories
{
    public interface ILineupRepository
    {
        List<Lineup> GetAllLineups();
        Lineup GetLineupsById(int id);
        void AddLineup(Lineup lineup);
        void UpdateLineup(Lineup lineup);
        void DeleteLineup(int id);
    }
}
