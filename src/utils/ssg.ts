import { createSSGHelpers, CreateSSGHelpersOptions } from "@trpc/react/ssg";
import { appRouter } from "../server/router/_index";
import { createContext } from "../server/router/_context";
import superjson from "superjson";
import { AnyRouter } from "@trpc/server";

export interface QueriesParams {
    route: AnyRouter['_def']['queries'];
    value: {
        [key: string]: string
    };
}

export default async function prefetchQueries(params: QueriesParams[]): Promise<any> {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: createContext,
    transformer: superjson
});

  for (const data of params) {
    await ssg.prefetchQuery(data.route, data.value);
  }

  return ssg;
}
