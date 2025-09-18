import React from "react";
import Link from "next/link";
import { createPageUrl } from "@/utils";
import { Heart, Target, TrendingUp, Calculator, Book, Home, LogOut, UserCircle } from "lucide-react";
import { User } from "@/entities/all";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "Meu Perfil",
    url: createPageUrl("Profile"),
    icon: UserCircle,
  },
  {
    title: "Minhas Metas",
    url: createPageUrl("Goals"),
    icon: Target,
  },
  {
    title: "Histórico",
    url: createPageUrl("History"),
    icon: TrendingUp,
  },
  {
    title: "Calculadora IMC",
    url: createPageUrl("BMI"),
    icon: Calculator,
  },
  {
    title: "Tabela Nutricional",
    url: createPageUrl("Nutrition"),
    icon: Book,
  },
];

export default function Layout({ children, currentPageName }) {
  const handleLogout = async () => {
    try {
      await User.logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Fallback: redirect anyway
      window.location.href = '/login';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-green-50 to-blue-50">
        <Sidebar className="border-r border-green-100">
          <SidebarHeader className="border-b border-green-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">HEALTH</h2>
                <p className="text-xs text-green-600 font-medium">Sua jornada de saúde</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                Navegação
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className="hover:bg-green-50 hover:text-green-700 transition-all duration-300 rounded-xl mb-1"
                      >
                        <Link href={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-green-100 p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                <span className="text-green-800 font-semibold text-sm">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">Usuário</p>
                <p className="text-xs text-gray-500 truncate">Mantenha-se saudável</p>
              </div>
            </div>
            
            <Button 
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              Sair da conta
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-green-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-gray-900">HEALTH</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}