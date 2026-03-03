import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen bg-[##0A0A0B] flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#F2F2F4] mb-6">
            Inventory management
          </h1>
          <p className="text-x1 text-[#C8C8CC] max-w-2x1 mb-6">
            Streamline your inventory tracking with our powerful, easy-to-use
            management system. Track products, monitor stock levels, and gain
            valuable insights.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-in" className="bg-[#141415] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6B6B70] transition-colors">
              Sign In
            </Link>

            <Link href="#" className="bg-white text-[#232325] px-8 py-3 rounded-lg font-semibold border-2 border-[#232325] hover:bg-purple-50 transition-colors">
              Lean more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}