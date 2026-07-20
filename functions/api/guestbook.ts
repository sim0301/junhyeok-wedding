// Cloudflare Pages Functions types are provided by @cloudflare/workers-types
interface Env {
  db?: D1Database;
  my_wedding?: D1Database;
}

interface GuestbookEntry {
  id: string;
  author: string;
  message: string;
  date: string;
}

const getDb = (env: Env): D1Database | undefined => env.db || env.my_wedding;

// GET: 방명록 목록 조회
export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const db = getDb(context.env);
    if (!db) {
      return new Response(JSON.stringify([]), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    await db
      .prepare(
        "CREATE TABLE IF NOT EXISTS guestbook (id TEXT PRIMARY KEY, author TEXT NOT NULL, message TEXT NOT NULL, password TEXT NOT NULL, date TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)"
      )
      .run();

    const { results } = await db
      .prepare(
        "SELECT id, author, message, date FROM guestbook ORDER BY created_at DESC"
      )
      .all();

    return new Response(JSON.stringify(results || []), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error fetching guestbook entries:", error);
    return new Response(JSON.stringify([]), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

// POST: 새 방명록 작성
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = (await context.request.json()) as {
      author: string;
      message: string;
      password: string;
    };

    if (!body.author || !body.message || !body.password) {
      return new Response(
        JSON.stringify({ error: "Author, message, and password are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const db = getDb(context.env);
    if (!db) {
      return new Response(JSON.stringify({ error: "Database not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    await db
      .prepare(
        "CREATE TABLE IF NOT EXISTS guestbook (id TEXT PRIMARY KEY, author TEXT NOT NULL, message TEXT NOT NULL, password TEXT NOT NULL, date TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)"
      )
      .run();

    const id = crypto.randomUUID();
    const date = new Date().toISOString().split("T")[0];

    await db
      .prepare(
        "INSERT INTO guestbook (id, author, message, password, date) VALUES (?, ?, ?, ?, ?)"
      )
      .bind(id, body.author, body.message, body.password, date)
      .run();

    const newEntry: GuestbookEntry = {
      id,
      author: body.author,
      message: body.message,
      date,
    };

    return new Response(JSON.stringify(newEntry), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error creating guestbook entry:", error);
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: `Failed to create guestbook entry: ${message}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// OPTIONS: CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
