import { formatDistanceToNow, format } from 'date-fns';

export const dateToText = ( date ) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export const formatDate = ( date ) => {
    return format(date, 'dd-MM-yyyy HH:mm');
}
