using DreamTeamableAPI.Models;
using Microsoft.Data.SqlClient;

namespace DreamTeamableAPI.Repositories
{
    public class LineupRepository : ILineupRepository
    {
        private readonly IConfiguration _config;

        // The constructor accepts an IConfiguration object as a parameter. This class comes from the ASP.NET framework and is useful for retrieving things out of the appsettings.json file like connection strings.
        public LineupRepository(IConfiguration config)
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

        public List<Lineup> GetAllLineups()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT *
                    FROM Lineups";

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Lineup> lineups = new List<Lineup>();
                    while (reader.Read())
                    {
                        Lineup lineup = new Lineup
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            LineupLogo = reader.GetString(reader.GetOrdinal("LineupLogo")),
                            LineupName = reader.GetString(reader.GetOrdinal("LineupName")),
                            Favorite = reader.GetInt32(reader.GetOrdinal("Favorite")),
                            CatcherId = reader.GetString(reader.GetOrdinal("CatcherId")),
                            FirstbaseId = reader.GetString(reader.GetOrdinal("FirstbaseId")),
                            SecondbaseId = reader.GetString(reader.GetOrdinal("SecondbaseId")),
                            ShortstopId = reader.GetString(reader.GetOrdinal("ShortstopId")),
                            ThirdbaseId = reader.GetString(reader.GetOrdinal("ThirdbaseId")),
                            LeftFieldId = reader.GetString(reader.GetOrdinal("LeftFieldId")),
                            CenterFieldId = reader.GetString(reader.GetOrdinal("CenterFieldId")),
                            RightFieldId = reader.GetString(reader.GetOrdinal("RightFieldId")),
                            StartingPitchId = reader.GetString(reader.GetOrdinal("StartingPitcherId")),
                            ClosingPitcherId = reader.GetString(reader.GetOrdinal("ClosingPitcherId"))
                        };

                        lineups.Add(lineup);
                    }

