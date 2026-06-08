import { redirect } from "next/navigation";

export default function Page() {
  // Redirect root to the landing route used in this project
  redirect("/routes/landing");
}
