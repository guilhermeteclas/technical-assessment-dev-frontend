import { Head } from "$fresh/runtime.ts";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About - OZtest</title>
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">About - OZtest</h1>
        </div>
        <div className="mt-6 w-full max-w-md">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-primary">Project Links</h2>
              <ul className="list-disc pl-4">
                <li>
                  <a
                    href="/dash"
                    className="text-blue-500 hover:underline"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="http://localhost:3333/api-docs/"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/guilhermeteclas/technical-assessment-dev-main"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/guilhermeteclas/"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                  >
                    Contact me
                  </a>
                </li>
              </ul>
            </div>
            <div class="flex flex-col items-center text-center pb-4">
            <iframe
                width="425"
                height="350"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-52.9153060913086%2C-27.109256228303348%2C-52.24239349365235%2C-26.840920425187463&amp;layer=mapnik"
                style="border: 1px solid black"
              >
              </iframe>
              <br />
              <small>
                <a href="https://www.openstreetmap.org/#map=12/-26.9752/-52.5788" target="_blank">
                  Ver mapa ampliado
                </a>
              </small>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
