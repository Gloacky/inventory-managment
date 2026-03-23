"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const ProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.coerce.number().nonnegative("Price must be non-negative"),
    quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
    sku: z.string().optional(),
    lowStockAt: z.coerce.number().int().min(0).optional(),
});

export async function deleteProduct(formData: FormData) {
    const user = await getCurrentUser();
    const id = String(formData.get("id") || "");

    await prisma.product.deleteMany({
        where: { id: id, userId: user.id },
    });
}

// lib/actions/products.tsx
export async function createProduct(formData: FormData) {
    const user = await getCurrentUser();

    const parsed = ProductSchema.safeParse({
        name: formData.get("name"),
        price: formData.get("price"),
        quantity: formData.get("quantity"),
        sku: formData.get("sku") || undefined,
        lowStockAt: formData.get("lowStockAt") || undefined,
    });

    if (!parsed.success) {
        return { success: false, errors: parsed.error.flatten().fieldErrors };
    }

    try {
        await prisma.product.create({
            data: { ...parsed.data, userId: user.id },
        });
        revalidatePath("/inventory");
        return { success: true };          // ← return, don't redirect
    } catch (error) {
        return { success: false, errors: { _form: ["Failed to create product"] } };
    }
}