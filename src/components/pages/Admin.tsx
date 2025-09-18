import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Clock, CheckCircle, XCircle, Package } from "lucide-react";

const ORDERS_KEY = "orders";

type Order = {
  id: string;
  userEmail: string;
  items: { id: number; name: string; price: number; quantity: number }[];
  total: number;
  address: string;
  phone: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

const Admin = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]") as Order[];
      setOrders(data);
    } catch {}
  }, []);

  const writeOrders = (next: Order[]) => {
    setOrders(next);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
  };

  const updateStatus = (id: string, status: Order["status"]) => {
    const next = orders.map((o) => (o.id === id ? { ...o, status } : o));
    writeOrders(next);
  };

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const acceptedOrders = orders.filter((o) => o.status === "accepted");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Admin</h1>
          <p className="text-muted-foreground">Kelola pesanan pelanggan</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingOrders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Diterima</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{acceptedOrders.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pesanan #{order.id} - {order.userEmail}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{new Date(order.createdAt).toLocaleString("id-ID")}</Badge>
                    {order.status === "pending" && (
                      <Badge className="bg-yellow-100 text-yellow-800">Menunggu</Badge>
                    )}
                    {order.status === "accepted" && (
                      <Badge className="bg-green-100 text-green-800">Diterima</Badge>
                    )}
                    {order.status === "rejected" && (
                      <Badge variant="destructive">Ditolak</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  {order.items.map((it) => (
                    <div key={it.id} className="flex justify-between text-sm">
                      <span>{it.name} x{it.quantity}</span>
                      <span>Rp {(it.price * it.quantity).toLocaleString("id-ID")}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total</span>
                  <span>Rp {order.total.toLocaleString("id-ID")}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Alamat: {order.address} | HP: {order.phone}
                </div>
                {order.status === "pending" && (
                  <div className="flex gap-2 pt-2">
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => updateStatus(order.id, "accepted")}>
                      <CheckCircle className="h-4 w-4 mr-2" /> Terima
                    </Button>
                    <Button variant="destructive" onClick={() => updateStatus(order.id, "rejected")}>
                      <XCircle className="h-4 w-4 mr-2" /> Tolak
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {orders.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                Belum ada pesanan masuk.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;