import PartySocket from "partysocket";

class Party {
  connection: PartySocket | null = null;

  init({ org, token }: { org: string; token: string }) {
    if (this.connection) return this.connection;
    this.connection = new PartySocket({
      host: "http://127.0.0.1:1999",
      room: org,
      query: {
        token,
      },
    });
    return this.connection;
  }
}

export const party = new Party();
