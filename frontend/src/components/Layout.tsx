import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, KanbanSquare, Sun, Moon, Briefcase, Plus, Menu} from 'lucide-react';
import { Modal } from './Modal';
import { AddApplicationForm } from './AddApplicationForm';
import styles from './Layout.module.css';

interface LayoutProps { children: ReactNode; }

export const Layout = ({ children }: LayoutProps) => {
    const [isDark, setIsDark] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') { setIsDark(true); document.body.classList.add('dark'); }
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', newTheme);
        setIsDark(!isDark);
    };

    useEffect(() => setIsSidebarOpen(false), [location.pathname]);

    return (
        <div className={styles.layout}>
            <button className={styles.burgerBtn} onClick={() => setIsSidebarOpen(true)}>
                <Menu size={24} />
            </button>

            <div className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.open : ''}`} onClick={() => setIsSidebarOpen(false)} />

            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <div className={styles.logo}>
                    <Briefcase size={28} />
                    <span>JobTracker</span>
                </div>

                <button className={styles.addBtn} onClick={() => { setIsModalOpen(true); setIsSidebarOpen(false); }}>
                    <Plus size={20} /> Создать
                </button>

                <nav className={styles.nav}>
                    <Link to="/" className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}>
                        <LayoutDashboard size={20} /> Дашборд
                    </Link>
                    <Link to="/board" className={`${styles.navLink} ${location.pathname === '/board' ? styles.active : ''}`}>
                        <KanbanSquare size={20} /> Kanban Доска
                    </Link>
                </nav>

                <div className={styles.sidebarFooter}>
                    <button onClick={toggleTheme} className={styles.themeToggle}>
                        {isDark ? <Sun size={22} /> : <Moon size={22} />}
                    </button>
                </div>
            </aside>

            <main className={styles.mainContent}>
                <div className={styles.pageContent}>
                    {children}
                </div>
            </main>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <AddApplicationForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};