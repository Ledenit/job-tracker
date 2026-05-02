import type { LucideIcon } from 'lucide-react';
import styles from './StatsCard.module.css';

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
}

export const StatsCard = ({ label, value, icon: Icon, color }: StatsCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper} style={{ backgroundColor: `${color}15`, color: color }}>
        <Icon size={24} />
      </div>
      <div className={styles.info}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
};