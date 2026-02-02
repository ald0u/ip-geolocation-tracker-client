export const formatDAte = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export const formatThreatLevel = (level: string): { text: string; color: string } => {
  const levels: Record<string, { text: string; color: string }> = {
    low: { text: 'Bajo', color: 'text-green-600 bg-green-100' },
    medium: { text: 'Medio', color: 'text-yellow-600 bg-yellow-100' },
    high: { text: 'Alto', color: 'text-orange-600 bg-orange-100' },
    critical: { text: 'Crítico', color: 'text-red-600 bg-red-100' },
    Unknown: { text: 'Desconocido', color: 'text-gray-600 bg-gray-100' },
  }
  return levels[level] || levels.Unknown;
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}