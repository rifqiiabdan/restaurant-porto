import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const menuItems = [
  {
    id: 1,
    name: "Nasi Gudeg Yogya",
    description: "Nasi gudeg dengan ayam kampung, telur, dan kerupuk",
    price: 25000,
    image: "🍛",
    category: "Makanan Utama"
  },
  {
    id: 2,
    name: "Gado-Gado Jakarta",
    description: "Sayuran segar dengan bumbu kacang khas Jakarta",
    price: 18000,
    image: "🥗",
    category: "Makanan Utama"
  },
  {
    id: 3,
    name: "Sate Ayam Madura",
    description: "Sate ayam bakar dengan bumbu kacang khas Madura",
    price: 22000,
    image: "🍢",
    category: "Makanan Utama"
  },
  {
    id: 4,
    name: "Rendang Padang",
    description: "Rendang daging sapi empuk dengan bumbu rempah Padang",
    price: 35000,
    image: "🍖",
    category: "Makanan Utama"
  },
  {
    id: 5,
    name: "Es Cendol",
    description: "Minuman segar cendol dengan santan dan gula merah",
    price: 12000,
    image: "🧊",
    category: "Minuman"
  },
  {
    id: 6,
    name: "Es Teh Manis",
    description: "Teh manis dingin segar",
    price: 8000,
    image: "🧋",
    category: "Minuman"
  }
];

const Menu = () => {
  const categories = [...new Set(menuItems.map(item => item.category))];
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const openDialog = (id: number) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setSelectedId(id);
    setQuantity(1);
  };

  const confirmAdd = () => {
    const item = menuItems.find((m) => m.id === selectedId);
    if (item) {
      addItem({ id: item.id, name: item.name, price: item.price }, quantity);
    }
    setSelectedId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Menu Warung Nusantara</h1>
          <p className="text-xl text-muted-foreground">
            Nikmati kelezatan masakan tradisional Indonesia
          </p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/cart')}>
            <ShoppingCart className="h-4 w-4 mr-2" /> Lihat Keranjang
          </Button>
        </div>

        {categories.map(category => (
          <div key={category} className="mb-12">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">{category}</h2>
              <div className="ml-4 h-px bg-gradient-to-r from-primary to-accent flex-1"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems
                .filter(item => item.category === category)
                .map(item => (
                  <Card key={item.id} className="border-0 bg-restaurant-cream shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="text-center pb-4">
                      <div className="text-6xl mb-4">{item.image}</div>
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <Badge variant="secondary" className="w-fit mx-auto">
                        Rp {item.price.toLocaleString('id-ID')}
                      </Badge>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      <Button className="w-full" onClick={() => openDialog(item.id)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah ke Keranjang
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={selectedId !== null} onOpenChange={(o) => !o && setSelectedId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pilih Jumlah</DialogTitle>
            <DialogDescription>Atur jumlah pesanan sebelum masuk ke keranjang.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center space-x-4 py-4">
            <Button variant="outline" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              <Minus className="h-4 w-4" />
            </Button>
            <div className="text-2xl font-bold min-w-[3rem] text-center">{quantity}</div>
            <Button variant="outline" onClick={() => setQuantity((q) => q + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={confirmAdd}>
              Tambah ke Keranjang
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Menu;