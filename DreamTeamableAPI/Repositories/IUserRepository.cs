using DreamTeamableAPI.Models;

namespace DreamTeamableAPI.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAllUsers();
        User GetUserByFirebaseUid(string firebaseUserId);
        void AddUser(User user);
        void UpdateUser(User user); 
        void DeleteUser(string firebaseUserId);
    }
}
