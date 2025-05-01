import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import type { SliderItem } from "@/app/constans"; // type olarak import

export async function getSlider(): Promise<SliderItem[]> {
  try {
    const records = await directus.request(readItems("slider"));

    const sliderItems: SliderItem[] = (records as any[]).map((record) => ({
      id: record.id,
      title: record.title,
      image: record.image,
    }));

    return sliderItems;
  } catch (error) {
    console.error("Slider verileri alınırken hata oluştu:", error);
    return [];
  }
}
