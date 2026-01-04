// Type definitions for Supabase Edge Functions
declare global {
  var Deno: {
    env: {
      get(key: string): string | undefined;
    };
    serve: (handler: (req: Request) => Response | Promise<Response>) => void;
  };
}

export {};