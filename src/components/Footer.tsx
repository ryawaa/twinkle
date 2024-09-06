// components/Footer.tsx
import React from 'react';

// Footer functional component
const Footer: React.FC = () => {
  return (
    // The footer element with full width, background color, and text styling
    <footer className="w-full bg-crust text-text py-4 border-t-2 border-surface0">
      {/* Container to center the content and limit its max width */}
      <div className="container mx-auto max-w-7xl flex flex-col text-center items-center justify-center space-y-2">
        {/* Paragraph containing the footer text */}
        <p className="text-sm">
          this project is open-source and is available at{" "}
          <a href="https://github.com/ryanamay" className="text-blue-500 hover:underline">
            github.com/ryanamay
          </a>{" "}
          or{" "}
          <a href="https://code.lgbt/ryanamay" className="text-blue-500 hover:underline">
            code.lgbt/ryanamay
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;