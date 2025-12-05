import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const CATEGORY_EMOJI = {
  accesorios: "🎧",
  "hogar-linea": "🏠",
  software: "💻",
  leasing: "📦"
};

export async function getAllProducts() {
  try {
    const snapshot = await getDocs(collection(db, "products"));

    return snapshot.docs.map(doc => {
      const d = doc.data();

      return {
        id: doc.id,
        name: d.name ?? "Sin nombre",
        price: d.price ?? 0,
        stock: d.stock ?? 0,

        // ProductCard usa product.category
        // Usaremos subcategory si existe
        category: d.subcategory ?? "general",

        // Tu ProductCard imprime directamente la descripción
        description:
          d.description ??
          (d.supplier ? `Proveedor: ${d.supplier}` : "Sin descripción"),

        // Emoji según categoría (o uno por defecto)
        emoji: CATEGORY_EMOJI[d.subcategory] ?? "📦",

        // Adaptación para arrendamiento
        rental: d.rental_enabled ?? false,
        rentalPrice: d.rental_monthly_price ?? null,
        minMonths: d.rental_min_months ?? null
      };
    });
  } catch (err) {
    console.error("Error cargando productos:", err);
    return [];
  }
}
