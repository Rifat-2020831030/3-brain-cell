import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FaTwitter,FaInstagram } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Disaster Management</h2>
            <p className="text-gray-400 mb-4">
              Providing emergency response and disaster management services to
              protect communities and save lives.
            </p>
            <div className="flex space-x-4">
              <a
                href="facebook.com/uddhar"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook size={20} />
              </a>
              <a
                href="twitter.com/uddhar"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="instagram.com/uddhar"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/disasters"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Real time updates
                </a>
              </li>
              <li>
                <a
                  href="/tips"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Survival Tips
                </a>
              </li>
              <li>
                <a
                  href="/report"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Report Incident
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/volunteer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Volunteer
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/organization"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Organization
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-gray-400" />
                <span className="text-gray-400">Emergency: 1-800-123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-400" />
                <a
                  href="mailto:uddhar@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  uddhar@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-gray-400 mt-1" />
                <span className="text-gray-400">
                  123 Disaster St, Emergency City, EC 12345
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get latest updates and emergency alerts.
            </p>
            <form className="space-y-2">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              Uddhar: Disaster Management Plateform. <br /> ©{" "}
              {new Date().getFullYear()} All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm">
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms-of-service"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/cookie-policy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
