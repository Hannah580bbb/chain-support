"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { callbackFormSchema, type CallbackFormData } from "@/lib/validation";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { FormField } from "@/components/FormField";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { showToast } from "@/components/Toast";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Users } from "lucide-react";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CallbackFormData>({
    resolver: zodResolver(callbackFormSchema),
  });

  const onSubmit = async (data: CallbackFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");

      showToast("Callback request submitted successfully!", "success");
      reset();
    } catch (error) {
      showToast("Error submitting request. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Professional Digital Asset Support
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Get expert assistance with your cryptocurrency and digital asset concerns. Fast, secure, and confidential support.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure & Private",
                description: "Your information is protected with enterprise-grade security",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Fast Response",
                description: "Get support within 24 hours from our expert team",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Expert Team",
                description: "Work with experienced cryptocurrency professionals",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 hover:bg-blue-500/10 transition"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Callback Form Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-dark border border-blue-500/20 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold mb-2 text-white">Request a Callback</h2>
            <p className="text-gray-400 mb-8">Fill out the form below and our team will contact you shortly.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField label="First Name" error={errors.firstName?.message} required>
                  <Input placeholder="John" {...register("firstName")} />
                </FormField>
                <FormField label="Last Name" error={errors.lastName?.message} required>
                  <Input placeholder="Doe" {...register("lastName")} />
                </FormField>
              </div>

              <FormField label="Email" error={errors.email?.message} required>
                <Input type="email" placeholder="you@example.com" {...register("email")} />
              </FormField>

              <FormField label="Phone" error={errors.phone?.message} required>
                <Input placeholder="+1 (555) 000-0000" {...register("phone")} />
              </FormField>

              <FormField label="Country" error={errors.country?.message} required>
                <select
                  {...register("country")}
                  className="w-full px-4 py-2.5 bg-blue-500/5 border border-blue-500/20 rounded-lg text-white focus:outline-none focus:border-blue-500/50"
                >
                  <option value="">Select a country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                </select>
              </FormField>

              <FormField label="Preferred Callback Time" error={errors.preferredTime?.message} required>
                <select
                  {...register("preferredTime")}
                  className="w-full px-4 py-2.5 bg-blue-500/5 border border-blue-500/20 rounded-lg text-white focus:outline-none focus:border-blue-500/50"
                >
                  <option value="">Select a time</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 8 PM)</option>
                </select>
              </FormField>

              <FormField label="Issue Category" error={errors.issueCategory?.message} required>
                <select
                  {...register("issueCategory")}
                  className="w-full px-4 py-2.5 bg-blue-500/5 border border-blue-500/20 rounded-lg text-white focus:outline-none focus:border-blue-500/50"
                >
                  <option value="">Select a category</option>
                  <option value="security">Security Concern</option>
                  <option value="transaction">Transaction Issue</option>
                  <option value="account">Account Access</option>
                  <option value="other">Other</option>
                </select>
              </FormField>

              <FormField label="Message" error={errors.message?.message} required>
                <textarea
                  {...register("message")}
                  placeholder="Describe your issue in detail..."
                  rows={5}
                  className="w-full px-4 py-2.5 bg-blue-500/5 border border-blue-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-200"
                />
              </FormField>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("agreePrivacy")}
                    className="w-4 h-4 rounded border-blue-500/20 bg-blue-500/5"
                  />
                  <span className="text-sm text-gray-300">
                    I agree to the Privacy Policy
                  </span>
                </label>
                {errors.agreePrivacy && (
                  <p className="text-red-400 text-sm">{errors.agreePrivacy.message}</p>
                )}

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("understandSecurity")}
                    className="w-4 h-4 rounded border-blue-500/20 bg-blue-500/5"
                  />
                  <span className="text-sm text-gray-300">
                    I understand the security implications and confirm I am not disclosing any private keys or sensitive information
                  </span>
                </label>
                {errors.understandSecurity && (
                  <p className="text-red-400 text-sm">{errors.understandSecurity.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoadingSpinner /> : "Request Callback"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
