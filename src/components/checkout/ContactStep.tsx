import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPhone, isValidEmail, isValidPhone } from "@/lib/validators";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().refine(isValidEmail, "Email inválido"),
  phone: z.string().refine(isValidPhone, "Telefone inválido"),
  wantsWhatsAppUpdates: z.boolean().default(false),
});

export type ContactFormData = z.infer<typeof contactSchema>;

interface ContactStepProps {
  data?: ContactFormData;
  onSubmit: (data: ContactFormData) => void;
}

export const ContactStep = ({ data, onSubmit }: ContactStepProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: data || {
      name: "",
      email: "",
      phone: "",
      wantsWhatsAppUpdates: false,
    },
  });

  const wantsUpdates = watch("wantsWhatsAppUpdates");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue("phone", formatted, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-foreground font-body">
          Nome completo *
        </Label>
        <Input
          id="name"
          {...register("name")}
          className="mt-2 bg-secondary border-border"
          placeholder="Seu nome completo"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive font-body">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="text-foreground font-body">
          Email *
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="mt-2 bg-secondary border-border"
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive font-body">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="phone" className="text-foreground font-body">
          WhatsApp *
        </Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          onChange={handlePhoneChange}
          className="mt-2 bg-secondary border-border"
          placeholder="(11) 99999-9999"
          maxLength={15}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-destructive font-body">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="whatsapp-updates"
            checked={wantsUpdates}
            onCheckedChange={(checked) =>
              setValue("wantsWhatsAppUpdates", checked === true)
            }
          />
          <Label
            htmlFor="whatsapp-updates"
            className="text-sm text-foreground font-body cursor-pointer"
          >
            Quero receber atualizações no WhatsApp
          </Label>
        </div>
        <p className="text-xs text-muted-foreground font-body ml-6">
          Vamos enviar atualizações do pedido por WhatsApp
        </p>
      </div>

      <button type="submit" className="hidden" />
    </form>
  );
};
