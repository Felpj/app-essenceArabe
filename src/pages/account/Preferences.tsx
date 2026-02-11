import { Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCustomerStore } from "@/store/customer.store";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const categoryOptions = [
  "Doce",
  "Amadeirado",
  "Fresco",
  "Árabe intenso",
  "Floral",
  "Citrico",
  "Oriental",
];

const Preferences = () => {
  const { preferences, updatePreferences } = useCustomerStore();
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    updatePreferences(localPreferences);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Preferências salvas!",
        description: "Suas preferências foram atualizadas com sucesso.",
      });
    }, 500);
  };

  const toggleCategory = (category: string) => {
    setLocalPreferences((prev) => {
      const categories = prev.favoriteCategories.includes(category)
        ? prev.favoriteCategories.filter((c) => c !== category)
        : [...prev.favoriteCategories, category];
      return { ...prev, favoriteCategories: categories };
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <Link
            to="/conta"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para conta
          </Link>

          <h1 className="font-display text-4xl font-bold text-foreground mb-8">
            Preferências
          </h1>

          <div className="bg-card rounded-lg border border-border p-6 md:p-8 space-y-8">
            {/* Notifications */}
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Notificações
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label
                      htmlFor="whatsapp-updates"
                      className="text-foreground font-body font-semibold cursor-pointer"
                    >
                      Receber novidades no WhatsApp
                    </Label>
                    <p className="text-sm text-muted-foreground font-body mt-1">
                      Receba ofertas exclusivas e atualizações de pedidos
                    </p>
                  </div>
                  <Switch
                    id="whatsapp-updates"
                    checked={localPreferences.receiveWhatsAppUpdates}
                    onCheckedChange={(checked) =>
                      setLocalPreferences((prev) => ({
                        ...prev,
                        receiveWhatsAppUpdates: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label
                      htmlFor="email-updates"
                      className="text-foreground font-body font-semibold cursor-pointer"
                    >
                      Receber novidades por Email
                    </Label>
                    <p className="text-sm text-muted-foreground font-body mt-1">
                      Receba newsletters e promoções por email
                    </p>
                  </div>
                  <Switch
                    id="email-updates"
                    checked={localPreferences.receiveEmailUpdates}
                    onCheckedChange={(checked) =>
                      setLocalPreferences((prev) => ({
                        ...prev,
                        receiveEmailUpdates: checked,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Favorite Categories */}
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Categorias Favoritas
              </h2>
              <p className="text-sm text-muted-foreground font-body mb-4">
                Selecione suas categorias preferidas para receber recomendações
                personalizadas
              </p>
              <div className="flex flex-wrap gap-3">
                {categoryOptions.map((category) => {
                  const isSelected =
                    localPreferences.favoriteCategories.includes(category);
                  return (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-body font-semibold transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-border">
              <Button
                variant="gold"
                size="lg"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Salvando..." : "Salvar Preferências"}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Preferences;
