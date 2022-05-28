USE MASTER
GO

IF NOT EXISTS (
    SELECT [name]
    FROM sys.databases
    WHERE [name] = N'DreamTeamableAPI'
)
CREATE DATABASE DreamTeamableAPI
GO

USE DreamTeamableAPI
GO


DROP TABLE IF EXISTS Player;
DROP TABLE IF EXISTS Lineup;
DROP TABLE IF EXISTS [User];

CREATE TABLE Player (
	Id INTEGER NOT NULL,
	Position VARCHAR(255) NOT NULL,
	PlayerName VARCHAR(255) NOT NULL,
	ActiveOrRetired VARCHAR(255) NOT NULL,
	[Avg] DECIMAL(17 , 3),
	Hits VARCHAR(255),
	HomeRuns VARCHAR(255),
	Walks VARCHAR(255),
	ERA DECIMAL (17, 3),
	Strikeouts VARCHAR(255),
	Wins VARCHAR(255),
	Losses VARCHAR(255),
	Saves VARCHAR(255),
);

CREATE TABLE Lineups (
	Id INTEGER NOT NULL,
	UserId VARCHAR(255) NOT NULL,
	LineupName VARCHAR(200) NOT NULL,
	LineupLogo VARCHAR(200) NOT NULL,
	Favorite INTEGER NOT NULL,
	FirstbaseId VARCHAR(200) NOT NULL,
    SecondbaseId VARCHAR(200) NOT NULL,
	ShortstopId VARCHAR(200) NOT NULL,
	ThirdbaseId VARCHAR(200) NOT NULL,
	LeftFieldId VARCHAR(200) NOT NULL,
	CenterFieldId VARCHAR(200) NOT NULL,
	RightFieldId VARCHAR(200) NOT NULL,
	StartingPitcherId VARCHAR(200) NOT NULL,
	ClosingPitcherId VARCHAR(200) NOT NULL,
);

CREATE TABLE [User] (
	Id INTEGER NOT NULL,
	FirebaseUserId VARCHAR(200) NOT NULL,
	[Name] VARCHAR(200) NOT NULL,
	Email VARCHAR(200) NOT NULL,
)

INSERT INTO Player(Id,Position,PlayerName,ActiveOrRetired,[Avg],Hits,HomeRuns) VALUES (1,'1B','Albert Pujols','Active',0.297,3316,683);
INSERT INTO Player(Id,Position,PlayerName,ActiveOrRetired,[Avg],Hits,HomeRuns) VALUES (2,'2B','Ozzie Albies','Active',0.271,652,96);
INSERT INTO Player(Id,Position,PlayerName,ActiveOrRetired,[Avg],Hits,HomeRuns) VALUES (3,'SS','Derek Jeter','Retired',0.310,3465,260);
INSERT INTO Player(Id,Position,PlayerName,ActiveOrRetired,[Avg],Hits,HomeRuns) VALUES (4,'3B','Chipper Jones','Retired',0.303,2726,468);
INSERT INTO Player(Id,Position,PlayerName,ActiveOrRetired,[Avg],Hits,HomeRuns) VALUES (5,'LF','Barry Bonds','Retired',0.298,2935,762);
INSERT INTO Player(Id,Position,PlayerName,ActiveOrRetired,[Avg],Hits,HomeRuns) VALUES (6,'CF','Mike Trout','Active',0.305,1458,321);
INSERT INTO Player(Id,Position,PlayerName,ActiveOrRetired,[Avg],Hits,HomeRuns) VALUES (7,'RF','Ronald Acuna Jr','Active',0.298,443,107);
INSERT INTO Player(Id,Position,PlayerName,ActiveOrRetired,Walks,ERA,Strikeouts,Wins,Losses) VALUES (8,'SP','Randy Johnson','Retired',1497,3.29,4875,303,166);
INSERT INTO Player(Id,Position,PlayerName,ActiveOrRetired,Walks,ERA,Strikeouts,Saves) VALUES (9,'RP','Aldonis Champman','Active',300,3.86,1017,315);

INSERT INTO [User](Id,FirebaseUserId,[Name],Email) VALUES (1,'testfbKey','Gabriel Smith', 'gs123@gmail.com');

INSERT INTO Lineups(Id,UserId,LineupLogo,LineupName,Favorite,FirstbaseId,SecondbaseId,ShortstopId,ThirdbaseId,LeftFieldId,CenterFieldId,RightFieldId,StartingPitcherId,ClosingPitcherId) VALUES (1,'testfbKey','www.logo.com/png','Almighty',1,1,2,3,4,5,6,7,8,9);

DROP TABLE Lineups