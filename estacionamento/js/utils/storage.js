// utils/storage.js
export const storage = {
    get: key => JSON.parse(localStorage.getItem(key)) || [],
    set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
    add: (key, item) => {
      const items = storage.get(key);
      items.push(item);
      storage.set(key, items);
    },
    remove: (key, id) => {
      const items = storage.get(key).filter(item => item.id !== id);
      storage.set(key, items);
    },
    update: (key, updatedItem) => {
      const items = storage.get(key).map(item => item.id === updatedItem.id ? updatedItem : item);
      storage.set(key, items);
    }
  };