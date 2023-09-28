import type { Request } from "partykit/server";

export const getParamsFromRequest = async (request: Request) => {
  const url = new URL(request.url);
  let usecase;
  let payload;
  if (request.method === "GET") {
    usecase = url.searchParams.get("usecase");
    payload = url.searchParams.get("payload");
    try {
      payload = JSON.parse(payload as string);
    } catch (error) {
      console.log(error);
    }
  } else {
    const json = await request.json<{
      usecase: string;
      payload: any;
    }>();
    usecase = json.usecase;
    payload = json.payload;
  }
  return { usecase, payload };
};
