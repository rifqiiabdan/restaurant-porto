import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { User, Edit, Save, X, Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const ORDERS_KEY = 'orders';

type Order = {
  id: string;
  userEmail: string;
  items: { id: number; name: string; price: number; quantity: number }[];
  total: number;
  address: string;
  phone: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
};

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '081234567890',
    address: 'Jl. Merdeka No. 123, Jakarta'
  });
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) return;
    try {
      const data = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]') as Order[];
      setOrders(data.filter(o => o.userEmail === user.email));
    } catch {}
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '081234567890',
      address: 'Jl. Merdeka No. 123, Jakarta'
    });
    setIsEditing(false);
  };

  const latest = orders[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Profil Saya</h1>
            <p className="text-gray-600">Kelola informasi akun Anda</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informasi Pribadi
                </CardTitle>
                {!isEditing ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCancel}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Batal
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleSave}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Simpan
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.phone}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-700">{profileData.address}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Status Pesanan Terakhir</CardTitle>
            </CardHeader>
            <CardContent>
              {!latest ? (
                <div className="text-center text-muted-foreground">
                  Belum ada pesanan.
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {latest.status === 'pending' && <Clock className="h-4 w-4 text-yellow-600" />}
                    {latest.status === 'accepted' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {latest.status === 'rejected' && <XCircle className="h-4 w-4 text-red-600" />}
                    <span className="font-medium capitalize">{latest.status}</span>
                    <span className="text-sm text-muted-foreground">{new Date(latest.createdAt).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Total: Rp {latest.total.toLocaleString('id-ID')}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
