using System.Collections.Generic;
using System.Threading;
using System.Web.Mvc;

namespace Casper.Mvc.Controllers
{
    public class ReactController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult Data()
        {
            var model = new List<dynamic>
            {
               new {id = 1, author = "Pete Hunt", text = "This is **one** comment"},
               new {id = 2, author = "Jordan Walke", text = "This is *another* comment"}
            };

            Thread.Sleep(1000);

            return Json(model, JsonRequestBehavior.AllowGet);

        }
    }
}