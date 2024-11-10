const Footer = () => {
  return (
    <footer className="w-full p-4 text-center mt-4 rounded-lg">
      <p className="text-sm text-gray-700">Made by Himanshu</p>
      
      <a
        href="https://github.com/himanshuraimau"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center text-amber-600 hover:text-amber-800"
      >
        <svg
          className="w-6 h-6 mr-2 text-amber-600"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.477 2 2 6.486 2 12.017c0 4.426 2.865 8.188 6.839 9.514.5.091.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.909-.625.069-.613.069-.613 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.254-4.555-1.114-4.555-4.957 0-1.094.39-1.988 1.03-2.686-.104-.255-.447-1.281.098-2.67 0 0 .841-.27 2.75 1.026A9.535 9.535 0 0 1 12 6.8c.85.004 1.706.115 2.506.337 1.908-1.296 2.748-1.026 2.748-1.026.547 1.389.203 2.415.1 2.67.641.698 1.029 1.592 1.029 2.686 0 3.852-2.339 4.7-4.566 4.95.36.309.682.92.682 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.576.688.478C19.137 20.2 22 16.442 22 12.017 22 6.486 17.523 2 12 2z"/>
        </svg>
        <span>GitHub</span>
      </a>
    </footer>
  )
}

export default Footer;
