import { NextRequest, NextResponse } from "next/server";
import { callbackFormSchema } from "@/lib/validation";
import { sendCallbackRequestEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = callbackFormSchema.parse(body);

    // Send email to admin
    await sendCallbackRequestEmail(
      process.env.ADMIN_EMAIL || "admin@chainsupport.com",
      validatedData
    );

    return NextResponse.json(
      { message: "Callback request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing callback:", error);
    return NextResponse.json(
      { error: "Failed to process callback request" },
      { status: 500 }
    );
  }
}
