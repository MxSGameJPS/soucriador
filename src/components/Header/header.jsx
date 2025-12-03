import style from "./header.module.css";
import { CgProfile } from "react-icons/cg";
export default function Header() {
  return (
    <div className={style.header}>
      <div className={style.logoContainer}>
        <img className={style.logo} src="/logo/logo.svg" alt="Logo" />
      </div>
      <nav className={style.menuContainer}>
        <ul className={style.menu}>
          <li className={style.menuItem}>Home</li>
          <li className={style.menuItem}>Planos</li>
          <li className={style.menuItem}>Sobre</li>
          <li className={style.menuItem}>Contato</li>
        </ul>
      </nav>
      <div className={style.profileContainer}>
        <CgProfile size={24}  />
      </div>
    </div>
  );
}
