const ErrorPage = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center px-4 max-w-xl mx-auto">
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
              alt="404 Animation"
              className="w-full h-64 object-cover"
            />
          </div>
  
          {/* Error Message */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Looks like you&apos;re lost
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            The page you are looking for is not available!
          </p>
  
          {/* Error Code */}
          <div className="flex items-center justify-center mb-8">
            <span className="text-6xl font-bold text-red-500 mr-4">404</span>
            <div className="h-16 w-px bg-gray-300"></div>
            <span className="ml-4 text-xl text-gray-600">Page Not Found</span>
          </div>
  
          <div className="space-x-4">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 border border-red-600 text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home Page
            </a>
          </div>
  
          <p className="mt-8 text-gray-500 text-sm">
            Don&apos;t worry, sometimes even the best of us get lost!
          </p>
        </div>
      </div>
    );
  };
  
  export default ErrorPage;