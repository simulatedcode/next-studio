
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full bg-studio-50 min-h-screen flex flex-col pt-20 md:pt-28">
            {/* Section Header */}
            <div className="mb-10 px-4 text-center">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-studio-900/10 bg-studio-900/5 px-4 backdrop-blur-md">
                    <span className="h-1 w-2 rounded-full " />
                    <span className="text-xs font-bold uppercase tracking-widest text-studio-899">
                        Simulasi Studio
                    </span>
                </div>
                <h3 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-studio-950">
                    Exploring Screen Printing Process
                </h3>
                <p className="mx-auto max-w-xl md:max-w-2xl text-base md:text-lg ">
                    The traditional screen printing technique through this interactive simulation.
                    Control each layer and watch the process unfold step by step.
                </p>
            </div>

            {/* Frame at bottom, responsive */}
            <div className="mt-auto w-full">
                <div className="mx-auto w-full max-w-2xl bottom-0">
                    <Image
                        src="./frame.svg"
                        alt="Screen printing frame"
                        width={1441}
                        height={1081}
                        className="w-full h-auto dark:invert"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}