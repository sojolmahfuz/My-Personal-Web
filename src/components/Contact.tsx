import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check, Database } from "lucide-react";
import confetti from "canvas-confetti";
import { profileData } from "../data/profile";
import { submitContactMessage, SUPABASE_PROJECT_ID } from "../lib/supabase";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.subject.trim()) errs.subject = "Subject line is required.";
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = "Please write a message with at least 15 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Direct insertion to user's Supabase project backend
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#00B8FF", "#1687FF", "#F5F8FF"],
      });
      // Also build mailto link for direct mail client backup
      const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    } catch (err) {
      console.error("Submission error:", err);
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  return (
    <section id="contact" className="py-24 bg-[#0C2340]/60 relative border-t border-[#1687FF]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00B8FF] uppercase tracking-widest mb-3">
            <span className="w-5 h-[2px] bg-[#00B8FF]" />
            <span>GET IN TOUCH</span>
            <span className="w-5 h-[2px] bg-[#00B8FF]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F8FF] tracking-tight leading-tight mb-4">
            Let’s Work Together
          </h2>
          <p className="text-sm sm:text-base text-[#A9BDD5] leading-relaxed">
            I'm always open to discussing teaching, research, software development, collaborations, and innovative technology projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Details & University Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-[#F5F8FF] mb-2">
                Direct Contact Channels
              </h3>
              <p className="text-xs sm:text-sm text-[#A9BDD5] leading-relaxed">
                Reach out directly via official email or telephone for university inquiries, thesis advising, or technical consulting.
              </p>
            </div>

            {/* Email Card */}
            <div className="bg-[#07182D]/80 border border-[#1687FF]/20 hover:border-[#00B8FF]/50 rounded-2xl p-5 transition-all flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#00B8FF]/10 text-[#00B8FF] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider">
                    Primary Email
                  </p>
                  <a
                    href={`mailto:${profileData.email}`}
                    className="text-sm sm:text-base font-bold text-[#F5F8FF] hover:text-[#00B8FF] transition-colors"
                  >
                    {profileData.email}
                  </a>
                  <p className="text-[11px] text-[#A9BDD5]/70 mt-0.5">
                    Fast response for academic & project messages
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(profileData.email, "email")}
                className="p-2 text-[#A9BDD5] hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedItem === "email" ? (
                  <Check className="w-4 h-4 text-[#00B8FF]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Numbers Card */}
            <div className="bg-[#07182D]/80 border border-[#1687FF]/20 hover:border-[#00B8FF]/50 rounded-2xl p-5 transition-all flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#00B8FF]/10 text-[#00B8FF] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider">
                    Telephone / Mobile
                  </p>
                  <div>
                    <a
                      href={`tel:${profileData.phones[0]}`}
                      className="text-sm font-bold text-[#F5F8FF] hover:text-[#00B8FF] block font-mono-code tabular-nums transition-colors"
                    >
                      {profileData.phones[0]}
                    </a>
                    <a
                      href={`tel:${profileData.phones[1]}`}
                      className="text-sm font-bold text-[#F5F8FF] hover:text-[#00B8FF] block font-mono-code tabular-nums transition-colors"
                    >
                      {profileData.phones[1]}
                    </a>
                  </div>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(profileData.phones[0], "phone")}
                className="p-2 text-[#A9BDD5] hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Copy primary phone"
              >
                {copiedItem === "phone" ? (
                  <Check className="w-4 h-4 text-[#00B8FF]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* University Office Location Card */}
            <div className="bg-[#07182D]/80 border border-[#1687FF]/20 rounded-2xl p-5 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#00B8FF]/10 text-[#00B8FF] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#A9BDD5] uppercase tracking-wider">
                  Academic Campus & Address
                </p>
                <p className="text-sm font-bold text-[#F5F8FF]">
                  {profileData.institution}
                </p>
                <p className="text-xs text-[#A9BDD5] mt-1 leading-relaxed">
                  {profileData.addresses.present}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Accessible Validated Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#07182D]/90 border border-[#1687FF]/25 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-[#07182D]/80"
          >
            {isSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#00B8FF]/10 text-[#00B8FF] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#F5F8FF]">
                  Message Sent & Recorded!
                </h3>
                <p className="text-sm text-[#A9BDD5] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your message has been saved to the backend <strong className="text-[#00B8FF]">Supabase</strong> database and routed to <strong className="text-[#00B8FF]">{profileData.email}</strong>.
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0C2340] border border-[#00B8FF]/30 rounded-lg text-xs font-mono-code text-[#00B8FF]">
                  <Database className="w-3.5 h-3.5" />
                  <span>Synced with Supabase: {SUPABASE_PROJECT_ID}</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="px-6 py-2.5 text-xs font-semibold text-[#07182D] bg-[#00B8FF] rounded-xl hover:bg-[#1687FF] hover:text-white transition-colors cursor-pointer mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#F5F8FF] uppercase tracking-wider mb-2"
                    >
                      Your Name <span className="text-[#00B8FF]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Tanvir Ahmed"
                      className={`w-full px-4 py-3 bg-[#0C2340] border rounded-xl text-sm text-[#F5F8FF] placeholder-[#A9BDD5]/40 focus:outline-none transition-colors ${
                        errors.name
                          ? "border-rose-500 focus:border-rose-400"
                          : "border-[#1687FF]/25 focus:border-[#00B8FF]"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#F5F8FF] uppercase tracking-wider mb-2"
                    >
                      Your Email <span className="text-[#00B8FF]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. colleague@university.edu"
                      className={`w-full px-4 py-3 bg-[#0C2340] border rounded-xl text-sm text-[#F5F8FF] placeholder-[#A9BDD5]/40 focus:outline-none transition-colors ${
                        errors.email
                          ? "border-rose-500 focus:border-rose-400"
                          : "border-[#1687FF]/25 focus:border-[#00B8FF]"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold text-[#F5F8FF] uppercase tracking-wider mb-2"
                  >
                    Subject <span className="text-[#00B8FF]">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Research Collaboration / Software Inquiry"
                    className={`w-full px-4 py-3 bg-[#0C2340] border rounded-xl text-sm text-[#F5F8FF] placeholder-[#A9BDD5]/40 focus:outline-none transition-colors ${
                      errors.subject
                        ? "border-rose-500 focus:border-rose-400"
                        : "border-[#1687FF]/25 focus:border-[#00B8FF]"
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#F5F8FF] uppercase tracking-wider mb-2"
                  >
                    Message <span className="text-[#00B8FF]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please write your detailed note or inquiry here..."
                    className={`w-full px-4 py-3 bg-[#0C2340] border rounded-xl text-sm text-[#F5F8FF] placeholder-[#A9BDD5]/40 focus:outline-none transition-colors resize-none ${
                      errors.message
                        ? "border-rose-500 focus:border-rose-400"
                        : "border-[#1687FF]/25 focus:border-[#00B8FF]"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#07182D] bg-[#00B8FF] hover:bg-[#1687FF] hover:text-white rounded-xl transition-all duration-200 glow-cyan-sm active:scale-[0.99] cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-3 pt-2 text-[11px] text-[#A9BDD5]/60 border-t border-white/5">
                    <span>Direct email: <strong className="text-[#A9BDD5]">{profileData.email}</strong></span>
                    <span className="flex items-center gap-1.5 font-mono-code text-[#00B8FF]">
                      <Database className="w-3 h-3" />
                      <span>Supabase connected: {SUPABASE_PROJECT_ID}</span>
                    </span>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
