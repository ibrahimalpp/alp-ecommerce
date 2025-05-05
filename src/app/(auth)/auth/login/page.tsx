"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/userStore";

const formSchema = z.object({
  email: z.string().email({ message: "Email zorunlu" }),
  password: z.string().min(2, { message: "Şifre en az 2 karakter olmalı." }),
});

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Giriş başarısız");
      }

      setUser(data.user);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", JSON.stringify({ id: data.user.id })); // ✅ burası önemli

      toast({
        title: "Giriş Başarılı!",
        description: `Hoşgeldin ${data.user.first_name}! 👋`,
      });

      router.push("/");
    } catch (error: any) {
      toast({
        title: "Giriş Hatası",
        description: error.message || "Bilinmeyen hata",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Giriş Yap</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Giriş Yap
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm text-gray-600">
        Hesabın yok mu?{" "}
        <Link href="/auth/register" className="text-purple-600 hover:underline">
          Kayıt Ol
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
