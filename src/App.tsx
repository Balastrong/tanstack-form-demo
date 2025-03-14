// import { SignUp } from "@/components/SignUp";
// import { Listeners } from "./components/Listeners";
import Typography from "./components/ui/typography";
import { UserForm } from "./components/UserForm";
// import { UserCard } from "./components/UserCard";
// import { ReactiveForm } from "./components/ReactiveForm";

function App() {
  return (
    <div className="w-full h-full bg-background flex flex-col items-center">
      <Typography
        variant={"h1"}
        className="my-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600"
      >
        TanStack Form Tutorial
      </Typography>
      {/* <SignUp /> */}
      {/* <ReactiveForm /> */}
      {/* <UserCard /> */}
      {/* <Listeners /> */}
      <UserForm />
    </div>
  );
}

export default App;
