using App.Photos;
using Microsoft.AspNetCore.Http;

namespace App.Interfaces
{
    public interface IPhotoAccessor
    {
        PhotoUploadResult AddPhoto(IFormFile file);
        string DeletePhoto (string publicId);
    }

}