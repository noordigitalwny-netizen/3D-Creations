export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "6e8ee156-1d13-4e7e-a9e8-6a65c1952042";

export interface Web3FormsResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export async function submitToWeb3Forms(data: Record<string, any>): Promise<Web3FormsResponse> {
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    ...data,
  };

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (res.ok && result.success) {
      return { success: true, message: result.message || "Message sent successfully!" };
    } else {
      return { success: false, message: result.message || "Submission failed. Please try again." };
    }
  } catch (err: any) {
    return { success: false, message: err?.message || "Network error. Please try again." };
  }
}
