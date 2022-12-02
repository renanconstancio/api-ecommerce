import { format } from 'date-fns';

export function dateString(s: Date): string {
  return format(s, 'yyyy-MM-dd HH:ii:ss');
}
