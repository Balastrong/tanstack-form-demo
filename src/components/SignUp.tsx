import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export const SignUp = () => {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Creating a form with <span className="font-bold">@DevLeonardo</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" />
          </div>
          <div>
            <Label htmlFor="passowrd">Passowrd</Label>
            <Input id="password" type="password" />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset</Button>
        <Button>Sign Up</Button>
      </CardFooter>
    </Card>
  );
};
