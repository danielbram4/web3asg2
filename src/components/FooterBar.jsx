import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-center md:text-left">
          {/* Visual References */}
          <div>
            <h4 className="font-semibold text-md mb-1 text-indigo-400">🔗 References</h4>
            <ul className="text-sm space-y-1">
              <li>
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-300 hover:underline"
                >
                  Tailwind CSS
                </a>
              </li>
              <li>
                <a
                  href="https://res.cloudinary.com/funwebdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-300 hover:underline"
                >
                  Paintings CDN
                </a>
              </li>
            </ul>
          </div>

          {/* GitHub */}
          <div>
            <h4 className="font-semibold text-md mb-1 text-indigo-400">🐙 GitHub</h4>
            <a
              href="https://github.com/Sebmali/Comp-4513-Asg-2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-indigo-300 hover:underline"
            >
              Source Code
            </a>
          </div>

          {/* Acknowledgement */}
          <div>
            <h4 className="font-semibold text-md mb-1 text-indigo-400">🙏 Credits</h4>
            <p className="text-xs">
              Special thanks to our instructor for providing the resources and guidance to complete this project.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 w-full pt-2 text-xs text-center">
          &copy; 2025 | Developed by Sebastian Maliczewski &amp; Daniel Bahrami | All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
