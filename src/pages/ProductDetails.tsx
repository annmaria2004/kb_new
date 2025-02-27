import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateProductDetails } from "../utils/gemini";

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price?: string;
}

const sampleProducts: Product[] = [
  { id: 1, name: "Moovandan", image: "https://www.fortheloveofnature.in/cdn/shop/products/Mangiferaindica-Moovandan_Mango_1_823x.jpg?v=1640246605", description: "A Popular Early-Bearing Variety" },
  { id: 2, name: "Kilichundan Mango", image: "https://www.greensofkerala.com/wp-content/uploads/2021/04/kilichundan-manga-2.gif", description: "The Parrot-Beak Mango with a Tangy-Sweet Flavor" },
  { id: 3, name: "Neelum", image: "https://tropicaltreeguide.com/wp-content/uploads/2023/04/Mango_Neelum_Fruit_IG_Botanical_Diversity_3-1024x1014.jpg", description: "A High-Yielding and Disease-Resistant Variety of Mango" }









  
];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = sampleProducts.find((p) => p.id === Number(id));

  const [aiDescription, setAiDescription] = useState<string>("Loading AI-generated details...");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setLoading(true);
      setError(null);
      generateProductDetails(product.name)
        .then((details) => setAiDescription(details))
        .catch((err) => {
          console.error("Error fetching AI details:", err);
          setError("Failed to load AI-generated details.");
        })
        .finally(() => setLoading(false));
    }
  }, [product]);

  if (!product) {
    return <h2 className="text-center text-red-500">Product not found.</h2>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-md" />
      <h2 className="text-3xl font-bold text-gray-800 mt-4">{product.name}</h2>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-green-700 font-bold mt-4">{product.price || "Price not available"}</p>
      <h3 className="text-xl font-semibold mt-6">AI-Generated Details</h3>
      {loading ? (
        <p className="text-gray-500">Fetching details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-gray-700 mt-2">{aiDescription}</p>
      )}
    </div>
  );
};

export default ProductDetails;
