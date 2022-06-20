using DreamTeamableAPI.Models;
using Microsoft.Data.SqlClient;

namespace DreamTeamableAPI.Repositories
{
    public class FavoriteRepository : IFavoriteRepository
    {
        private readonly IConfiguration _config;

        // The constructor accepts an IConfiguration object as a parameter. This class comes from the ASP.NET framework and is useful for retrieving things out of the appsettings.json file like connection strings.
        public FavoriteRepository(IConfiguration config)
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

        public List<Favorite> GetAllFavorites()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               FavoriteUid,
                                               LineupId
                                        FROM Favorite";

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Favorite> favorites = new List<Favorite>();
                    while (reader.Read())
                    {
                        Favorite favorite = new Favorite
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FavoriteUid = reader.GetString(reader.GetOrdinal("FavoriteUid")),
                            LineupId = reader.GetString(reader.GetOrdinal("LineupId"))
                        };

                        favorites.Add(favorite);
                    }

                    reader.Close();

                    return favorites;
                }
            }
        }

        public Favorite GetFavoriteById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               FavoriteUid,
                                               LineupId
                                        FROM Favorite
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Favorite favorite = new Favorite
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                FavoriteUid = reader.GetString(reader.GetOrdinal("FavoriteUid")),
                                LineupId = reader.GetString(reader.GetOrdinal("LineupId"))
                            };

                            return favorite;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }

        public void AddFavorite(Favorite favorite)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Favorite (FavoriteUid, LineupId)
                    OUTPUT INSERTED.ID
                    VALUES (@favoriteUid, @lineupId);
                ";

                    if (favorite.FavoriteUid == null)
                    {
                        cmd.Parameters.AddWithValue("@favoriteUid", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@favoriteUid", favorite.FavoriteUid);
                    }


                    if (favorite.LineupId == null)
                    {
                        cmd.Parameters.AddWithValue("@lineupId", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@lineupId", favorite.LineupId);
                    }
                    int newlyCreatedId = (int)cmd.ExecuteScalar();

                    favorite.Id = newlyCreatedId;
                }
            }
        }

        public void UpdateFavorite(Favorite favorite)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Favorite
                            SET 
                               FavoriteUid = @favoriteUid,
                               LineupUid = @lineupUid
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@favoriteUid", favorite.FavoriteUid);
                    cmd.Parameters.AddWithValue("@lineupId", favorite.LineupId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteFavorite(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"DELETE FROM Favorite
                          WHERE Id = @id
                        ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

