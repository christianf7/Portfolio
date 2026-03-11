export function Footer() {
    return (
        <footer className="py-8 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-zinc-600 text-sm">
                    © {new Date().getFullYear()} Christian Fitzgerald
                </p>
                <p className="text-zinc-700 text-sm font-mono">
                    Built with Next.js + Framer Motion
                </p>
            </div>
        </footer>
    );
}
