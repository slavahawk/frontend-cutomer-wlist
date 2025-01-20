import { openDB } from "idb";
import type { Wine } from "w-list-api";

const dbPromise = openDB("wine-database", 1, {
  upgrade(db) {
    db.createObjectStore("wines", {
      keyPath: "id",
    });
  },
});

/**
 * Добавляет вина в IndexedDB
 * @param wines - массив объектов вина, соответствующих интерфейсу Wine
 */
export const addWinesToDb = async (wines: Wine[]) => {
  console.log("Adding wines to DB:", wines);

  // Проверка наличия id для каждого элемента
  for (const wine of wines) {
    if (wine.id === undefined || wine.id === null) {
      console.error("Wine does not have a valid 'id':", wine);
      throw new Error("Wine must have a valid 'id'");
    }
  }

  const db = await dbPromise;

  console.log(db);
  // Добавление каждого элемента в БД
  for (const wine of wines) {
    await db.put("wines", wine);
  }
};

/**
 * Получает все вина из IndexedDB
 * @returns массив объектов вина
 */
export const getWinesFromDb = async (): Promise<Wine[]> => {
  const db = await dbPromise;
  return db.getAll("wines");
};

/**
 * Получает вино по его ID из IndexedDB
 * @param id - ID вина
 * @returns объект вина или undefined, если не найдено
 */
export const getWineFromDbById = async (
  id: number,
): Promise<Wine | undefined> => {
  const db = await dbPromise;
  return db.get("wines", id);
};

/**
 * Удаляет вино из IndexedDB по его ID
 * @param id - ID вина
 */
export const deleteWineFromDb = async (id: number) => {
  const db = await dbPromise;
  await db.delete("wines", id);
};

/**
 * Удаляет все вина из IndexedDB
 */
export const deleteAllWinesFromDb = async () => {
  const db = await dbPromise;
  const transaction = db.transaction("wines", "readwrite");
  const store = transaction.objectStore("wines");
  const allWines = await store.getAll();

  for (const wine of allWines) {
    await store.delete(wine.id);
  }

  await transaction.done;
};

/**
 * Удаляет базу данных
 */
export const deleteDatabase = async () => {
  await openDB("my-database", 1, {
    upgrade(db) {
      db.deleteObjectStore("wines");
    },
  });
  console.log("Database deleted");
};

/**
 * Получает размер базы данных в байтах
 * @returns размер базы данных в байтах
 */
export const getDatabaseSize = async (): Promise<number> => {
  const db = await dbPromise;
  const allWines = await db.getAll("wines");

  let totalSize = 0;

  for (const wine of allWines) {
    // Сериализация объекта в JSON и получение размера
    const jsonString = JSON.stringify(wine);
    totalSize += new Blob([jsonString]).size; // Используем Blob для получения размера
  }

  return totalSize;
};
