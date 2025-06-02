export const storage = {
    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    load(key) {
        return JSON.parse(localStorage.getItem(key));
    },

    exists(key) {
        return localStorage.getItem(key) !== null;
    }
}