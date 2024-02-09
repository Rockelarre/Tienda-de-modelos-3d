using App_Tienda.Models;
using App_Tienda.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Cors;

namespace App_Tienda.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly SignInManager<Usuario> _signInManager;

        public AuthController(UserManager<Usuario> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            SignInManager<Usuario> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _signInManager = signInManager;
        }

        //auth/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] InboundUser inboundUser)
        {
            try
            {
                var user = new Usuario
                {
                    Nombre = inboundUser.Nombre,
                    PrimerApellido = inboundUser.PrimerApellido,
                    SegundoApellido = inboundUser.SegundoApellido,
                    Email = inboundUser.Email,
                    UserName = inboundUser.Email
                };

                bool userRoleExists = await _roleManager.RoleExistsAsync(RoleTypes.User.ToString());

                if (!userRoleExists)
                {
                    await _roleManager.CreateAsync(new IdentityRole("User"));
                }

                var result = await _userManager.CreateAsync(user, inboundUser.Password);
                await _userManager.AddToRoleAsync(user, "User");

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //auth/create
        [HttpPost("createadmin")]
        public async Task<IActionResult> CreateAdmin([FromBody] InboundUser inboundUser)
        {
            try
            {
                var user = new Usuario
                {
                    Nombre = inboundUser.Nombre,
                    PrimerApellido = inboundUser.PrimerApellido,
                    SegundoApellido = inboundUser.SegundoApellido,
                    Email = inboundUser.Email,
                    UserName = inboundUser.Email
                };

                bool userRoleExists = await _roleManager.RoleExistsAsync(RoleTypes.Admin.ToString());

                if (!userRoleExists)
                {
                    await _roleManager.CreateAsync(new IdentityRole("Admin"));
                }

                var result = await _userManager.CreateAsync(user, inboundUser.Password);
                await _userManager.AddToRoleAsync(user, "Admin");

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] InboundUser userInfo)
        {
            var result = await _signInManager.PasswordSignInAsync(userInfo.Email, userInfo.Password,
                 isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                var token = await BuildToken(userInfo, new[] { RoleTypes.User });

                return Ok(token);
            }
            else
            {
                return BadRequest("Email or password invalid!");
            }
        }

        private async Task<string> BuildToken(InboundUser userInfo, RoleTypes[] roleTypes)
        {
            var user = await _userManager.FindByEmailAsync(userInfo.Email);
            if (user == null) return null;

            var claims = new List<Claim>() {
              new Claim(JwtRegisteredClaimNames.Email, userInfo.Email),
              new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            foreach (var role in roleTypes)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.ToString()));
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddHours(1);
            JwtSecurityToken token = new JwtSecurityToken(
               issuer: null,
               audience: null,
               claims: claims,
               expires: expiration,
               signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
