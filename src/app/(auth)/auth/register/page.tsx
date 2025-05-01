"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/toast"; // DOĞRU import bu
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

const registerSchema = z.object({
  name: z.string().min(2, { message: "İsim en az 2 karakter olmalı." }),
  email: z.string().email({ message: "Geçerli bir email adresi girin." }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalı." }),
});

const RegisterPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Kayıt başarısız");
      }

      // Başarı bildirimi
      toast({
        title: `Hoş geldin ${values.name}!`,
        description: "Başarıyla kaydoldun!",
      });

      setTimeout(() => {
        router.push("/");
      }, 1500);

    } catch (error: any) {
      console.error("Kayıt hatası:", error);

      toast({
        title: "Kayıt Hatası",
        description: error.message || "Bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Kayıt Ol</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İsim</FormLabel>
                <FormControl>
                  <Input placeholder="Adınız" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email adresiniz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şifre</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Şifreniz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Kayıt Ol
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-gray-600">
        Hesabın var mı?{" "}
        <Link href="/auth/login" className="text-purple-600 hover:underline">
          Giriş Yap
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