                    reader.Close();
                    return lineups;
                }
            }
        }

        public Lineup GetLineupsById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               UserId,
                                               LineupLogo,
                                               LineupName,
                                               Favorite,
                                               CatcherId,
                                               FirstbaseId,
                                               SecondbaseId,
                                               ShortstopId,
                                               ThirdbaseId,
                                               LeftFieldId,
                                               CenterFieldId,
                                               RightFieldId,
                                               StartingPitcherId,
                                               ClosingPitcherId
                                        FROM Lineups
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Lineup lineup = new Lineup
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                UserId = reader.GetString(reader.GetOrdinal("UserId")),
                                LineupLogo = reader.GetString(reader.GetOrdinal("LineupLogo")),
                                LineupName = reader.GetString(reader.GetOrdinal("LineupName")),
                                Favorite = reader.GetInt32(reader.GetOrdinal("Favorite")),
                                CatcherId = reader.GetString(reader.GetOrdinal("CatcherId")),
                                FirstbaseId = reader.GetString(reader.GetOrdinal("FirstbaseId")),
                                SecondbaseId = reader.GetString(reader.GetOrdinal("SecondbaseId")),
                                ShortstopId = reader.GetString(reader.GetOrdinal("ShortstopId")),
                                ThirdbaseId = reader.GetString(reader.GetOrdinal("ThirdbaseId")),
                                LeftFieldId = reader.GetString(reader.GetOrdinal("LeftFieldId")),
                                CenterFieldId = reader.GetString(reader.GetOrdinal("CenterFieldId")),
                                RightFieldId = reader.GetString(reader.GetOrdinal("RightFieldId")),
                                StartingPitchId = reader.GetString(reader.GetOrdinal("StartingPitcherId")),
                                ClosingPitcherId = reader.GetString(reader.GetOrdinal("ClosingPitcherId"))
                            };

                            return lineup;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }

        public void AddLineup(Lineup lineup)
        {
            using(SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Lineups (UserId, LineupLogo, LineupName, Favorite, CatcherId, FirstbaseId, SecondbaseId, ShortstopId,  ThirdbaseId,  LeftFieldId, CenterFieldId, RightFieldId, StartingPitcherId, ClosingPitcherId)
                    OUTPUT INSERTED.ID
                    VALUES (@userId, @lineupLogo, @lineupName, @favorite, @catcherId, @firstbaseId, @secondbaseId, @shortstopId, @thirdbaseId, @leftFieldId, @centerFieldId, @rightFieldId, @startingPitcherId, @closingPitcherId);
                    ";

                    cmd.Parameters.AddWithValue("@userId", lineup.UserId);
                    cmd.Parameters.AddWithValue("@lineupLogo", lineup.LineupLogo);
                    cmd.Parameters.AddWithValue("@lineupName", lineup.LineupName);
                    cmd.Parameters.AddWithValue("@favorite", lineup.Favorite);
                    cmd.Parameters.AddWithValue("@catcherId", lineup.CatcherId);
                    cmd.Parameters.AddWithValue("@firstbaseId", lineup.FirstbaseId);
                    cmd.Parameters.AddWithValue("@secondbaseId", lineup.SecondbaseId);
                    cmd.Parameters.AddWithValue("@shortstopId", lineup.ShortstopId);
                    cmd.Parameters.AddWithValue("@thirdbaseId", lineup.ThirdbaseId);
                    cmd.Parameters.AddWithValue("@leftFieldId", lineup.LeftFieldId);
                    cmd.Parameters.AddWithValue("@centerFieldId", lineup.CenterFieldId);
                    cmd.Parameters.AddWithValue("@rightFieldId", lineup.RightFieldId);
                    cmd.Parameters.AddWithValue("@startingPitcherId", lineup.StartingPitchId);
                    cmd.Parameters.AddWithValue("@closingPitcherId", lineup.ClosingPitcherId);

                    int newlyCreatedId = (int)cmd.ExecuteScalar();

                    lineup.Id = newlyCreatedId;
                }
            }
        }

        public void UpdateLineup(Lineup lineup)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Lineups
                                       SET
                                               UserId = @userId,
                                               LineupLogo = @lineupLogo,
                                               LineupName = @lineupName,
                                               Favorite = @favorite,
                                               CatcherId = @catcherId,
                                               FirstbaseId = @firstbaseId,
                                               SecondbaseId = @secondbaseId,
                                               ShortstopId = @shortstopId,
                                               ThirdbaseId = @thirdbaseId,
                                               LeftFieldId = @leftFieldId,
                                               CenterFieldId = @centerFieldId,
                                               RightFieldId = @rightFieldId,
                                               StartingPitcherId = @startingPitcherId,
                                               ClosingPitcherId = @closingPitcherId
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", lineup.Id);
                    cmd.Parameters.AddWithValue("@userId", lineup.UserId);
                    cmd.Parameters.AddWithValue("@lineupLogo", lineup.LineupLogo);
                    cmd.Parameters.AddWithValue("@lineupName", lineup.LineupName);
                    cmd.Parameters.AddWithValue("@favorite", lineup.Favorite);
                    cmd.Parameters.AddWithValue("@catcherId", lineup.CatcherId);
                    cmd.Parameters.AddWithValue("@firstbaseId", lineup.FirstbaseId);
                    cmd.Parameters.AddWithValue("@secondbaseId", lineup.SecondbaseId);
                    cmd.Parameters.AddWithValue("@shortstopId", lineup.ShortstopId);
                    cmd.Parameters.AddWithValue("@thirdbaseId", lineup.ThirdbaseId);
                    cmd.Parameters.AddWithValue("@leftFieldId", lineup.LeftFieldId);
                    cmd.Parameters.AddWithValue("@centerFieldId", lineup.CenterFieldId);
                    cmd.Parameters.AddWithValue("@rightFieldId", lineup.RightFieldId);
                    cmd.Parameters.AddWithValue("@startingPitcherId", lineup.StartingPitchId);
                    cmd.Parameters.AddWithValue("@closingPitcherId", lineup.ClosingPitcherId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteLineup(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM  Lineups
                    WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }            }
        }
    }
}
