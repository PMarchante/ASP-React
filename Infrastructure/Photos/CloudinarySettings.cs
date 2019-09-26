namespace Infrastructure.Photos
{
    public class CloudinarySettings
    {
        //need to be exactly the same name used in the dotnet user-secrets
        public string CloudName { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecret { get; set; }
    }
}