import {api} from "@/api/api.ts";
import type {Wine} from "@/types/wine.ts";

export class WineService {
  static async getAllWines(): Promise<Wine[]> {
    try {
      const { data } = await api.get("/wines/all");
      return data;
    } catch (error) {
      console.error("Ошибка получения вин", error);
      throw new Error("Ошибка получения вин");
    }
  }
}
