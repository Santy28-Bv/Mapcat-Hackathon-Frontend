import { useEffect, useState } from "react"
import ProductCard from "./components/ProductCard"
import { getProducts } from "./services/db"

export default function StorePage() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    async function load() {
      const data = await getProducts()
      setProducts(data)
    }
    load()
  }, [])

  return (
    <div className="store-grid">
      {products.map(prod => (
        <ProductCard 
          key={prod.id} 
          product={prod}
          onProductClick={(p) => console.log("Clicked:", p)}
        />
      ))}
    </div>
  )
}
