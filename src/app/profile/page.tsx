'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Home, Upload, KeyRound, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setEmail(parsedUser.email || "");
        setAvatarPreview(parsedUser.avatar ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${parsedUser.avatar}` : null);
      }
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarFile(e.target.files[0]);
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      let avatarId = user?.avatar;

      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);

        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/files`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (uploadData?.data?.id) {
          avatarId = uploadData.data.id;
        }
      }

      const updateBody: any = {
        email,
        avatar: avatarId,
      };

      const updateRes = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(updateBody),
      });

      if (!updateRes.ok) {
        throw new Error("Güncelleme başarısız oldu.");
      }

      const updatedUser = {
        ...user,
        email,
        avatar: avatarId,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast({
        title: "Başarılı!",
        description: "Profil bilgileriniz güncellendi.",
        variant: "success",
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      setIsSaving(false);
      router.refresh();
    } catch (error) {
      setIsSaving(false);
      toast({
        title: "Hata!",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Hata!",
        description: "Yeni şifreler eşleşmiyor.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!res.ok) {
        throw new Error("Şifre değiştirilemedi.");
      }

      toast({
        title: "Başarılı!",
        description: "Şifreniz güncellendi.",
        variant: "success",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Hata!",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return <p className="text-center py-10">Yükleniyor...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

      {/* Üst Buton */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profilim</h1>
        <Link href="/">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-700 hover:to-purple-700 text-white px-4 py-2 rounded-full shadow-md">
            <Home className="w-5 h-5" /> Anasayfa
          </Button>
        </Link>
      </div>

      {/* Profil Kartı */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="p-10 flex flex-col items-center gap-8 shadow-2xl relative">

          {/* Yeşil Başarı Tiki */}
          {showSuccess && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute -top-6 right-6 bg-green-500 text-white rounded-full p-2 shadow-lg"
            >
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>
          )}

          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-28 h-28">
              <Image
                src={avatarPreview || "/default-avatar.png"}
                alt="Avatar"
                fill
                className="rounded-full object-cover border-4 border-purple-500 shadow-md"
              />
            </div>

            {/* Avatar Yükleme Butonu */}
            <label htmlFor="avatar-upload" className="flex items-center gap-2 mt-4 cursor-pointer text-purple-600 hover:text-pink-500">
              <Upload className="w-4 h-4" />
              <span>Fotoğraf Seç</span>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* Email Form */}
          <div className="w-full flex flex-col gap-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email adresiniz"
              />
            </div>

            <Button onClick={handleSave} className="w-full text-lg py-6" disabled={isSaving}>
              {isSaving ? "Kaydediliyor..." : "Bilgilerimi Kaydet"}
            </Button>

            <Button variant="outline" className="w-full" onClick={() => setIsModalOpen(true)}>
              <KeyRound className="w-5 h-5 mr-2" /> Şifreyi Değiştir
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Şifre Değiştirme Modalı */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Şifre Değiştir</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <Label>Mevcut Şifre</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Mevcut şifreniz"
            />
            <Label>Yeni Şifre</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Yeni şifreniz"
            />
            <Label>Yeni Şifre (Tekrar)</Label>
            <Input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Yeni şifrenizi tekrar girin"
            />
            <Button onClick={handlePasswordChange}>
              Şifreyi Kaydet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
