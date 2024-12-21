import Login from "../components/Login.tsx";
import { Handlers, type PageProps } from "$fresh/server.ts";

interface Props {
  message: string | null;
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await ctx.render({
      message: null,
    });
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString() ?? "";

    const response = await fetch("http://localhost:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const headers = new Headers();

    if (!response.ok) {
      return ctx.render({
        message: "Invalid login",
      });
    }
    const data = await response.json();
    console.log(data);

    headers.set("location", "/dash");

    return new Response(data, {
      status: 303,
      headers,
    });
  },
};

export default function Home(props: PageProps<Props>) {
  const { message } = props.data;
  return (
    <div class="flex justify-center items-center h-screen">
      <Login />
      {/* <Register /> */}
      <div className="toast">
        {message ? <div className="alert alert-error">{message}</div> : null}
      </div>
    </div>
  );
}
