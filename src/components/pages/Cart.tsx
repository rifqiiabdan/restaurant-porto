import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Trash } from "lucide-react";
import { useState } from "react";

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal, checkout } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  if (!user) return <Navigate to="/login" replace />;

  const handleCheckout = () => {
    setError("");
    if (!address || !phone) {
      setError("Alamat dan nomor HP wajib diisi");
      return;
    }
    const order = checkout({ address, phone });
    if (order) {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Keranjang</h1>

        {items.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Keranjang Anda kosong.
              <div className="mt-4">
                <Button onClick={() => navigate('/menu')}>Lihat Menu</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Rp {item.price.toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                        className="w-20"
                      />
                      <Button variant="destructive" size="icon" onClick={() => removeItem(item.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat</Label>
                    <Input id="address" placeholder="Masukkan alamat lengkap" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor HP</Label>
                    <Input id="phone" placeholder="08xxxxxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>

                  {error && <div className="text-sm text-red-600">{error}</div>}

                  <Button className="w-full" onClick={handleCheckout}>Pesan Sekarang</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
