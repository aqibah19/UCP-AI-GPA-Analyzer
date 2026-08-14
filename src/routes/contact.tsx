import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — UCP AI GPA Analyzer" },
      {
        name: "description",
        content: "Report an extraction issue, request a feature or send feedback about the UCP AI GPA Analyzer.",
      },
      { property: "og:title", content: "Contact the UCP AI GPA Analyzer team" },
      { property: "og:description", content: "Feedback, bug reports and feature requests for UCP students." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Please add your name and a message.");
      return;
    }
    const subject = encodeURIComponent(`UCP GPA Analyzer — message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}${email ? ` (${email})` : ""}`);
    window.location.href = `mailto:aqibah50@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email app…");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Contact</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Found a course evaluation the analyzer struggles with? Send the details and it can be improved.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={submit} className="surface-card space-y-5 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ali Raza" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the issue or your suggestion…"
            />
          </div>
          <Button type="submit" size="lg">
            Send message
          </Button>
        </form>

        <aside className="space-y-4">
          <div className="surface-card p-6">
            <Mail className="h-5 w-5 text-accent" />
            <h2 className="mt-4 text-base font-semibold">Email</h2>
            <a href="mailto:aqibah50@gmail.com" className="mt-1 block text-sm text-muted-foreground hover:underline">
              aqibah50@gmail.com
            </a>
          </div>
          <div className="surface-card p-6">
            <MessageSquare className="h-5 w-5 text-accent" />
            <h2 className="mt-4 text-base font-semibold">Response time</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Usually within a few days. Include screenshots where possible.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}