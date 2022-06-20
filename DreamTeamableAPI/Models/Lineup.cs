namespace DreamTeamableAPI.Models
{
    public class Lineup
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string LineupName { get; set; }
        public string LineupLogo { get; set; }
        public int Favorite { get; set; }
        public string CatcherId { get; set; }
        public string FirstbaseId  { get; set; }
        public string SecondbaseId { get; set; }
        public string ThirdbaseId { get; set; }
        public string ShortstopId { get; set; }
        public string LeftFieldId { get; set; }
        public string CenterFieldId { get; set; }
        public string RightFieldId { get; set; }
        public string StartingPitchId { get; set; }
        public string ClosingPitcherId { get; set; }
    }
}
