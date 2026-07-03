import { toast } from "react-hot-toast";

export function showToast(
  message: string,
  type: "success" | "error" | "loading" = "success"
) {
  const options = {
    duration: 4000,
    style: {
      background: "#0F172A",
      color: "#FFFFFF",
      border: "1px solid rgba(59, 130, 246, 0.2)",
      borderRadius: "8px",
    },
  };

  if (type === "success") {
    toast.success(message, options);
  } else if (type === "error") {
    toast.error(message, options);
  } else {
    toast.loading(message, options);
  }
}
