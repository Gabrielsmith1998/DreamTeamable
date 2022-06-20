SELECT *
FROM Player

ALTER TABLE Lineups
ADD CatcherId varchar(50)

UPDATE Lineups
SET CatcherId = 1141;


DELETE FROM Lineups
WHERE Id = 1002;

INSERT INTO [User] (FirebaseUserId, [Name], Email) VALUES ('BiNWutSB79VJvGqYhvJfdtfT7Y42', 'Gabriel', 'gabriel123@gmail.com')

INSERT INTO Player(Position, PlayerName, ActiveOrRetired, [Avg], Hits, HomeRuns) VALUES ('C', 'Johnny Bench', 'Retired', 0.267, 2048, 389)
