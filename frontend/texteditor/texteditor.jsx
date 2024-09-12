import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Save, LogOut } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './responsive-styles.css'; // Make sure to import your CSS file

const TextEditor = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [content, setContent] = useState('');
  const [heading, setHeading] = useState('');
  const [author, setAuthor] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const editorRef = useRef(null);
  const { logout } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleSave = () => {
    const textToSave = `Heading: ${heading}\nAuthor: ${author}\n\n${content}`;
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);

    const fileName = `${heading || 'Untitled'} - ${author || 'Unknown'}.txt`;

    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    logout({ returnTo: window.location.origin });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <header className={`p-4 flex justify-between items-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <h1 className="text-2xl font-bold mr-10" id='heading'>ANVESHA Text Editor</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={handleLogout}
            className={`flex items-center justify-center space-x-2 p-2 rounded-lg ${
              darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
            } text-white font-semibold`}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
          {/* <button
            className={`menu-button ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            Menu
          </button> */}
        </div>
        <div className={`menu-content ${menuOpen ? 'active' : ''}`}>
          <div className="menu-item" onClick={() => { setMenuOpen(false); navigate('/pricing'); }}>
            Pricing
          </div>
          {/* Add more menu items here if needed */}
        </div>
      </header>
      <main className="container mx-auto p-4">
        <input
          type="text"
          placeholder="Enter heading"
          value={heading}
          onChange={handleHeadingChange}
          className={`w-full p-2 mb-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
        />
        <input
          type="text"
          placeholder="Enter author name"
          value={author}
          onChange={handleAuthorChange}
          className={`w-full p-2 mb-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
        />
        <textarea
          ref={editorRef}
          value={content}
          onChange={handleContentChange}
          className={`w-full h-96 p-2 rounded resize-none ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          placeholder="Start typing here..."
        />
        <button
          onClick={handleSave}
          className={`flex items-center justify-center space-x-2 p-2 mt-4 rounded-lg ${
            darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-semibold`}
        >
          <Save size={20} />
          <span>Save Text</span>
        </button>
      </main>
      <footer className={`p-4 text-center ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        {/* <p>© 2024 ANVESHA. All rights reserved.</p> */}
      </footer>
    </div>
  );
};

export default TextEditor;
