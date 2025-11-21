const isDate = (value: unknown): value is Date => value instanceof Date;

const buildDate = (year: number, month: number, day: number) => {
  const result = new Date(year, month - 1, day);
  return Number.isNaN(result.getTime()) ? null : result;
};

const normalizeMicroseconds = (raw: string) => {
  const match = raw.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})\.(\d+)(Z|[+-]\d{2}:\d{2})?$/);

  if (!match) {
    return null;
  }

  const [, base, fraction, zone = 'Z'] = match;
  const millis = fraction.slice(0, 3).padEnd(3, '0');
  return `${base}.${millis}${zone}`;
};

const tryParseCustomFormats = (raw: string) => {
  const trimmed = raw.trim();
  const isoLike = /^\d{4}[-/]\d{2}[-/]\d{2}$/;
  const latam = /^\d{2}[-/]\d{2}[-/]\d{4}$/;

  if (isoLike.test(trimmed)) {
    const [year, month, day] = trimmed.split(/[-/]/).map(Number);
    return buildDate(year, month, day);
  }

  if (latam.test(trimmed)) {
    const [day, month, year] = trimmed.split(/[-/]/).map(Number);
    return buildDate(year, month, day);
  }

  const microSecondsIso = normalizeMicroseconds(trimmed);
  if (microSecondsIso) {
    const parsed = new Date(microSecondsIso);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
};

export const parseDate = (value: unknown): Date | null => {
  if (!value && value !== 0) return null;

  if (isDate(value)) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === 'number') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;

    const direct = new Date(trimmed);
    if (!Number.isNaN(direct.getTime())) {
      return direct;
    }

    return tryParseCustomFormats(trimmed);
  }

  return null;
};

