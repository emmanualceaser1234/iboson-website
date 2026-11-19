"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { TextReveal } from "@/components/motion/TextReveal";
import { contactEmail, contactTopics } from "@/data/contact";
import { cn } from "@/lib/cn";

const labelClass = "font-display text-[11px] uppercase tracking-[0.12em] text-white/70";
const fieldClass =
  "mt-2 w-full border-b border-white/20 bg-transparent pb-2.5 font-body text-[15px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-gold-soft";

type Field = { name: string; label: string; type?: string; placeholder: string; required?: boolean; autoComplete?: string };

const fields: Field[] = [
  { name: "name", label: "Name", placeholder: "Your full name", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@company.com", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone (optional)", type: "tel", placeholder: "+91", autoComplete: "tel" },
  { name: "company", label: "Company (optional)", placeholder: "Company name", autoComplete: "organization" },
];

/**
 * "Send us a message" card. There is no form backend yet, so submitting opens the
 * visitor's email app with the message filled in, addressed to the iBoson inbox.
 * TODO: post to a form service / API route once one is chosen.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const topic = get("topic") || "General";
    const extras = [
      get("phone") ? `Phone: ${get("phone")}` : "",
      get("company") ? `Company: ${get("company")}` : "",
    ].filter(Boolean);
    const body = [get("message"), "", `— ${get("name")}`, get("email"), ...extras].join("\n");
    const subject = `${topic} enquiry from ${get("name")}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-white/12 bg-black/60 p-7 backdrop-blur-md md:p-10"
    >
      <TextReveal as="h2" text="Send us a message" className="font-display text-[28px] uppercase leading-tight md:text-[32px]" />

      <fieldset className="mt-7">
        <legend className={labelClass}>What can we help with?</legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {contactTopics.map((topic) => (
            <label key={topic} className="cursor-pointer">
              <input type="radio" name="topic" value={topic} className="peer sr-only" />
              <span
                className={cn(
                  "inline-flex h-9 items-center rounded-full border border-white/15 px-4 font-display text-[11px] uppercase tracking-[0.1em] text-white/60 transition-colors",
                  "hover:border-white/40 hover:text-white",
                  "peer-checked:border-white/90 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-gold-soft",
                )}
              >
                {topic}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.name} className="block">
            <span className={labelClass}>{f.label}</span>
            <input
              name={f.name}
              type={f.type ?? "text"}
              placeholder={f.placeholder}
              required={f.required}
              autoComplete={f.autoComplete}
              className={fieldClass}
            />
          </label>
        ))}
        <label className="block sm:col-span-2">
          <span className={labelClass}>Message</span>
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Tell us a little about what you need."
            className={cn(fieldClass, "resize-none")}
          />
        </label>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-xs text-white/50">
          By sending, you agree to our{" "}
          <Link href="/privacy-policy" className="underline-offset-2 hover:text-white hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center self-start rounded-full border-[1.5px] border-gold-soft bg-[#050505] px-[30px] py-[14px] font-display text-sm font-medium uppercase tracking-[0.06em] text-white transition-colors hover:bg-gold-soft hover:text-black sm:self-auto"
        >
          Send message
        </button>
      </div>

      <p role="status" className="mt-4 font-body text-sm text-gold-soft">
        {sent && `Your email app should open with the message ready to send to ${contactEmail}.`}
      </p>
    </form>
  );
}
