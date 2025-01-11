import ClientComponent from "@/components/ClientComponent";
import { fetchAccessToken } from "@humeai/voice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';

export default async function Home() {
  const accessToken = await fetchAccessToken({
    apiKey: process.env.NEXT_PUBLIC_HUME_API_KEY,
    secretKey: process.env.NEXT_PUBLIC_HUME_SECRET_KEY,
  });

  if (!accessToken) {
    throw new Error();
  }

  return (
    <div>
      <ClientComponent accessToken={accessToken} />
      <div className="absolute top-4 right-8">
        <div className="relative">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-antenna-primary/20 animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-antenna-primary/30 shadow-lg">
                <Image
                  src="/antenna.png"
                  alt="Antenna Logo"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
            <h2 className="text-lg font-semibold text-antenna-primary">
              和我一起头脑风暴你的项目想法吧！
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
