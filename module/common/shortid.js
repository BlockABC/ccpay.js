let uuid = 1;
export function shortid(prefix = '') {
    return `${prefix}_${++uuid}`;
}
