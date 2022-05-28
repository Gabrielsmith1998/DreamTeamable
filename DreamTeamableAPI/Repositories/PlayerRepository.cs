using DreamTeamableAPI.Models;
using System.Data.SqlClient;

namespace DreamTeamableAPI.Repositories
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly IConfiguration _config;

        public PlayerRepository(IConfiguration config)
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

        public List<Player> GetAllPlayers()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT *
                                        FROM Player";
                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Player> players = new List<Player>();
                    while (reader.Read())
                    {
                        Player player = new Player
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PlayerName = reader.GetString(reader.GetOrdinal("PlayerName")),
                            Position = reader.GetString(reader.GetOrdinal("Position")),
                            ActiveOrRetired = reader.GetString(reader.GetOrdinal("ActiveOrRetired")),
                        };

                        if (reader.IsDBNull(reader.GetOrdinal("Avg")) == false)
                        {
                            player.Avg = reader.GetDecimal(reader.GetOrdinal("Avg"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("Hits")) == false)
                        {
                            player.Hits = reader.GetString(reader.GetOrdinal("Hits"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("HomeRuns")) == false)
                        {
                            player.HomeRuns = reader.GetString(reader.GetOrdinal("HomeRuns"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("Walks")) == false)
                        {
                            player.Walks = reader.GetString(reader.GetOrdinal("Walks"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("ERA")) == false)
                        {
                            player.ERA = reader.GetDecimal(reader.GetOrdinal("ERA"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("Wins")) == false)
                        {
                            player.Wins = reader.GetString(reader.GetOrdinal("Wins"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("Losses")) == false)
                        {
                            player.Losses = reader.GetString(reader.GetOrdinal("Losses"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("Saves")) == false)
                        {
                            player.Saves = reader.GetString(reader.GetOrdinal("Saves"));
                        }
                        players.Add(player);

                    }
                    reader.Close();
                    return players;
                }
            }
        }

        public Player GetPlayerById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT *
                                        FROM Player
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        Player player = new Player
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PlayerName = reader.GetString(reader.GetOrdinal("PlayerName")),
                            Position = reader.GetString(reader.GetOrdinal("Position")),
                            ActiveOrRetired = reader.GetString(reader.GetOrdinal("ActiveOrRetired")),
                        };

                        if (reader.IsDBNull(reader.GetOrdinal("Avg")) == false)
                        {
                            player.Avg = reader.GetDecimal(reader.GetOrdinal("Avg"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("Hits")) == false)
                        {
                            player.Hits = reader.GetString(reader.GetOrdinal("Hits"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("HomeRuns")) == false)
                        {
                            player.HomeRuns = reader.GetString(reader.GetOrdinal("HomeRuns"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("Walks")) == false)
                        {
                            player.Walks = reader.GetString(reader.GetOrdinal("Walks"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("ERA")) == false)
                        {
                            player.ERA = reader.GetDecimal(reader.GetOrdinal("ERA"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("Wins")) == false)
                        {
                            player.Wins = reader.GetString(reader.GetOrdinal("Wins"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("Losses")) == false)
                        {
                            player.Losses = reader.GetString(reader.GetOrdinal("Losses"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("Saves")) == false)
                        {
                            player.Saves = reader.GetString(reader.GetOrdinal("Saves"));
                        }
                        return player;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
        }

        public void AddPlayer(Player player)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Player (PlayerName, Position, ActiveOrRetired, [Avg], Hits, HomeRuns, Walks, ERA, Strikeouts, Wins, Losses, Saves)
                    OUTPUT INSERTED.ID
                    VALUES (@playerName, @position, @activeOrRetired, @avg, @hits, @homeRuns, @walks, @eRA, @strikeouts, @wins, @losses, @saves)
                    ";

                    cmd.Parameters.AddWithValue("@playerName", player.PlayerName);
                    cmd.Parameters.AddWithValue("@position", player.Position);
                    cmd.Parameters.AddWithValue("@activeOrRetired", player.ActiveOrRetired);

                    if (player.Avg.ToString() == null)
                    {
                        cmd.Parameters.AddWithValue("@avg", DBNull.Value);
                    } else
                    {
                        cmd.Parameters.AddWithValue("@avg", player.Avg);
                    };
                    if (player.Hits == null)
                    {
                        cmd.Parameters.AddWithValue("@hits", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@hits", player.Hits);
                    };
                    if (player.HomeRuns == null)
                    {
                        cmd.Parameters.AddWithValue("@homeRuns", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@homeRuns", player.HomeRuns);
                    };
                    if (player.Walks == null)
                    {
                        cmd.Parameters.AddWithValue("@walks", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@walks", player.Walks);
                    };
                    if (player.ERA.ToString() == null)
                    {
                        cmd.Parameters.AddWithValue("@eRA", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@eRA", player.ERA);
                    };
                    if (player.Strikeouts == null)
                    {
                        cmd.Parameters.AddWithValue("@strikeouts", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@strikeouts", player.Strikeouts);
                    };
                    if (player.Wins == null)
                    {
                        cmd.Parameters.AddWithValue("@wins", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@wins", player.Wins);
                    };
                    if (player.Losses == null)
                    {
                        cmd.Parameters.AddWithValue("@losses", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@losses", player.Losses);
                    };
                    if (player.Saves == null)
                    {
                        cmd.Parameters.AddWithValue("@saves", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@saves", player.Saves);
                    };

                    int newId = (int)cmd.ExecuteScalar();

                    player.Id = newId;
                }
            }
        }

        public void UpdatePlayer(Player player)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Player
                    SET
                        PlayerName = @playerName,
                        Position = @position,
                        ActiveOrRetired = @activeOrRetired,
                        Avg = @avg,
                        Hits = @hits,
                        HomeRuns = @homeRuns,
                        Walks = @walks,
                        ERA = @eRA,
                        Strikeouts = @strikeouts,
                        Wins = @wins,
                        Losses = @losses,
                        Saves = @saves
                    WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@playerName", player.PlayerName);
                    cmd.Parameters.AddWithValue("@position", player.Position);
                    cmd.Parameters.AddWithValue("@activeOrRetired", player.ActiveOrRetired);
                    cmd.Parameters.AddWithValue("id", player.Id);

                    if (player.Avg.ToString() == null)
                    {
                        cmd.Parameters.AddWithValue("@avg", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@avg", player.Avg);
                    };
                    if (player.Hits == null)
                    {
                        cmd.Parameters.AddWithValue("@hits", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@hits", player.Hits);
                    };
                    if (player.HomeRuns == null)
                    {
                        cmd.Parameters.AddWithValue("@homeRuns", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@homeRuns", player.HomeRuns);
                    };
                    if (player.Walks == null)
                    {
                        cmd.Parameters.AddWithValue("@walks", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@walks", player.Walks);
                    };
                    if (player.ERA.ToString() == null)
                    {
                        cmd.Parameters.AddWithValue("@eRA", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@eRA", player.ERA);
                    };
                    if (player.Strikeouts == null)
                    {
                        cmd.Parameters.AddWithValue("@strikeouts", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@strikeouts", player.Strikeouts);
                    };
                    if (player.Wins == null)
                    {
                        cmd.Parameters.AddWithValue("@wins", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@wins", player.Wins);
                    };
                    if (player.Losses == null)
                    {
                        cmd.Parameters.AddWithValue("@losses", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@losses", player.Losses);
                    };
                    if (player.Saves == null)
                    {
                        cmd.Parameters.AddWithValue("@saves", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@saves", player.Saves);
                    };

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeletePlayer(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"DELETE FROM Player
                          WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
