"use server";

export interface ContactFormState {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const projectScope = formData.get("projectScope") as string;

  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill out all required fields (name, email, message).",
    };
  }

  // Log lead submission (In production with RESEND_API_KEY, emails the team)
  console.log("Inbound Lead Submission:", { name, email, projectScope, message });

  // Simulate network dispatch delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    message: `Thank you ${name}! We've received your inquiry and will reach out within 24 hours.`,
  };
}
