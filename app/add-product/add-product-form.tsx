"use client";

import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/actions/products";
import Link from "next/link";

export default function AddProductForm() {
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        const result = await createProduct(formData);
        if (result?.success) {
            router.push("/inventory");
        }
    }

    return (
        <form className="space-y-6" action={handleSubmit}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                </label>
                <input type="text" id="name" name="name" required
                    className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:border-transparent" />
            </div>

            <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                </label>
                <input type="number" id="quantity" name="quantity" required placeholder="0"
                    className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:border-transparent" />
            </div>

            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                </label>
                <input type="number" id="price" name="price" step="0.01" min="0" required placeholder="0.0"
                    className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:border-transparent" />
            </div>

            <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                    SKU (Optional)
                </label>
                <input type="text" id="sku" name="sku" placeholder="Enter SKU"
                    className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:border-transparent" />
            </div>

            <div>
                <label htmlFor="lowStockAt" className="block text-sm font-medium text-gray-700 mb-2">
                    Low stock at (Optional)
                </label>
                <input type="number" id="lowStockAt" name="lowStockAt" placeholder="Enter low stock threshold" min="0"
                    className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:border-transparent" />
            </div>

            <div className="flex gap-5">
                <button type="submit" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Add product
                </button>
                <Link href="/inventory" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                    Cancel
                </Link>
            </div>
        </form>
    );
}