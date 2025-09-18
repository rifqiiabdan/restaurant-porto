import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Clock, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang Warung Nusantara</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Warung Nusantara adalah rumah makan yang menghadirkan cita rasa autentik 
            masakan tradisional Indonesia dengan sentuhan modern dan pelayanan terbaik.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Cerita Kami</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Didirikan pada tahun 2015, Warung Nusantara lahir dari kecintaan mendalam 
                terhadap kekayaan kuliner Indonesia. Kami memulai perjalanan dengan visi 
                sederhana: menghadirkan makanan tradisional Indonesia yang autentik dan berkualitas.
              </p>
              <p>
                Dengan resep turun-temurun dan bahan-bahan pilihan, setiap hidangan di 
                Warung Nusantara diolah dengan penuh cinta dan dedikasi untuk memberikan 
                pengalaman kuliner yang tak terlupakan.
              </p>
              <p>
                Hingga kini, kami telah melayani ribuan pelanggan dengan bangga, 
                menjadi bagian dari momen spesial keluarga Indonesia.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="text-center border-0 bg-restaurant-cream shadow-lg">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Kualitas Terjamin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sertifikat halal dan standar kebersihan tinggi
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-restaurant-cream shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">10,000+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pelanggan puas setiap tahunnya
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-restaurant-cream shadow-lg">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">8+ Tahun</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pengalaman melayani kuliner Indonesia
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-restaurant-cream shadow-lg">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Resep Turun Temurun</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cita rasa autentik dari nenek moyang
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Visi & Misi Kami</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h4 className="text-xl font-semibold mb-3 text-primary">Visi</h4>
              <p className="text-muted-foreground">
                Menjadi warung makan terdepan yang melestarikan dan memperkenalkan 
                kekayaan kuliner tradisional Indonesia kepada generasi masa kini 
                dan mendatang.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3 text-primary">Misi</h4>
              <p className="text-muted-foreground">
                Menyajikan makanan tradisional Indonesia berkualitas tinggi dengan 
                pelayanan terbaik, menciptakan pengalaman kuliner yang berkesan, 
                dan berkontribusi dalam melestarikan budaya kuliner Nusantara.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;