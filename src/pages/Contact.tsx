import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, type ContactFormData } from "@/lib/schema";

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <div className='min-h-screen bg-background text-foreground font-body py-12 px-4'>
      <div className='max-w-2xl mx-auto bg-card rounded-radius layered-shadow p-8 md:p-12 border border-border'>
        <header className='mb-10 text-center'>
          <h1 className='font-display text-4xl text-primary uppercase tracking-tight mb-2'>
            Get in Touch
          </h1>
          <p className='text-muted-foreground'>
            Have a question? We'd love to hear from you.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <label className='block text-sm font-bold uppercase mb-2'>
              Name
            </label>
            <input
              {...register("name")}
              className='w-full p-3 bg-muted border border-border rounded-md focus:ring-2 focus:ring-primary outline-none transition-all'
              placeholder='Your Name'
            />
            {errors.name && (
              <p className='text-destructive text-xs mt-1'>
                {errors.name.message}
              </p>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-bold uppercase mb-2'>
                Email
              </label>
              <input
                {...register("email")}
                className='w-full p-3 bg-muted border border-border rounded-md focus:ring-2 focus:ring-primary outline-none transition-all'
                placeholder='email@example.com'
              />
              {errors.email && (
                <p className='text-destructive text-xs mt-1'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className='block text-sm font-bold uppercase mb-2'>
                Subject
              </label>
              <input
                {...register("subject")}
                className='w-full p-3 bg-muted border border-border rounded-md focus:ring-2 focus:ring-primary outline-none transition-all'
                placeholder='How can we help?'
              />
              {errors.subject && (
                <p className='text-destructive text-xs mt-1'>
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className='block text-sm font-bold uppercase mb-2'>
              Message
            </label>
            <textarea
              {...register("message")}
              rows={5}
              className='w-full p-3 bg-muted border border-border rounded-md focus:ring-2 focus:ring-primary outline-none transition-all'
              placeholder='Tell us more about your project...'
            />
            {errors.message && (
              <p className='text-destructive text-xs mt-1'>
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            disabled={status === "loading"}
            className='w-full py-4 bg-primary rounded-md text-primary-foreground font-body font-medium uppercase tracking-widest hover:opacity-90 transition-opacity rounded-radius disabled:opacity-50'
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <div className='p-4 bg-green-100 text-green-800 rounded-radius text-center font-bold'>
              Message sent successfully!
            </div>
          )}
          {status === "error" && (
            <div className='p-4 bg-destructive/10 text-destructive rounded-radius text-center font-bold'>
              Something went wrong. Please try again.
            </div>
          )}
        </form>

        <div className='mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground'>
          <p>Zero To Product • Steinweg 19 • Braunschweig</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
