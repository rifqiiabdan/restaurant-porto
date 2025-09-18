import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Phone, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-restaurant.jpg";

const Index = () => {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate('/menu');
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-800 to-yellow-700">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full"></div>
            <div className="absolute top-20 right-20 w-3 h-3 bg-white rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-3 h-3 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white rounded-full"></div>
          </div>
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          {/* Decorative spice icons */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-4 opacity-60">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-orange-800 text-lg">🌶️</span>
              </div>
              <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                <span className="text-red-800 text-lg">🍛</span>
              </div>
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-orange-800 text-lg">🥘</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Cita Rasa
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Nusantara
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Nikmati kelezatan masakan tradisional Indonesia dengan layanan antar yang cepat
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg"
              onClick={handleViewMenu}
            >
              Lihat Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-lg border-0 bg-gradient-to-br from-orange-50 to-yellow-50 hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Buka Setiap Hari</h3>
                <p className="text-gray-600">08:00 - 22:00 WIB</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-lg border-0 bg-gradient-to-br from-red-50 to-orange-50 hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <MapPin className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Antar Gratis</h3>
                <p className="text-gray-600">Radius 5km dari toko</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Kualitas Terjamin</h3>
                <p className="text-gray-600">Bahan segar setiap hari</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;