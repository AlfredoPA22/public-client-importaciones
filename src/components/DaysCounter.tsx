import './DaysCounter.css';
import { parseDate } from '../utils/date';

interface DaysCounterProps {
  fechaTentativaEntrega: string;
}

const formatDifference = (days: number) => {
  if (days === 0) return '¡La entrega es hoy!';
  if (days > 0) return `Faltan ${days} día${days === 1 ? '' : 's'} para la entrega estimada.`;
  const absoluteDays = Math.abs(days);
  return `La fecha estimada se superó hace ${absoluteDays} día${absoluteDays === 1 ? '' : 's'}.`;
};

const DaysCounter = ({ fechaTentativaEntrega }: DaysCounterProps) => {
  const targetDate = parseDate(fechaTentativaEntrega);

  if (!targetDate) {
    return (
      <div className="days-counter-card">
        <p className="days-counter-label">Fecha tentativa de entrega</p>
        <p className="days-counter-description">Fecha no disponible</p>
      </div>
    );
  }

  const today = new Date();

  const startTarget = new Date(targetDate);
  startTarget.setHours(0, 0, 0, 0);

  const startToday = new Date(today);
  startToday.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((startTarget.getTime() - startToday.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="days-counter-card">
      <p className="days-counter-label">Fecha tentativa de entrega</p>
      <h3 className="days-counter-date">
        {targetDate.toLocaleDateString(undefined, {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </h3>
      <p className="days-counter-description">{formatDifference(diffDays)}</p>
    </div>
  );
};

export default DaysCounter;

