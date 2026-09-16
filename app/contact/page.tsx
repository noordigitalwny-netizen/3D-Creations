"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import {
  Send,
  UploadCloud,
  File,
  X,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

function ContactFormInner() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceNeeded: "3d-printing",
    description: "",
    pickupPreference: "local-bangor",
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Pre-fill fields from URL params
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const reserveParam = searchParams.get("reserve");
    const productName = searchParams.get("productName");
    const estimateParam = searchParams.get("estimate");
    const materialParam = searchParams.get("material");
    const weightParam = searchParams.get("weight");

    if (serviceParam && servicesData.some((s) => s.slug === serviceParam)) {
      setFormData((prev) => ({ ...prev, serviceNeeded: serviceParam }));
    }

    if (reserveParam && productName) {
      setFormData((prev) => ({
        ...prev,
        serviceNeeded: "3d-printing",
        description: `INVENTORY RESERVATION FOR LOCAL PICKUP: Reserving spool "${productName}" (${reserveParam}). Please confirm pickup time.`,
      }));
    } else if (estimateParam) {
      setFormData((prev) => ({
        ...prev,
        description: `ONLINE ESTIMATOR SUMMARY:\n- Estimated Price: ~$${estimateParam}\n- Details: ${materialParam || ""} (${weightParam || ""}g)\n- Please review attached design/scan requirement.`,
      }));
    }
  }, [searchParams]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage("Please fill in your name, email, and phone number.");
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmittedSuccess(true);
    } catch (err) {
      setErrorMessage("Something went wrong. Please call us directly at " + siteConfig.contact.phone);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Main Lead Capture Form Column */}
      <div className="lg:col-span-7 bg-white border border-gray-200 p-6 sm:p-8 rounded-lg shadow-sm space-y-6">
        {submittedSuccess ? (
          <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-bold text-slate-900">Quote Request Submitted!</h2>
            <p className="text-sm text-slate-700 max-w-md mx-auto">
              Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our Bangor PA studio team is reviewing your project details. We will contact you at <strong className="text-blue-600">{formData.email}</strong> shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmittedSuccess(false)}
              className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-md text-xs"
            >
              Submit Another Project
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-4 bg-white text-sm text-slate-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 touch-target-min"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(610) 555-0199"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-11 px-4 bg-white text-sm text-slate-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 touch-target-min"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-11 px-4 bg-white text-sm text-slate-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 touch-target-min"
              />
            </div>

            {/* Service Selection Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Primary Service Needed
              </label>
              <select
                value={formData.serviceNeeded}
                onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                className="w-full h-11 px-4 bg-white text-sm font-semibold text-slate-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 touch-target-min"
              >
                {servicesData.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title} ({s.tagline})
                  </option>
                ))}
              </select>
            </div>

            {/* Drag-and-Drop File Upload UI */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Attach 3D Files or Photos (STL, OBJ, STEP, PNG, JPG)
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
                  isDragging
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 bg-gray-50 hover:border-gray-400"
                }`}
              >
                <input
                  type="file"
                  multiple
                  accept=".stl,.obj,.step,.stp,.ply,.png,.jpg,.jpeg,.pdf"
                  onChange={handleFileInputChange}
                  className="hidden"
                  id="file-upload-input"
                />
                <label htmlFor="file-upload-input" className="cursor-pointer space-y-2 block">
                  <UploadCloud className="w-10 h-10 text-blue-600 mx-auto" />
                  <div className="text-sm font-bold text-slate-900">
                    Drag & Drop files here, or <span className="text-blue-600 underline">Browse</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Supports STL, OBJ, STEP, PLY models and part photos up to 100MB
                  </p>
                </label>
              </div>

              {/* Uploaded File Previews */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-slate-700">
                    Attached Files ({uploadedFiles.length}):
                  </div>
                  <div className="space-y-1.5">
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded bg-gray-50 border border-gray-200 text-xs text-slate-800"
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <File className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="truncate">{file.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Project Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Project Description & Specific Requirements
              </label>
              <textarea
                rows={4}
                placeholder="Describe your part tolerances, material preferences, quantity, or specific fitment issues..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-4 bg-white text-sm text-slate-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 flex items-center justify-center space-x-2 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition-colors touch-target-min"
            >
              <Send className="w-5 h-5" />
              <span>{submitting ? "Submitting Quote Request..." : "Submit Quote Request"}</span>
            </button>
          </form>
        )}
      </div>

      {/* Sidebar Panel: Studio Info & Local Handoff */}
      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-lg bg-white border border-gray-200 p-6 space-y-6 shadow-sm">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Bangor Studio Information</h3>
            <p className="text-xs text-slate-500">Direct contact & local part dropoff</p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Location & Region:</strong>
                <span className="text-slate-600 text-xs">{siteConfig.location.fullFormatted}</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Studio Telephone:</strong>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="text-blue-600 text-xs hover:underline font-semibold"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Email Inquiries:</strong>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-blue-600 text-xs hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Business Hours:</strong>
                <span className="text-slate-600 text-xs">{siteConfig.contact.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Local Dropoff Card */}
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-6 space-y-3 shadow-sm">
          <div className="flex items-center space-x-2 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Physical Part Drop-off</span>
          </div>
          <h4 className="text-base font-bold text-slate-900">Have a Broken Physical Part?</h4>
          <p className="text-xs text-slate-700 leading-relaxed">
            Bring your hardware directly to our Bangor, PA facility. We will perform an immediate visual inspection and 3D scan it using our 0.02mm Revopoint METRO X scanner.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ContactQuotePage() {
  return (
    <div className="bg-slate-50 py-12 lg:py-20 border-b border-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200">
            Slate Belt Local Studio
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Request a Free Quote & Submit Files
          </h1>
          <p className="text-base text-slate-600">
            Upload your 3D CAD files (STL, OBJ, STEP) or describe your broken part. We review all submissions within 4 business hours.
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-slate-500 py-12">Loading quote form...</div>}>
          <ContactFormInner />
        </Suspense>
      </div>
    </div>
  );
}
