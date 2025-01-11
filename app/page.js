import ClientComponent from "@/components/ClientComponent";
import { fetchAccessToken } from "@humeai/voice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
          <span className="bg-clip-text text-transparent bg-text-gradient text-4xl font-bold animate-glow tracking-wider">
            antenna
          </span>
        </div>
      </div>
    </div>
  );
}
