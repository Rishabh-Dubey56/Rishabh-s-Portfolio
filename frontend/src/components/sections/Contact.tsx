"use client";

import { useState } from "react";
import {
  Send,
  Check,
  MapPin,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  Loader2,
  Mail,
  Copy,
  ShieldCheck,
} from "lucide-react";
import { SITE } from "@/lib/constants";
import { sendContactEmail, isEmailJSConfigured } from "@/lib/emailjs";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  // Copy email to clipboard helper
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  /**
   * Handle contact form submit directly via EmailJS
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    // Rate limiting: prevent submission within 5 seconds of previous
    const now = Date.now();
    if (now - lastSubmissionTime < 5000) {
      setErrorMessage("Please wait a moment before sending another message.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const result = await sendContactEmail(formData);
      setSuccessMessage(result.message);
      setIsSubmitted(true);
      setLastSubmissionTime(Date.now());
      // Reset form only on successful delivery
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        honeypot: "",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while transmitting your message.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center py-28 overflow-hidden bg-transparent"
      aria-label="Contact section"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[650px] h-[450px] opacity-[0.08] blur-[150px]"
          style={{ background: "radial-gradient(ellipse, #dc2626 0%, transparent 70%)" }}
        />
        <div
          className="absolute right-10 top-1/4 w-[350px] h-[350px] opacity-[0.04] blur-[120px]"
          style={{ background: "radial-gradient(circle, #d97706 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* ── Dramatic Diagonal Split Banner ── */}
        <div className="relative w-full rounded-3xl overflow-hidden mb-16 border border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-br from-[#dc2626] via-[#b91c1c] to-[#7f1d1d]" />
            <div
              className="absolute inset-0 bg-[#f9fafb]"
              style={{
                clipPath: "polygon(0 0, 68% 0, 32% 100%, 0 100%)",
              }}
            />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 sm:p-12 md:p-14">
            <div className="md:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-void/90 text-ivory text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-crimson" />
                <span className="uppercase tracking-widest font-semibold">05 — Convergence</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#0a0a0d] tracking-tight uppercase leading-[0.95]">
                Let&apos;s Build Something Extraordinary
              </h2>
              <p className="font-body text-sm sm:text-base text-[#27272a] font-medium max-w-md">
                Full-Stack Systems · Intelligent Machine Learning · Spatial Interactivity
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col md:items-end justify-center text-left md:text-right space-y-3">
              <span className="font-mono text-xs text-white/80 uppercase tracking-widest">
                Direct Channels & Inquiries
              </span>
              <div className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Rishabh Dubey
              </div>
              <p className="font-body text-xs text-white/90 max-w-xs leading-relaxed">
                Available for engineering roles, technical collaboration, and Summer 2026 internships.
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Direct Verified Channels & Status Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Verified Email Card */}
            <div className="card p-6 md:p-7 relative group border-white/10 hover:border-crimson/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-steel flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-crimson" />
                  Direct Email Inbox
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                  Verified Active
                </span>
              </div>

              <div className="mb-4">
                <span className="font-display text-base font-bold text-ivory block select-all">
                  {SITE.email}
                </span>
                <p className="font-body text-xs text-ash mt-1">
                  Messages submitted through this contact terminal are delivered straight to this address.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-crimson text-ivory font-body font-medium text-xs transition-all hover:bg-blaze hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Direct Email</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  type="button"
                  title="Copy email address"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-ash hover:text-ivory hover:border-white/[0.2] transition-colors text-xs font-mono cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="card p-6 md:p-7 relative group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-steel">
                  Professional Profiles
                </span>
                <span className="p-2 rounded-lg bg-crimson/10 text-crimson">
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>

              <h4 className="font-display text-lg font-bold text-ivory mb-1">
                LinkedIn & GitHub
              </h4>
              <p className="font-body text-xs text-ash mb-5">
                Explore open source repositories, architecture diagrams, and career milestones.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-ash hover:text-ivory hover:border-white/[0.2] transition-colors text-xs font-mono cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Connect on LinkedIn</span>
                </a>

                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-ash hover:text-ivory hover:border-white/[0.2] transition-colors text-xs font-mono cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Location & Status Card */}
            <div className="card p-6 md:p-7 space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-amber-warm shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-steel block">
                    Base Location
                  </span>
                  <span className="font-body text-sm font-semibold text-ivory">
                    {SITE.location}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.05]">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-xs text-silver font-medium">
                    Current Engagement Status
                  </span>
                </div>
                <p className="font-body text-xs text-ash leading-relaxed">
                  Open for full-stack software development roles, AI/ML research collaborations,
                  and Summer 2026 engineering internships.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Email Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="card p-7 md:p-9 relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-crimson" />
                  <h3 className="font-display text-xl font-bold text-ivory">
                    Send a Direct Message
                  </h3>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] text-steel">
                  <span className="px-2.5 py-0.5 rounded-full bg-crimson/15 text-crimson font-medium border border-crimson/30">
                    Direct Email Delivery
                  </span>
                </div>
              </div>

              {/* Error banner */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-crimson/10 border border-crimson/20 text-crimson font-body text-sm flex items-start gap-3 animate-fade-in">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="flex-1">{errorMessage}</span>
                </div>
              )}

              {/* ── Form View ── */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot field for bot/spam prevention */}
                  <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                    <label htmlFor="contact-hp">Do not fill this field</label>
                    <input
                      id="contact-hp"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, honeypot: e.target.value }))
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Input */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block font-mono text-xs uppercase tracking-wider text-steel mb-2"
                      >
                        Your Name <span className="text-crimson">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        disabled={loading}
                        placeholder="e.g. Alex Vance"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-xl bg-void/80 border border-white/[0.08] text-ivory placeholder:text-steel/50 font-body text-sm focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors disabled:opacity-50"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block font-mono text-xs uppercase tracking-wider text-steel mb-2"
                      >
                        Email Address <span className="text-crimson">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        disabled={loading}
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-xl bg-void/80 border border-white/[0.08] text-ivory placeholder:text-steel/50 font-body text-sm focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block font-mono text-xs uppercase tracking-wider text-steel mb-2"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      disabled={loading}
                      placeholder="Project Inquiry / Job Opportunity / Research"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, subject: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-void/80 border border-white/[0.08] text-ivory placeholder:text-steel/50 font-body text-sm focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors disabled:opacity-50"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="contact-message"
                        className="block font-mono text-xs uppercase tracking-wider text-steel"
                      >
                        Message <span className="text-crimson">*</span>
                      </label>
                      <span className="font-mono text-[11px] text-steel/60">
                        {formData.message.length} characters (min 10)
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      required
                      disabled={loading}
                      rows={5}
                      placeholder="Describe your inquiry, project scope, or opportunity..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, message: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-void/80 border border-white/[0.08] text-ivory placeholder:text-steel/50 font-body text-sm focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors resize-none disabled:opacity-50"
                    />
                  </div>

                  {/* Destination & Security Badge */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3 text-xs text-steel">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-warm shrink-0" />
                      <span>
                        Delivers directly to <strong>{SITE.email}</strong> via client email service.
                      </span>
                    </div>
                    {!isEmailJSConfigured() && (
                      <span className="font-mono text-[10px] text-amber-warm shrink-0">
                        Preview Mode Active
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-crimson text-ivory font-body font-semibold text-sm transition-all duration-300 hover:bg-blaze hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* ── Success Screen ── */
                <div className="p-8 rounded-2xl bg-void/80 border border-emerald-500/20 text-center space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400">
                    <Check className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-display text-2xl font-bold text-ivory">
                      Message Sent Successfully!
                    </h4>
                    <p className="font-body text-sm text-ash max-w-md mx-auto leading-relaxed">
                      {successMessage || `Your message has been delivered to ${SITE.email}.`}
                    </p>
                  </div>

                  <p className="text-xs text-steel/70 max-w-sm mx-auto">
                    Thank you for reaching out. Rishabh will review your inquiry and follow up promptly.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-6 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.04] text-ivory font-body font-medium text-xs hover:border-crimson/50 hover:bg-crimson/10 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Closing Glass Plaque / Social Identity ── */}
        <div className="flex justify-center pt-8">
          <div className="card p-6 sm:p-8 max-w-md w-full text-center relative overflow-hidden group border border-white/10 hover:border-crimson/40 hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] transition-all">
            {/* Ambient Backlight */}
            <div
              className="absolute -inset-10 opacity-30 blur-[60px] pointer-events-none group-hover:opacity-50 transition-opacity"
              style={{ background: "radial-gradient(circle, #dc2626 0%, #d97706 50%, transparent 70%)" }}
              aria-hidden="true"
            />

            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-void border border-white/15 mx-auto flex items-center justify-center shadow-lg group-hover:border-crimson/60 transition-colors">
                <span className="font-display text-lg font-black text-ivory group-hover:text-crimson transition-colors">
                  RD
                </span>
              </div>

              <div>
                <h4 className="font-display text-lg font-bold text-ivory">
                  Rishabh Dubey
                </h4>
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-mono text-xs text-amber-warm hover:text-white transition-colors block mt-0.5"
                >
                  {SITE.email}
                </a>
              </div>

              <p className="font-body text-xs text-steel">
                B.Tech CSE (IBM) · United University, Prayagraj · 2024–2028 · 3rd Year
              </p>

              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-silver hover:text-ivory hover:border-crimson/50 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-silver hover:text-ivory hover:border-amber-warm/50 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
