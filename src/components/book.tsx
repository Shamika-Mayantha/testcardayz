"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICE_OPTIONS, SITE } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

export function Book() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [service, setService] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const vehicle = String(data.get("vehicle") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !phone || !vehicle || !service) {
      setStatus("error");
      setError("Name, phone, vehicle, and a system are required.");
      return;
    }

    setStatus("submitting");
    setError("");
    await new Promise((r) => setTimeout(r, 700));
    window.localStorage.setItem(
      "cd-last-booking",
      JSON.stringify({ name, phone, vehicle, service, message, at: Date.now() })
    );
    setStatus("success");
  }

  return (
    <section id="book" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-[11px] tracking-[0.4em] text-cyan-300">
            05 — TRANSMIT
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            Book the bay
          </h2>
          <p className="mt-4 text-white/70">
            Drop the essentials. We confirm on the official Facebook page —
            that is the live channel for CAR DAYZ LK. No mystery numbers, no
            fake hotlines.
          </p>
          <a
            href={SITE.facebook}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/40 bg-fuchsia-400/10 px-4 py-2 font-display text-xs tracking-[0.2em] text-fuchsia-200 hover:bg-fuchsia-400/20"
          >
            <Radio className="size-3.5" />
            OPEN FACEBOOK PAGE
          </a>
          <p className="mt-6 font-mono text-[11px] tracking-wide text-white/45">
            {SITE.hours}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-cyan-300/25 bg-black/40 p-5 shadow-[0_0_60px_rgba(34,240,255,0.08)] backdrop-blur-xl sm:p-8"
        >
          {status === "success" ? (
            <div className="flex min-h-72 flex-col items-start justify-center">
              <CheckCircle2 className="size-10 text-cyan-300" />
              <h3 className="font-display mt-4 text-2xl tracking-widest">
                Signal locked
              </h3>
              <p className="mt-3 max-w-md text-white/70">
                Your request is saved in this browser. Message the same details
                on Facebook Messenger so the studio can confirm a date.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  nativeButton={false}
                  render={
                    <a href={SITE.facebook} target="_blank" rel="noreferrer" />
                  }
                >
                  Continue on Facebook
                </Button>
                <Button variant="outline" onClick={() => setStatus("idle")}>
                  Send another
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    className="h-10 bg-black/40"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="phone">Phone / WhatsApp</Label>
                  <Input
                    id="phone"
                    name="phone"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="07X XXX XXXX"
                    className="h-10 bg-black/40"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="vehicle">Vehicle</Label>
                  <Input
                    id="vehicle"
                    name="vehicle"
                    placeholder="e.g. 2018 Axio, Civic FK7"
                    className="h-10 bg-black/40"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label>System</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger className="h-10 w-full bg-black/40">
                      <SelectValue placeholder="Choose a system" />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false} align="start">
                      {SERVICE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="message">Notes</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Finish, coverage, deadline, photos you already have…"
                  className="min-h-28 bg-black/40"
                />
              </div>
              {status === "error" ? (
                <p role="alert" className="text-sm text-red-300">
                  {error}
                </p>
              ) : null}
              <Button
                type="submit"
                disabled={status === "submitting"}
                className="font-display h-11 tracking-[0.22em]"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    TRANSMITTING
                  </>
                ) : (
                  "SEND REQUEST"
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
