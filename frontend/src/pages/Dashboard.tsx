import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Legend
} from 'recharts';
import { Briefcase, Send, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { useApplications } from '../hooks/useApplications';
import { StatsCard } from '../components/StatsCard';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
  const { data: apps, isLoading } = useApplications();

  const stats = useMemo(() => {
    if (!apps) return null;

    const countByStatus = (s: string) => apps.filter(a => a.status === s).length;

    const chartData = [
      { name: 'Отправлено', value: countByStatus('Sent'), fill: '#4f46e5' },
      { name: 'Интервью', value: countByStatus('Interview'), fill: '#f59e0b' },
      { name: 'Офферы', value: countByStatus('Offer'), fill: '#10b981' },
      { name: 'Отказы', value: countByStatus('Rejected'), fill: '#ef4444' },
    ];

    return {
      total: apps.length,
      sent: countByStatus('Sent'),
      interviews: countByStatus('Interview'),
      offers: countByStatus('Offer'),
      rejected: countByStatus('Rejected'),
      chartData
    };
  }, [apps]);

  if (isLoading) return <h2>Загрузка статистики...</h2>;
  if (!stats) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Обзор поиска работы</h2>

      <div className={styles.statsGrid}>
        <StatsCard label="Всего откликов" value={stats.total} icon={Briefcase} color="#6366f1" />
        <StatsCard label="Отправлено" value={stats.sent} icon={Send} color="#4f46e5" />
        <StatsCard label="Интревью" value={stats.interviews} icon={MessageSquare} color="#f59e0b" />
        <StatsCard label="Офферы" value={stats.offers} icon={CheckCircle} color="#10b981" />
        <StatsCard label="Отказы" value={stats.rejected} icon={XCircle} color="#ef4444" />
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Воронка откликов</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={stats.chartData}
              style={{ outline: 'none' }}
              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'var(--bg-main)', opacity: 0.4 }}
                contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Распределение статусов</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart style={{ outline: 'none' }}>
              <Pie
                data={stats.chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};