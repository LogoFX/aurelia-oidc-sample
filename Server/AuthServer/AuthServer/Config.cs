using System.Collections.Generic;
using System.Linq;
using IdentityServer4.Models;

namespace AuthServer
{
    public class Config
    {
        private static readonly string[] AppHosts =
        {
            "https://localhost:4200",
            "https://mkt-dashboard.github.io",
            "https://aulogin.github.io",
        };

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("resourceapi", "Resource API")
                {
                    Scopes = {new Scope("api.read")}
                }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new[]
            {
                new Client
                {
                    RequireConsent = false,
                    ClientId = "angular_spa",
                    ClientName = "Angular SPA",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowedScopes = {"openid", "profile", "email", "api.read"},
                    RedirectUris = AppHosts.Select(x => $"{x}/signin-oidc").ToArray(),
                    PostLogoutRedirectUris = AppHosts.Select(x => $"{x}/signout-oidc").ToArray(),
                    AllowedCorsOrigins = AppHosts,
                    AllowAccessTokensViaBrowser = true,
                    AccessTokenLifetime = 3600
                }
            };
        }
    }
}
