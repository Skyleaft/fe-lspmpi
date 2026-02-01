/**
 * Utility functions for text manipulation
 */

/**
 * Truncate content to a specified maximum length and append ellipsis if needed
 */
export function truncateContent(content: string, maxLength: number = 150): string {
    // Strip HTML tags for length calculation
    const textOnly = content.replace(/<[^>]*>/g, '');
    if (textOnly.length <= maxLength) return content;
    
    // Truncate text and add ellipsis
    const truncated = textOnly.substring(0, maxLength) + '...';
    return truncated;
}

/**
 * Format a date string to Indonesian locale format
 */
export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
