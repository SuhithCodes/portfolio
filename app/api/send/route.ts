import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_ETmE4CPE_Np6ptAfbm9KWfjcFqqe4XPxa");

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["suhithghanathay@gmail.com"],
      subject: `Portfolio Contact: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0; background: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>

          <div style="margin-top: 20px;">
            <h3 style="color: #444;">Message:</h3>
            <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px; line-height: 1.5;">
              ${message}
            </p>
          </div>

          <div style="margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
            <p>This email was sent from your portfolio website's contact form.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
