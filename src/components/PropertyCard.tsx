import { Link } from "react-router-dom";
import { MapPin, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  type: string;
  image: string;
  featured?: boolean;
}

export const PropertyCard = ({
  id,
  title,
  location,
  type,
  image,
  featured,
}: PropertyCardProps) => {
  return (
    <Card className="group overflow-hidden border-border hover:shadow-[var(--shadow-gold)] transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {featured && (
          <div className="absolute top-4 right-4 bg-secondary text-primary px-3 py-1 rounded-full text-xs font-semibold">
            Destaque
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="p-6">
        <div className="mb-2">
          <span className="inline-block text-xs font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">
            {type}
          </span>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 text-secondary" />
          <span>{location}</span>
        </div>

        <Button variant="hero" className="w-full group" asChild>
          <Link to={`/empreendimento/${id}`}>
            <span>Ver Detalhes</span>
            <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
