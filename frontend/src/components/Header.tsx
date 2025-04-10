import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  return (
    <header className="p-4 bg-blue-500 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Graph8 Test</h1>
      <nav className="space-x-4">
        <Link to="/">
          <Button variant="link" className="text-white hover:text-gray-200">
            Companies
          </Button>
        </Link>
        <Link to="/contacts">
          <Button variant="link" className="text-white hover:text-gray-200">
            Contacts
          </Button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
