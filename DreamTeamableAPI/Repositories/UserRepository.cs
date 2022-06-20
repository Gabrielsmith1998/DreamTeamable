using DreamTeamableAPI.Models;
using Microsoft.Data.SqlClient;

namespace DreamTeamableAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;

        public UserRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        public List<User> GetAllUsers()
        {
            using(SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT *
                                        FROM [User];";

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<User> users = new List<User>();
                    while (reader.Read())
                    {
                        User user = new User
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                        };
                        users.Add(user);
                    }
                    reader.Close();
                    return users;
                }
            }
        }

        public User GetUserByFirebaseUid(string firebaseUid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT FirebaseUserId,
                                               [Name],
                                               Email
                                        FROM [User]
                                        WHERE FirebaseUserId = @firebaseUserId";

                    cmd.Parameters.AddWithValue("@firebaseUserId", firebaseUid);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            User user = new User
                            {
                                FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                            };

                            return user;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }

        public void AddUser(User user)
        {
            using (SqlConnection conn = Connection) 
            { 
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO [User] (FirebaseUserId, [Name], Email)
                    OUTPUT INSERTED.ID
                    VALUES (@firebaseUserId, @name, @email);
                ";

                    cmd.Parameters.AddWithValue("@firebaseUserId", user.FirebaseUserId);
                    cmd.Parameters.AddWithValue("@name", user.Name);
                    cmd.Parameters.AddWithValue("@email", user.Email);


                    int id = (int)cmd.ExecuteScalar();

                    user.Id = id;
                }
            }
        }

        public void UpdateUser(User user)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE [User]
                    SET
                        [Name] = @name,
                        Email = @email
                    WHERE FirebaseUserId = @firebaseUserId";


                    cmd.Parameters.AddWithValue("@firebaseUserId", user.FirebaseUserId);
                    cmd.Parameters.AddWithValue("@name", user.Name);
                    cmd.Parameters.AddWithValue("@email", user.Email);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void DeleteUser(string firebaseUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"DELETE FROM [User]
                          WHERE FirebaseUserId = @firebaseUserId
                    ";
                    cmd.Parameters.AddWithValue("@firebaseUserId", firebaseUserId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
