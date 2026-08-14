import { CheckCircle2, ImageUp, X } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  step: number;
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  onError: (message: string) => void;
}

const MAX_BYTES = 8 * 1024 * 1024;

export function UploadDropzone({ title, description, step, value, onChange, onError }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);

  function handleFile(file: File | undefined | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onError("Please upload an image file (PNG, JPG or WebP).");
      return;
    }
    if (file.size > MAX_BYTES) {
      onError("That image is larger than 8MB. Please upload a smaller screenshot.");
      return;
    }
    const reader = new FileReader();
    setProgress(0);
    reader.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
    };
    reader.onerror = () => {
      setProgress(null);
      onError("Could not read that file. Please try again.");
    };
    reader.onload = () => {
      setProgress(100);
      onChange(String(reader.result));
      window.setTimeout(() => setProgress(null), 400);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="soft-card flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">Step {step}</span>
          <h2 className="mt-1 text-base font-semibold sm:text-lg">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {value ? <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-success" /> : null}
      </div>

      <div
        className={`mt-5 flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center transition-all duration-200 sm:p-6 ${
          dragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-surface hover:border-primary/50"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
      >
        {value ? (
          <div className="w-full">
            <img
              src={value}
              alt={`${title} preview`}
              loading="lazy"
              decoding="async"
              className="mx-auto max-h-56 w-auto rounded-lg border border-border object-contain"
            />
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
                Replace
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onChange(null)}>
                <X className="mr-1 h-4 w-4" /> Remove
              </Button>
            </div>
          </div>
        ) : progress !== null ? (
          <div className="w-full max-w-xs">
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Uploading… {progress}%</p>
          </div>
        ) : (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <ImageUp className="h-6 w-6 text-primary" />
            </span>
            <p className="mt-4 text-sm font-medium">Drag &amp; drop your screenshot</p>
            <p className="mt-1 text-xs text-muted-foreground">PNG, JPG or WebP · up to 8MB</p>
            <Button className="mt-4" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
              Choose file
            </Button>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
