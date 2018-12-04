using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Mail;
using System.Text;

namespace EdirneTasimaci.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        [HttpGet]
        public ActionResult Contact()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Contact(string name, string email, string message)
        {
            
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);

                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new System.Net.NetworkCredential("surveydck@gmail.com", "10121993CAN");
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.EnableSsl = true;
                MailMessage mail = new MailMessage();

                //Setting From , To and CC
                mail.From = new MailAddress("surveydck@gmail.com", "Test");
                mail.To.Add(new MailAddress("surveydck@gmail.com"));
                //mail.CC.Add(new MailAddress("webyazilim@dogruyer.com.tr"));
                mail.Body = "İsim: " + name + "," + " Email: " + email + "," + " Mesaj " + message;

                smtpClient.Send(mail);

                return View();
          
        }

        public ActionResult Hizmetlerimiz()
        {
            return View();
        }
    }
}