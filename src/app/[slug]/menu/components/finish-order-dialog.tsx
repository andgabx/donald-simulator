"use client";

import { DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerFooter,
  DrawerTrigger,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerContent,
} from "@/components/ui/drawer";
import { z } from "zod";
import { isValidCpf } from "../helpers/cpf";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDescription, FormMessage } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { PatternFormat } from "react-number-format";
import { createOrder } from "../actions/create-order";
import { useParams, useSearchParams } from "next/navigation";
import { ConsumptionMethod } from "@prisma/client";
import { CartContext } from "../contexts/cart";
import { useContext, useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
  CPF: z
    .string()
    .min(14, { message: "CPF é obrigatório" })
    .refine((value) => isValidCpf(value), { message: "CPF inválido" }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const { slug } = useParams<{ slug: string }>();
  const {products} = useContext(CartContext);
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      CPF: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const consumptionMethod = searchParams.get(
        "consumptionMethod",
      ) as ConsumptionMethod;
      startTransition(async () => {

      await createOrder({
        customerName: data.name,
        customerCpf: data.CPF,
        products: products,
        consumptionMethod: consumptionMethod,
          slug,
        });
        onOpenChange(false);
        toast.success("Pedido finalizado com sucesso!");
      });
    } 
    catch (error) {
      console.error(error);
      toast.error("Erro ao finalizar pedido");
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        
      </DrawerTrigger>
      <DrawerContent className="px-8">
        <DrawerHeader>
          <DrawerTitle>Finalizar pedido</DrawerTitle>
          <DrawerDescription>
            Este pedido será enviado para o estabelecimento.
          </DrawerDescription>
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este é o nome que será exibido no pedido.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CPF"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <PatternFormat
                      placeholder="Seu CPF"
                      format="###.###.###-##"
                      customInput={Input}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Este é o CPF que será exibido no pedido.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DrawerFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Confirmando..." : "Confirmar pedido"}
              </Button>

              <DrawerClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
