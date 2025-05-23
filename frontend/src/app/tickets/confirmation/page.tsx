import { Suspense } from "react";
import ConfirmationContent from "./ConfirmationContent";

export const dynamic = "force-dynamic";

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">
              Verifying payment details, please wait...
            </p>
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
