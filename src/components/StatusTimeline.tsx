import type { ImportStatus, StatusHistoryEntry } from '../types';
import './StatusTimeline.css';
import { parseDate } from '../utils/date';

interface StatusTimelineProps {
  history: StatusHistoryEntry[];
  currentStatus: ImportStatus;
}

const STATUS_ORDER: ImportStatus[] = [
  'EN_PROCESO',
  'EN_TRANSITO',
  'EN_TALLER',
  'EN_ADUANA',
  'ENTREGADO',
];

const StatusTimeline = ({ history, currentStatus }: StatusTimelineProps) => {
  const historyMap = Object.fromEntries(history.map((item) => [item.status, item]));

  return (
    <div className="status-timeline">
      {STATUS_ORDER.map((status, index) => {
        const entry = historyMap[status];
        const isCompleted = Boolean(entry);
        const isActive = currentStatus === status;

        return (
          <div key={status} className="timeline-item">
            <div
              className={`timeline-marker ${isCompleted ? 'completed' : ''} ${
                isActive ? 'active' : ''
              }`}
            >
              {index + 1}
            </div>
            <div className="timeline-content">
              <span className="timeline-status">{status.replace('_', ' ')}</span>
              {entry ? (
                <>
                  <span className="timeline-date">
                    {parseDate(entry.timestamp)?.toLocaleString() ?? 'Fecha no disponible'}
                  </span>
                  {entry.note && <p className="timeline-note">{entry.note}</p>}
                </>
              ) : (
                <span className="timeline-date pending">Pendiente</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusTimeline;

