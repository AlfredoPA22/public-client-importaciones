import type { ImportStatus, StatusHistoryEntry } from '../types';
import './StatusTimeline.css';
import { parseDate } from '../utils/date';

interface StatusTimelineProps {
  history: StatusHistoryEntry[];
  currentStatus: ImportStatus;
}

const StatusTimeline = ({ history, currentStatus }: StatusTimelineProps) => {
  const sortedHistory = [...history]
    .map((entry, index) => {
      const parsedDate = parseDate(entry.timestamp ?? entry.changed_at);
      return {
        ...entry,
        order: index,
        parsedDate,
        note: entry.note ?? entry.notes,
      };
    })
    .filter((entry) => entry.status)
    .sort((a, b) => {
      if (a.parsedDate && b.parsedDate) {
        return a.parsedDate.getTime() - b.parsedDate.getTime();
      }
      if (a.parsedDate) return -1;
      if (b.parsedDate) return 1;
      return a.order - b.order;
    });

  return (
    <div className="status-timeline">
      {sortedHistory.map((entry, index) => (
        <div className="timeline-item" key={`${entry.status}-${entry.parsedDate ?? index}`}>
          <div
            className={`timeline-marker ${
              entry.status === currentStatus ? 'timeline-marker-current' : ''
            }`}
          >
            {index + 1}
          </div>
          <div className="timeline-content">
            <span className="timeline-status">{entry.status.replace('_', ' ')}</span>
            <span className="timeline-date">
              {entry.parsedDate?.toLocaleString() ?? 'Fecha no disponible'}
            </span>
            {entry.note && <p className="timeline-note">{entry.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusTimeline;

