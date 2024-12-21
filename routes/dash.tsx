import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

interface Data {
  rows: Row[];
  rowsUsers: Row[];
  rowsRegions: Row[];
  rowsSearch: Row[];
  rowsNearby: Row[];
  total: number;
  lat: string;
  lon: string;
  max: string;
  excludeId: string;
}

interface Row {
  _id: string;
  name: string;
  email: string;
  address: string;
  coordinates: CoordinatesObject;
  user: string;
}

interface CoordinatesObject {
  type: string;
  coordinates: number[][][];
}

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const lat = url.searchParams.get("latitude") || "";
    const lon = url.searchParams.get("longitude") || "";
    const max = url.searchParams.get("max") || "";
    const excludeId = url.searchParams.get("excludeId") || "";
    const form = url.searchParams.get("form") || "";
    let rowsSearch;
    let rowsNearby;


    if (form == "search") {
      const url =
        `http://localhost:3333/withinPoint?latitude=${lat}&longitude=${lon}`;

      const resp = await fetch(url);
      rowsSearch = await resp.json() as Row[];
    } else if (form == "nearby") {
      const excludeUser = excludeId != "";
      const url =
        `http://localhost:3333/nearby?latitude=${lat}&longitude=${lon}&maxDistance=${max}&userId=${excludeId}&exclude=${excludeUser}`;

      const resp = await fetch(url);
      rowsNearby = await resp.json() as Row[];
    }

    const responseUsers = await fetch("http://localhost:3333/users");
    const responseRegions = await fetch("http://localhost:3333/regions");
    const { rows: rowsUsers, total: totalUsers }: Data = await responseUsers
      .json();
    const { rows: rowsRegions, total: totalRegions }: Data =
      await responseRegions.json();


    return ctx.render({
      rowsUsers,
      totalUsers,
      rowsRegions,
      totalRegions,
      rowsSearch,
      rowsNearby,
      lat,
      lon,
      max,
      excludeId,
    },);
  },
};

