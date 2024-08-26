import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const ReactiveForm = () => {
  const [count, setCount] = useState(0);
  const form = useForm({
    defaultValues: {
      firstName: "",
    },
  });

  // OPTION 1: Reactivity with form.useStore
  // const firstName = form.useStore((state) => state.values.firstName);

  console.log("Form Rerender");

  return (
    <div>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Reactive values</CardTitle>
          <CardDescription>
            {/* NOTE: This is not reactive, look for options 1 and 2 */}
            Hello, my name is:{" "}
            <span className="font-bold">{form.state.values.firstName}</span>
            {/* 
              // OPTION 2: Reactivity with form.Subscribe
            <form.Subscribe selector={(state) => state.values.firstName}>
                {(firstName) => {
                  console.log("form.Subscribe Rerender");
                  return (
                    <>
                      Hello, my name is:{" "}
                      <span className="font-bold">{firstName}</span>
                    </>
                  );
                }}
              </form.Subscribe> */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="firstName"
              children={(field) => (
                <>
                  <Label htmlFor="username">First Name</Label>
                  <Input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            />
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={form.handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
      <div className="mt-4 flex gap-2 items-center">
        Count: {count}
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => setCount((c) => c + 1)}
        >
          +1
        </Button>
      </div>
    </div>
  );
};
