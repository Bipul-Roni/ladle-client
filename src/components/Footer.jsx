import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router';
import Logo from './Logo';

const socials = [
  { href: 'https://facebook.com', label: 'Facebook', icon: FaFacebookF },
  { href: 'https://instagram.com', label: 'Instagram', icon: FaInstagram },
  { href: 'https://pinterest.com', label: 'Pinterest', icon: FaPinterestP },
  { href: 'https://youtube.com', label: 'YouTube', icon: FaYoutube },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="container-x grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">
            A shared recipe book where home cooks save, swap and like the dishes they actually make.
          </p>
        </div>

        <div>
          <h3 className="text-lg text-ink">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li className="flex items-center gap-2"><FiMail /> <a href="mailto:hello@ladle.app" className="hover:text-ink">hello@ladle.app</a></li>
            <li className="flex items-center gap-2"><FiPhone /> <a href="tel:+8801700000000" className="hover:text-ink">+880 1700-000000</a></li>
            <li className="flex items-center gap-2"><FiMapPin /> Dhanmondi, Dhaka, Bangladesh</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg text-ink">Follow along</h3>
          <div className="mt-3 flex gap-2">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink hover:bg-basil hover:text-onbasil"
              >
                <Icon />
              </a>
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-sm text-muted">
            <Link to="/all-recipes" className="hover:text-ink">All recipes</Link>
            <Link to="/add-recipe" className="hover:text-ink">Add a recipe</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-sm text-muted">
        © {new Date().getFullYear()} Ladle. All rights reserved.
      </div>
    </footer>
  );
}
