import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, ChefHat, Menu, LogOut, UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  cartItems?: number;
  onCartClick?: () => void;
}

export const Header = ({ cartItems = 0, onCartClick }: HeaderProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      // Default behavior - navigate to menu page
      navigate('/menu');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <ChefHat className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Warung Nusantara
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Beranda
          </Link>
          <Link 
            to="/menu" 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Menu
          </Link>
          <Link 
            to="/about" 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Tentang
          </Link>
          <Link 
            to="/contact" 
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Kontak
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="relative"
            onClick={handleCartClick}
          >
            <ShoppingCart className="h-4 w-4" />
            {cartItems > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {cartItems}
              </Badge>
            )}
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <UserCircle className="h-4 w-4 mr-2" />
                  {user.name || user.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="h-4 w-4 mr-2" />
                  Profil
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <ChefHat className="h-4 w-4 mr-2" />
                    Dashboard Admin
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Masuk
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="sm">
                  Daftar
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                to="/menu" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tentang
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kontak
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};