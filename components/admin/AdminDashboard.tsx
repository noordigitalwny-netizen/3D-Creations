/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { logoutAdmin } from "@/lib/actions/auth";
import {
  AdminProduct,
  SiteContentValues,
  deleteProductAction,
  toggleProductStockAction,
  saveProductAction,
  saveSiteContentAction,
} from "@/lib/actions/admin";
import {
  Package,
  FileText,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  LogOut,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  X,
  Loader2,
  Layers,
  Sparkles,
} from "lucide-react";

interface AdminDashboardProps {
  initialProducts: AdminProduct[];
  initialContent: SiteContentValues;
}

export default function AdminDashboard({
  initialProducts,
  initialContent,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"products" | "content">("products");
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [content, setContent] = useState<SiteContentValues>(initialContent);

  // Modal State for Product Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalPrice, setModalPrice] = useState("");
  const [modalCategory, setModalCategory] = useState("PLA");
  const [modalInStock, setModalInStock] = useState(true);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Feedback states
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const showNotification = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  // Open Add Product modal
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setModalTitle("");
    setModalPrice("");
    setModalCategory("PLA");
    setModalInStock(true);
    setModalImageUrl("/uploads/overture-spool.png");
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  // Open Edit Product modal
  const handleOpenEditModal = (product: AdminProduct) => {
    setEditingProduct(product);
    setModalTitle(product.title);
    setModalPrice(product.price.toString());
    setModalCategory(product.category || "PLA");
    setModalInStock(product.in_stock);
    setModalImageUrl(product.image || "/uploads/overture-spool.png");
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  // Handle Save Product (Add or Edit)
  const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (editingProduct) {
      formData.append("id", editingProduct.id);
    }
    formData.append("title", modalTitle);
    formData.append("price", modalPrice);
    formData.append("category", modalCategory);
    formData.append("in_stock", modalInStock ? "true" : "false");
    formData.append("imageUrl", modalImageUrl);

    if (selectedFile) {
      formData.append("imageFile", selectedFile);
    }

    startTransition(async () => {
      const res = await saveProductAction(formData);
      if (res.success) {
        showNotification("success", editingProduct ? "Product updated successfully!" : "Product created successfully!");
        setIsModalOpen(false);

        // Optimistically update or re-sync local products list
        if (editingProduct) {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === editingProduct.id
                ? {
                    ...p,
                    title: modalTitle,
                    price: parseFloat(modalPrice) || 0,
                    category: modalCategory,
                    in_stock: modalInStock,
                    image: modalImageUrl,
                  }
                : p
            )
          );
        } else {
          setProducts((prev) => [
            {
              id: Date.now().toString(),
              title: modalTitle,
              price: parseFloat(modalPrice) || 0,
              category: modalCategory,
              in_stock: modalInStock,
              image: modalImageUrl,
            },
            ...prev,
          ]);
        }
      } else {
        showNotification("error", res.error || "Failed to save product.");
      }
    });
  };

  // Handle Delete Product
  const handleDeleteProduct = (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    startTransition(async () => {
      const res = await deleteProductAction(id);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showNotification("success", "Product deleted successfully.");
      } else {
        showNotification("error", res.error || "Failed to delete product.");
      }
    });
  };

  // Handle In-Stock Toggle
  const handleToggleStock = (product: AdminProduct) => {
    const newStock = !product.in_stock;
    startTransition(async () => {
      const res = await toggleProductStockAction(product.id, newStock);
      if (res.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, in_stock: newStock } : p))
        );
        showNotification("success", `Stock status updated for ${product.title}`);
      } else {
        showNotification("error", res.error || "Failed to toggle stock status.");
      }
    });
  };

  // Handle Save Site Content
  const handleContentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await saveSiteContentAction(formData);
      if (res.success) {
        showNotification("success", "Site content updated and revalidated successfully!");
      } else {
        showNotification("error", res.error || "Failed to update site content.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
              3D
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg block leading-none">
                3D Creations Admin
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Management Portal
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <form action={logoutAdmin}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-md border border-red-200 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Toast / Notification Banner */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border flex items-center justify-between transition-all ${
              message.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center space-x-2 text-sm font-medium">
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
            <button
              onClick={() => setMessage(null)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-8 space-x-2">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "products"
                ? "border-blue-600 text-blue-600 bg-white rounded-t-lg shadow-sm"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products Management</span>
            <span
              className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                activeTab === "products"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "content"
                ? "border-blue-600 text-blue-600 bg-white rounded-t-lg shadow-sm"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Site Content &amp; Text</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Inventory &amp; Spool Catalog
                </h2>
                <p className="text-sm text-slate-600 mt-0.5">
                  Manage filament spools and products displayed in the Bangor local store.
                </p>
              </div>
              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Products Table / Cards */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {products.length === 0 ? (
                <div className="py-16 px-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">No products found</h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    Click &quot;Add Product&quot; to upload an image and create your first spool item in Supabase.
                  </p>
                  <button
                    onClick={handleOpenAddModal}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Product
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 text-xs font-bold uppercase border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4">Item</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Price</th>
                        <th className="py-3.5 px-4">Stock Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden relative shrink-0 flex items-center justify-center">
                                {product.image ? (
                                  <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src =
                                        "/uploads/overture-spool.png";
                                    }}
                                  />
                                ) : (
                                  <Layers className="w-5 h-5 text-slate-400" />
                                )}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">{product.title}</div>
                                <div className="text-xs text-slate-400">ID: {product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                              {product.category || "PLA"}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-semibold text-slate-900">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() => handleToggleStock(product)}
                              disabled={isPending}
                              title="Click to toggle status"
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                                product.in_stock
                                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300"
                              }`}
                            >
                              {product.in_stock ? (
                                <>
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                  In Stock
                                </>
                              ) : (
                                <>
                                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                  Out of Stock
                                </>
                              )}
                            </button>
                          </td>
                          <td className="py-4 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditModal(product)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                              title="Edit product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id, product.title)}
                              className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SITE CONTENT & TEXT */}
        {activeTab === "content" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-4xl space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Site Content &amp; Headlines
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Edit key marketing phrases, phone number, and location details shown across the website.
              </p>
            </div>

            <form onSubmit={handleContentSubmit} className="space-y-6 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Hero Headline
                </label>
                <input
                  type="text"
                  name="heroHeadline"
                  defaultValue={content.heroHeadline}
                  required
                  placeholder="Metrology-Grade 3D Scanning & Multi-Color 3D Printing"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Primary title displayed prominently on the home page hero.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Hero Subtitle
                </label>
                <textarea
                  name="heroSubtitle"
                  rows={3}
                  defaultValue={content.heroSubtitle}
                  required
                  placeholder="Local 3D scanning down to 0.02mm precision and rapid additive manufacturing in Bangor, PA..."
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Supporting descriptive copy beneath the hero headline.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={content.phone}
                    required
                    placeholder="(610) 555-0199"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Direct customer contact telephone.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Bangor Studio Address / Region
                  </label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={content.address}
                    required
                    placeholder="Bangor, PA 18013 | Slate Belt Region"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Location tag shown in hero banners and footer.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Save Text Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-6 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  required
                  placeholder="Overture PLA - Matte Black"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={modalPrice}
                    onChange={(e) => setModalPrice(e.target.value)}
                    required
                    placeholder="25.00"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={modalCategory}
                    onChange={(e) => setModalCategory(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 text-slate-900 bg-white"
                  >
                    <option value="PLA">PLA</option>
                    <option value="PETG">PETG</option>
                    <option value="TPU">TPU</option>
                    <option value="ABS">ABS</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Product Image
                </label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center">
                      <img
                        src={
                          selectedFile
                            ? URL.createObjectURL(selectedFile)
                            : modalImageUrl || "/uploads/overture-spool.png"
                        }
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/uploads/overture-spool.png";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                        <Upload className="w-3.5 h-3.5 text-slate-500" />
                        <span>{selectedFile ? "Change Image" : "Upload File"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setSelectedFile(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                      <span className="block text-[11px] text-slate-500 mt-1">
                        Uploads directly to <code>product-images</code> Supabase bucket.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="in_stock"
                  checked={modalInStock}
                  onChange={(e) => setModalInStock(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="in_stock" className="text-sm font-semibold text-slate-700 cursor-pointer">
                  In Stock (Display in store catalog)
                </label>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingProduct ? "Update Product" : "Save Product"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
