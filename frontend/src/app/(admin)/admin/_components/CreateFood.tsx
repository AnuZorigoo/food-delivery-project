"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/axios";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const foodFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Food name must be at least 2 characters." }),
  price: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    { message: "Price must be a valid positive number." },
  ),
  imageUrl: z.string().min(1, { message: "Image is required." }),
  ingredients: z
    .string()
    .min(5, { message: "Ingredients must be at least 5 characters." }),
  categoryId: z.string().min(1, { message: "Please select a category." }),
});

type FoodFormValues = z.infer<typeof foodFormSchema>;

type Category = {
  _id: string;
  name: string;
};

export const CreateFoodDialog = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FoodFormValues>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: {
      name: "",
      price: "",
      ingredients: "",
      imageUrl: "",
      categoryId: "",
    },
    mode: "onSubmit",
  });

  // --- Helpers ---
  const resetFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openFilePicker = () => {
    console.log("openFilePicker called");
    console.log("isUploading:", isUploading);
    console.log("fileInputRef.current:", fileInputRef.current);

    if (isUploading) return;
    fileInputRef.current?.click();

    console.log("Click attempted");
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    // If user cancels picker, do nothing
    if (!file) return;

    setIsUploading(true);

    try {
      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        { method: "POST", body: file },
      );

      if (!response.ok) {
        let msg = "Upload failed. Please try again.";
        try {
          const err = await response.json();
          msg = `Upload failed: ${err.details || err.error || msg}`;
        } catch {
          // ignore json parse errors
        }
        alert(msg);
        return;
      }

      const blob = await response.json(); // expects { url: string }
      const url = blob?.url as string | undefined;

      if (!url) {
        alert("Upload failed: missing file URL from server.");
        return;
      }

      setUploadedImageUrl(url);
      form.setValue("imageUrl", url, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      // Important: allow selecting the SAME file again later
      resetFileInput();
    }
  };

  const removeImage = () => {
    setUploadedImageUrl("");
    form.setValue("imageUrl", "", { shouldValidate: true, shouldDirty: true });
    resetFileInput();
  };

  const onSubmit = async (values: FoodFormValues) => {
    try {
      const token = localStorage.getItem("accessToken");

      await api.post(
        "/foods/create",
        {
          name: values.name,
          price: parseFloat(values.price),
          ingredients: values.ingredients,
          imageUrl: values.imageUrl,
          categoryId: values.categoryId, // 👈 array биш
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      form.reset();
      setUploadedImageUrl("");
      resetFileInput();
      setOpen(false);
    } catch (err) {
      console.error("Create food failed:", err);
      alert("Failed to create dish. Please try again.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get<Category[]>("/categories");
        setCategories(data);
      } catch (e) {
        console.error("Failed to load categories:", e);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        // prevent closing while uploading (optional)
        if (isUploading) return;
        setOpen(nextOpen);

        // optional: when closing dialog, reset form + file
        if (!nextOpen) {
          form.reset();
          setUploadedImageUrl("");
          resetFileInput();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-full flex flex-col gap-4 items-center justify-center p-4"
        >
          <Plus />
          Add New Dish
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-150">
        <DialogHeader>
          <DialogTitle>Add new Dish</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type food name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter price..."
                        inputMode="decimal"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isUploading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List ingredients..."
                      className="min-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={() => (
                <FormItem>
                  <FormLabel>Food image</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        id="food-file-input"
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        tabIndex={-1}
                      />

                      {uploadedImageUrl ? (
                        <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
                          <Image
                            src={uploadedImageUrl}
                            alt="Uploaded food"
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            disabled={isUploading}
                            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 disabled:opacity-60"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            if (fileInputRef.current) {
                              fileInputRef.current.click();
                              return;
                            }

                            document.getElementById("food-file-input")?.click();
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              fileInputRef.current?.click();
                            }
                          }}
                          className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center hover:border-gray-400 transition-colors cursor-pointer select-none"
                        >
                          <Upload className="w-8 h-8 text-gray-400 mb-3" />
                          <p className="text-sm text-gray-600">
                            {isUploading
                              ? "Uploading..."
                              : "Choose a file or drag & drop it here"}
                          </p>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isUploading}
                className="bg-black text-white hover:bg-black/90"
              >
                {isUploading ? "Uploading..." : "Add Dish"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
