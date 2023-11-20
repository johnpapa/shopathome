using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace ShopAtHome
{
    public static class Products
    {
        [FunctionName("products-get")]
        public static async Task<IActionResult> Get(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "products")] HttpRequest req,
            ILogger log)
        {
           return new OkObjectResult(new List<Product> { new Product(10, "Strawberries", "16oz package of fresh organic strawberries", 1),
                      new Product(20, "Sliced bread", "Loaf of fresh sliced wheat bread", 1),
                      new Product(30, "Apples", "Bag of 7 fresh McIntosh apples", 1)}); }
      

    }

    public record Product(int Id, string Name, string Description, int Quantity);

}