export default function Dash({ data }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className="flex flex-wrap m-4 card bg-base-300">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl" href="/dash">OZtest</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Search form */}
      <div id="#searchArea" className="flex flex-wrap m-4 card bg-base-300">
        <div class="card-body">
          <h2 className="card-title">
            Search for the region that has the specified point:
          </h2>
          <form className="flex w-full space-x-4" method="get">
            <input
              type="text"
              placeholder="Latitude"
              name="latitude"
              value={data.lat}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Longitude"
              name="longitude"
              value={data.lon}
              className="input input-bordered w-full max-w-xs"
            />
            <button
              className="btn btn-success"
              type="submit"
              name="form"
              value="search"
            >
              Search
            </button>
          </form>
        </div>
        <div class="card-body">
          <h2 className="card-title">
          List regions at a certain distance from a point,with the option to filter regions not belonging to the user who made the request.

          </h2>
          <form className="flex w-full space-x-4" method="get">
            <input
              type="text"
              placeholder="Latitude"
              name="latitude"
              value={data.lat}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Longitude"
              name="longitude"
              value={data.lon}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Max Distance"
              name="max"
              value={data.max}
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Exclude User ID"
              name="excludeId"
              value={data.excludeId}
              className="input input-bordered w-full max-w-xs"
            />
            <button
              className="btn btn-success"
              type="submit"
              name="form"
              value="nearby"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Search results */}

      <main className="flex flex-col justify-start items-center  w-full px-6 py-4">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-neutral">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Coordinates</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data?.rowsSearch) && data.rowsSearch.length > 0
                ? (
                  data.rowsSearch.map((row: Row, rowIndex) => (
                    <tr key={`search-${rowIndex}`} className="border-t">
                      <td className="px-4 py-2">{row.name}</td>
                      <td className="px-4 py-2 break-words">
                        {Array.isArray(row.coordinates?.coordinates) &&
                          row.coordinates.coordinates.map((
                            coordinateSet,
                            index,
                          ) => (
                            <div
                              key={`search-coordinates-${index}`}
                              className="collapse"
                            >
                              <input type="checkbox" />
                              <div
                                className="collapse-title text-xl font-medium"
                                title="Ver"
                              >
                                <span className="badge badge-info gap-2">
                                  {row.coordinates.type}
                                </span>
                              </div>
                              <div className="collapse-content">
                                {coordinateSet.map((value, subIndex) => (
                                  <div
                                    key={`search-coordinate-${subIndex}`}
                                    className="bg-neutral mb-4 p-2"
                                  >
                                    Latitude: {value[0]} <br />
                                    Longitude: {value[1]}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                      </td>
                    </tr>
                  ))
                )
                : (
                  <tr>
                    <td>
                    </td>
                  </tr>
                )}

              {Array.isArray(data?.rowsNearby) && data.rowsNearby.length > 0
                ? (
                  data.rowsNearby.map((row: Row, rowIndex) => (
                    <tr key={`nearby-${rowIndex}`} className="border-t">
                      <td className="px-4 py-2">{row.name}</td>
                      <td className="px-4 py-2 break-words">
                        {Array.isArray(row.coordinates?.coordinates) &&
                          row.coordinates.coordinates.map((
                            coordinateSet,
                            index,
                          ) => (
                            <div
                              key={`nearby-coordinates-${index}`}
                              className="collapse"
                            >
                              <input type="checkbox" />
                              <div
                                className="collapse-title text-xl font-medium"
                                title="Ver"
                              >
                                <span className="badge badge-info gap-2">
                                  {row.coordinates.type}
                                </span>
                              </div>
                              <div className="collapse-content">
                                {coordinateSet.map((value, subIndex) => (
                                  <div
                                    key={`nearby-coordinate-${subIndex}`}
                                    className="bg-neutral mb-4 p-2"
                                  >
                                    Latitude: {value[0]} <br />
                                    Longitude: {value[1]}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                      </td>
                    </tr>
                  ))
                )
                : (
                  <tr>
                    <td>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </main>

      <div className="divider"></div>

      <main
        id="users"
        className="flex flex-col justify-start items-center  w-full px-6 py-4"
      >
        <div className="w-full mb-6 bg-primary-content p-4 rounded-md">
          <h1 className="text-2xl font-semibold text-left">Users</h1>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-neutral">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">E-mail</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Coordinates</th>
              </tr>
            </thead>
            <tbody>
              {data.rowsUsers?.map((row: Row) => (
                <tr key={row._id} className="border-t">
                  <td className="px-4 py-2">{row._id}</td>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.email}</td>
                  <td className="px-4 py-2">{row.address}</td>
                  <td className="px-4 py-2">{row.coordinates.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <div className="divider"></div>

      <main
        id="regions"
        className="flex flex-col justify-start items-center w-full px-6 py-4"
      >
        <div className="w-full mb-6 bg-primary-content p-4 rounded-md">
          <h1 className="text-2xl font-semibold text-left">Regions</h1>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse table-layout-fixed">
            <thead className="bg-neutral">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">User ID</th>
                <th className="px-4 py-2 text-left">Coordinates</th>
              </tr>
            </thead>
            <tbody>
              {data.rowsRegions?.map((row: Row) => (
                <tr key={row._id} className="border-t w-full">
                  <td className="px-4 py-2">{row._id}</td>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.user}</td>
                  <td className="px-4 py-2 break-words">
                    {row.coordinates.coordinates.map((coordinateSet, index) => {
                      return (
                        <div className="collapse">
                          <input type="checkbox" />
                          <div
                            className="collapse-title text-xl font-medium"
                            title="Ver"
                          >
                            <span className="badge badge-info gap-2">
                              {row.coordinates.type}
                            </span>
                          </div>
                          <div key={index} class="collapse-content">
                            {coordinateSet.map((value, subIndex) => {
                              return (
                                <div
                                  key={subIndex}
                                  class="bg-neutral mb-4 p-2"
                                >
                                  Latitude: {value[0]} <br></br>Longitude:{" "}
                                  {value[1]}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
