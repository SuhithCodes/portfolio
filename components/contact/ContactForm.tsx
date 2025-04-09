import React from "react";
import { Send, User, AtSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface FormFields {
  [key: string]: {
    label: string;
    placeholder: string;
    icon?: string;
  };
}

interface ContactFormProps {
  formFields: FormFields;
}

export function ContactForm({ formFields }: ContactFormProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "User":
        return <User className="h-4 w-4 text-muted-foreground" />;
      case "AtSign":
        return <AtSign className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full md:w-1/2">
      <div className="max-w-md mx-auto md:mr-auto md:ml-0">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(formFields).map(([field, config]) => {
                  if (field === "message") return null;
                  if (field === "subject") return null;

                  return (
                    <div key={field} className="space-y-2">
                      <label
                        htmlFor={field}
                        className="text-sm text-muted-foreground"
                      >
                        {config.label}
                      </label>
                      <div className="relative">
                        {config.icon && (
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            {getIcon(config.icon)}
                          </div>
                        )}
                        <Input
                          id={field}
                          name={field}
                          type={field === "email" ? "email" : "text"}
                          value={formData[field as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={config.placeholder}
                          className={config.icon ? "pl-10" : ""}
                          required
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm text-muted-foreground"
                >
                  {formFields.subject.label}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={formFields.subject.placeholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm text-muted-foreground"
                >
                  {formFields.message.label}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={formFields.message.placeholder}
                  className="min-h-[120px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
