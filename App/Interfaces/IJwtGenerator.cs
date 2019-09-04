using Domain;

namespace App.Interfaces
{
    public interface IJwtGenerator
    {
         string CreateToken(AppUser user);
    }
}