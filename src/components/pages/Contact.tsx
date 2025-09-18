import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl text-muted-foreground">
            Ada pertanyaan? Kami siap membantu Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center border-0 bg-restaurant-cream shadow-lg">
            <CardHeader>
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Alamat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Jl. Raya Nusantara No. 123<br />
                Jakarta Selatan 12345
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 bg-restaurant-cream shadow-lg">
            <CardHeader>
              <Phone className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Telepon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                (021) 123-4567<br />
                0812-3456-7890
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 bg-restaurant-cream shadow-lg">
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Jam Buka</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Senin - Minggu<br />
                08:00 - 22:00 WIB
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 bg-restaurant-cream shadow-lg">
            <CardHeader>
              <Mail className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                info@warung-nusantara.com<br />
                order@warung-nusantara.com
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 bg-restaurant-cream shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Lokasi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Google Maps akan ditampilkan di sini</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;