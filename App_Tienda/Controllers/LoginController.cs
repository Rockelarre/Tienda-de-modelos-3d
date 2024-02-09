using App_Tienda.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace App_Tienda.Controllers
{
    public class LoginController : Controller
    {
        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }
    }
}
