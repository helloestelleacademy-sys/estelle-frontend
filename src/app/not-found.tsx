import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white text-center px-4">
            <div className="space-y-6 max-w-md">
                {/* Abstract/Glassmorphic Element */}
                <div className="relative mx-auto w-32 h-32 mb-8">
                    <div className="absolute inset-0 bg-[#7852A9] rounded-full opacity-20 blur-xl animate-pulse"></div>
                    <div className="relative flex items-center justify-center w-full h-full bg-white rounded-full border-2 border-[#7852A9]/10 shadow-xl">
                        <span className="text-5xl font-bold text-[#7852A9]">404</span>
                    </div>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Page not found
                </h1>

                <p className="text-lg text-gray-500">
                    Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link href="/">
                        <Button variant="outline" className="w-full sm:w-auto border-[#7852A9] text-[#7852A9] hover:bg-[#7852A9] hover:text-white transition-colors">
                            Back Home
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button className="w-full sm:w-auto bg-[#7852A9] hover:bg-[#5e3e87] gap-2">
                            Go to Dashboard <MoveRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Footer Branding */}
            <div className="absolute bottom-10 text-xs text-gray-300 uppercase tracking-widest">
                Estelle Learning
            </div>
        </div>
    )
}
