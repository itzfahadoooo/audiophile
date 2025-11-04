import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center">
      <div className="container text-center py-24">
        <h1 className="text-h1 mb-6">Product Not Found</h1>
        <p className="text-body opacity-60 mb-10">
          Sorry, we couldn&apos;t find the product you&apos;re looking for.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </main>
  );
}