namespace App.Photos
{
    //class to contain the return object from the cloudinary api
    public class PhotoUploadResult
    {
        public string PublicId { get; set; }
        public string Url { get; set; }
    }
}