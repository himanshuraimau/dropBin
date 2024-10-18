import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className="w-full p-4  text-center mt-4 rounded-lg">
      <p className="text-sm text-gray-700">Made by Himanshu</p>
      
       <a href="https://github.com/himanshuraimau"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center text-amber-600 hover:text-amber-800"
      >
        <FontAwesomeIcon icon={faGithub} className="text-2xl mr-2" />
        <span>GitHub</span>
      </a>
    </footer>
  )
}

export default Footer;