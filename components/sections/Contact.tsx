import React from "react";
import { motion } from "framer-motion";
import { ContactInfo, ContactForm } from "@/components/contact";
import contactData from "@/data/contact.json";

export function ContactSection() {
  return (
    <div className="container py-12 min-h-fit">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-primary">Get In</span>{" "}
          <span className="text-secondary">Touch</span>
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
          Interested in discussing internship or full-time opportunities? Feel
          free to reach out and I'll get back to you within 24 hours.
        </p>
      </motion.div>

      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8">
        <ContactInfo data={contactData.contactInfo} />
        <ContactForm formFields={contactData.formFields} />
      </div>
    </div>
  );
}
