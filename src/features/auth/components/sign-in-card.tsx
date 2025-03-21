import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import {TriangleAlert} from "lucide-react";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onPasswordSignIn = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    signIn("password",{ email, password, flow: "signIn" })
    .catch(() => {
setError("Invalid email or password")
    })
    .finally(() => {
      setPending(false);
    });
     
  }

  const onProviderSignIn = (value: "github" | "google") =>{
    setPending(true);
    signIn(value)
    .finally(() => setPending(false));
  }

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue...</CardTitle>
        <CardDescription>
          Use your email on another service to login
        </CardDescription>
      </CardHeader>
      {!!error &&(
        <div className="flex items-center rounded-md p-3 bg-destructive/15 gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4"/>
          <p>{error}</p>
        </div>
      )}

      <CardContent className=" pb-0 px-0 space-y-5">
        <form onSubmit={onPasswordSignIn} className=" space-y-1.5">
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          {/* Google */}
          <Button
            disabled={pending}
            onClick={() => {onProviderSignIn("google")}}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="mr-1 size-5" />
            Continue with Google
          </Button>
          {/* Github */}
          <Button
            disabled={pending}
            onClick={() => {onProviderSignIn("github")}}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className=" mr-1 size-5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setState("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
