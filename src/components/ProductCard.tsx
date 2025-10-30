import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { addToCart } from "@/lib/cart";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category: string;
}

const ProductCard = ({ id, name, description, price, image_url, category }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, image_url });
    toast.success(`${name} adăugat în coș!`);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <Link to={`/product/${id}`}>
      <Card className="card-elegant h-full overflow-hidden group cursor-pointer">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={image_url || "/placeholder.svg"}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
            {category}
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {description}
          </p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-primary">{price} RON</span>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button 
            onClick={handleAddToCart} 
            className="w-full btn-gold"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Adaugă în coș
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
