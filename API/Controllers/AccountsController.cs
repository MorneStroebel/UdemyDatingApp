using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountsController(AppDbContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDto)
    {
        var doesEmailExist = await EmailExists(registerDto.Email);
        if (doesEmailExist) return BadRequest("Email already exists");
        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            UserName = registerDto.UserName,
            Email = registerDto.Email,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        context.AppUsers.Add(user);
        await context.SaveChangesAsync();
        return new UserDTO
        {
            Id = user.Id.ToString(),
            UserName = user.UserName,
            Email = user.Email,
            Token = tokenService.CreateToken(user)
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
    {
        string invalidMessage = "Email or password is incorrect";
        var user = await context.AppUsers.SingleOrDefaultAsync(u => u.Email == loginDto.Email);
        if (user == null) return Unauthorized(invalidMessage);
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized(invalidMessage);
        }

        return new UserDTO
        {
            Id = user.Id.ToString(),
            UserName = user.UserName,
            Email = user.Email,
            Token = tokenService.CreateToken(user)
        };
    }

    private async Task<bool> EmailExists(string email)
    {
        return await context.AppUsers.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }
}