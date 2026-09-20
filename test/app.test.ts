import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp();

describe("hello-web-app API", () => {
  it("reports health", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(typeof res.body.uptime).toBe("number");
  });

  it("greets the default World", async () => {
    const res = await request(app).get("/api/hello");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Hello, World!");
  });

  it("greets a provided name", async () => {
    const res = await request(app).get("/api/hello").query({ name: "Ada" });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Hello, Ada!");
  });

  it("echoes posted JSON", async () => {
    const payload = { foo: "bar", n: 42 };
    const res = await request(app).post("/api/echo").send(payload);
    expect(res.status).toBe(200);
    expect(res.body.youSent).toEqual(payload);
  });

  it("serves the static index page", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("Hello Web App");
  });
});
