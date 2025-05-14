using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Application.DTOs.Auth;
using backend.Application.Exceptions;
using backend.Application.Interfaces.Authentication;
using Microsoft.AspNetCore.Identity;

namespace backend.Application.Services.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {

        private readonly IAuthenticationRepository _authenticationRepository;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthenticationService(IAuthenticationRepository authenticationRepository, RoleManager<IdentityRole> roleManager)
        {
            _authenticationRepository = authenticationRepository;
            _roleManager = roleManager;
        }

        public async Task<IdentityUser> Login(AuthRequest authRequest)
        {
            var user = await _authenticationRepository.GetUserByEmailAsync(authRequest.email);
            if (user != null )
            {
                if (await _authenticationRepository.Authenticate(user, authRequest.password))
                {
                    Console.WriteLine("Login successful!");
                    return user;
                }      
                
                throw new InvalidCredentialsException("Invalid credentials!");
            }
           
            throw new InvalidCredentialsException("Invalid credentials!");
        }

        public async Task<IdentityResult> CreateRole(string role)
        {

            var roliEkziston = await _roleManager.FindByNameAsync(role);

            if (roliEkziston == null)
            {
                var roliIRi = new IdentityRole(role);

                var roliKrijuar = await _roleManager.CreateAsync(roliIRi);

                return roliKrijuar;
            }
            else
            {
                throw new ExistsException("Ekziston nje rol me kete emer!");
            }
        }

        public async Task<IdentityResult> RemoveRole(string roli)
        {

            var roliEkziston = await _roleManager.FindByNameAsync(roli);

            if (roliEkziston != null)
            {
                var roliPerTuFshire = await _roleManager.DeleteAsync(roliEkziston);
                return roliPerTuFshire;
            }
            else
            {
                throw new Exception("Ky rol nuk u gjet ne sistem!");
            }
        }

        public async Task<IdentityResult> CreateAccount(Register register)
        {
            var ekzistonEmail = await _authenticationRepository.GetUserByEmailAsync(register.Email);
            var ekzistonUsername = await _authenticationRepository.GetUserByNameAsync(register.Username);

            if (ekzistonEmail != null)
            {

                throw new EmailTakenException("This email is taken!");
            }

            if (ekzistonUsername != null)
            {
                throw new UsernameTakenException("This username is taken!");
            }

            return await _authenticationRepository.CreateAccountAsync(register);
        }

    }
}
