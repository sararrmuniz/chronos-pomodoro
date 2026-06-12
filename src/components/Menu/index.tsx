import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon/>,
    light: <MoonIcon/>,
  };

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme)
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <Link
        to='/'
        className={styles.menuLink}
        aria-label='Ir para a Home'
        title='Ir para Home'
      >
        <HouseIcon />
      </Link>
      <Link
        to='/history'
        className={styles.menuLink}
        aria-label='Ver Histórico'
        title='Ver Histórico'
      >
        <HistoryIcon />
      </Link>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </a>
      <a
        href='#'
        onClick={handleThemeChange}
        className={styles.menuLink}
        aria-label='Mudar Tema'
        title='Mudar Tema'
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
