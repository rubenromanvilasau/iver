import { formatDistanceToNow } from 'date-fns';

export const dateToText = ( date ) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
}
