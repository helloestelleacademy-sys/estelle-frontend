"use client";

import { MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const WAITLIST_URL = "https://tally.so/r/nWL7gv";

function Waitlist() {
    return (
        <div id="waitlist" className="w-full py-20 lg:py-24">
            <div className="container mx-auto">
                <div className="flex text-center justify-center items-center gap-4 flex-col">
                    <Badge className="bg-[#a984dd] hover:bg-[#71519e] px-4 py-1 text-sm">Waitlist</Badge>
                    <div className="flex gap-2 flex-col">
                        <h2 className="text-3xl md:text-5xl max-w-xl text-center">
                            Be the first to know!
                        </h2>
                        <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
                            Turn your story into a legacy-brand. Join the waitlist and get early access the moment we open the doors.
                        </p>
                    </div>
                    <div className="pt-8">
                        <a href={WAITLIST_URL} target="_blank" rel="noopener noreferrer">
                            <Button className="gap-4 rounded-md py-6 px-8 bg-[#7852A9] text-white hover:bg-black transition-colors duration-300">
                                Join the Waitlist <MoveRight className="w-4 h-4" />
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Waitlist;
