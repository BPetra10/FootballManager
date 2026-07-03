namespace FootballLeagueManager.API.Exceptions
{
    public class ValidationErrorsException : Exception
    {
        public Dictionary<string, string> Errors { get; }

        public ValidationErrorsException(
            Dictionary<string, string> errors)
            : base("Validation failed.")
        {
            Errors = errors;
        }
    }
}