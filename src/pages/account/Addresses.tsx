import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit, Trash2, MapPin, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useCustomerStore } from "@/store/customer.store";
import { Address, AddressLabel } from "@/types/account";
import { formatCEP, isValidCEP } from "@/lib/validators";
import { toast } from "@/hooks/use-toast";
import { useCheckoutDraft } from "@/hooks/use-checkout-draft";

const Addresses = () => {
  const navigate = useNavigate();
  const { addresses, addAddress, updateAddress, removeAddress, setDefaultAddress } = useCustomerStore();
  const { updateDraft } = useCheckoutDraft();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleUseInCheckout = (address: Address) => {
    updateDraft({
      delivery: {
        cep: address.cep,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        shippingMethodId: "STANDARD",
      },
    });
    navigate("/checkout");
    toast({
      title: "Endereço selecionado",
      description: "O endereço foi pré-preenchido no checkout.",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover este endereço?")) {
      removeAddress(id);
      toast({
        title: "Endereço removido",
        description: "O endereço foi removido com sucesso.",
      });
    }
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

          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-4xl font-bold text-foreground">
              Meus Endereços
            </h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="gold" onClick={() => setEditingAddress(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Endereço
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl font-bold text-foreground">
                    {editingAddress ? "Editar Endereço" : "Novo Endereço"}
                  </DialogTitle>
                </DialogHeader>
                <AddressForm
                  address={editingAddress}
                  onSave={(address) => {
                    if (editingAddress) {
                      updateAddress(editingAddress.id, address);
                      toast({
                        title: "Endereço atualizado",
                        description: "O endereço foi atualizado com sucesso.",
                      });
                    } else {
                      addAddress(address);
                      toast({
                        title: "Endereço adicionado",
                        description: "O endereço foi adicionado com sucesso.",
                      });
                    }
                    setIsDialogOpen(false);
                    setEditingAddress(null);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Addresses List */}
          {addresses.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-card border border-border flex items-center justify-center">
                <MapPin className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Nenhum endereço cadastrado
              </h2>
              <p className="text-muted-foreground font-body mb-8">
                Adicione um endereço para facilitar suas compras
              </p>
              <Button variant="gold" onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeiro Endereço
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="bg-card rounded-lg border border-border p-6 relative"
                >
                  {address.isDefault && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground font-body">
                        Padrão
                      </Badge>
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {address.label}
                    </h3>
                    <div className="space-y-1 text-sm text-foreground font-body">
                      <p>
                        {address.addressLine1}
                        {address.addressLine2 && ` - ${address.addressLine2}`}
                      </p>
                      <p>
                        {address.neighborhood}, {address.city} - {address.state}
                      </p>
                      <p>CEP: {address.cep}</p>
                      {address.reference && (
                        <p className="text-muted-foreground">
                          Referência: {address.reference}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {!address.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDefaultAddress(address.id)}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Tornar padrão
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingAddress(address);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(address.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remover
                    </Button>
                    <Button
                      variant="gold"
                      size="sm"
                      onClick={() => handleUseInCheckout(address)}
                    >
                      Usar no checkout
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface AddressFormProps {
  address?: Address | null;
  onSave: (address: Omit<Address, "id" | "isDefault">) => void;
}

const AddressForm = ({ address, onSave }: AddressFormProps) => {
  const [formData, setFormData] = useState({
    label: (address?.label || "Casa") as AddressLabel,
    cep: address?.cep || "",
    addressLine1: address?.addressLine1 || "",
    addressLine2: address?.addressLine2 || "",
    neighborhood: address?.neighborhood || "",
    city: address?.city || "",
    state: address?.state || "",
    reference: address?.reference || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidCEP(formData.cep)) {
      toast({
        title: "CEP inválido",
        description: "Digite um CEP válido.",
        variant: "destructive",
      });
      return;
    }

    onSave({
      label: formData.label,
      cep: formData.cep,
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2 || undefined,
      neighborhood: formData.neighborhood,
      city: formData.city,
      state: formData.state,
      reference: formData.reference || undefined,
      isDefault: address?.isDefault || false,
    });
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value);
    setFormData({ ...formData, cep: formatted });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="label" className="text-foreground font-body">
          Tipo de Endereço *
        </Label>
        <Select
          value={formData.label}
          onValueChange={(value) =>
            setFormData({ ...formData, label: value as AddressLabel })
          }
        >
          <SelectTrigger className="mt-2 bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="Casa">Casa</SelectItem>
            <SelectItem value="Trabalho">Trabalho</SelectItem>
            <SelectItem value="Outro">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="cep" className="text-foreground font-body">
          CEP *
        </Label>
        <Input
          id="cep"
          type="tel"
          value={formData.cep}
          onChange={handleCEPChange}
          className="mt-2 bg-secondary border-border"
          placeholder="00000-000"
          maxLength={9}
          required
        />
      </div>

      <div>
        <Label htmlFor="addressLine1" className="text-foreground font-body">
          Endereço (Rua, Número) *
        </Label>
        <Input
          id="addressLine1"
          value={formData.addressLine1}
          onChange={(e) =>
            setFormData({ ...formData, addressLine1: e.target.value })
          }
          className="mt-2 bg-secondary border-border"
          placeholder="Rua, Avenida, Número"
          required
        />
      </div>

      <div>
        <Label htmlFor="addressLine2" className="text-foreground font-body">
          Complemento
        </Label>
        <Input
          id="addressLine2"
          value={formData.addressLine2}
          onChange={(e) =>
            setFormData({ ...formData, addressLine2: e.target.value })
          }
          className="mt-2 bg-secondary border-border"
          placeholder="Apto, Bloco, etc."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="neighborhood" className="text-foreground font-body">
            Bairro *
          </Label>
          <Input
            id="neighborhood"
            value={formData.neighborhood}
            onChange={(e) =>
              setFormData({ ...formData, neighborhood: e.target.value })
            }
            className="mt-2 bg-secondary border-border"
            required
          />
        </div>

        <div>
          <Label htmlFor="city" className="text-foreground font-body">
            Cidade *
          </Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
            className="mt-2 bg-secondary border-border"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="state" className="text-foreground font-body">
          Estado (UF) *
        </Label>
        <Input
          id="state"
          value={formData.state}
          onChange={(e) =>
            setFormData({ ...formData, state: e.target.value.toUpperCase() })
          }
          className="mt-2 bg-secondary border-border uppercase"
          placeholder="SP"
          maxLength={2}
          required
        />
      </div>

      <div>
        <Label htmlFor="reference" className="text-foreground font-body">
          Referência
        </Label>
        <Input
          id="reference"
          value={formData.reference}
          onChange={(e) =>
            setFormData({ ...formData, reference: e.target.value })
          }
          className="mt-2 bg-secondary border-border"
          placeholder="Ponto de referência"
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="submit" variant="gold">
          {address ? "Salvar Alterações" : "Adicionar Endereço"}
        </Button>
      </div>
    </form>
  );
};

export default Addresses;
