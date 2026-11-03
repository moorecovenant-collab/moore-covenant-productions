/**
 * A tiny stand-in for the Supabase query builder. Every chained call returns the
 * same object; awaiting it (or calling maybeSingle/single) resolves with the
 * result registered for that table. Enough for the read paths the tests exercise.
 */
export type TableResult = { data: unknown; error?: { code?: string; message: string } | null };

export function makeFakeSupabase(tables: Record<string, TableResult | ((op: string) => TableResult)>) {
  const calls: { table: string; ops: string[] }[] = [];
  const admin = () => ({
    from(table: string) {
      const ops: string[] = [];
      calls.push({ table, ops });
      const resolve = () => {
        const t = tables[table];
        const r = typeof t === "function" ? t(ops[0] ?? "select") : t;
        return r ?? { data: null, error: null };
      };
      const chain: Record<string, unknown> = {};
      for (const m of ["select", "eq", "neq", "gte", "lte", "in", "order", "insert", "update", "delete", "upsert", "limit"]) {
        chain[m] = (..._args: unknown[]) => {
          ops.push(m);
          return chain;
        };
      }
      chain.maybeSingle = async () => resolve();
      chain.single = async () => resolve();
      chain.then = (onOk: (v: TableResult) => unknown, onErr?: (e: unknown) => unknown) =>
        Promise.resolve(resolve()).then(onOk, onErr);
      return chain;
    },
  });
  return { admin, calls };
}
