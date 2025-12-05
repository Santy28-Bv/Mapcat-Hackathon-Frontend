import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/config"

export async function getProducts() {
  const snapshot = await getDocs(collection(db, "products"))

  return snapshot.docs.map(doc => {
    const data = doc.data()

    return {
      id: doc.id,
      name: data.name,
      price: data.price,
      stock: data.stock,
      category: data.subcategory ?? "general",
      description: data.supplier ? `Proveedor: ${data.supplier}` : "",
      
      // Adaptación del formato
      emoji: "📦",  
      rental: data.rental_enabled,
      rentalPrice: data.rental_monthly_price,
      minMonths: data.rental_min_months
    }
  })
}
