import { useRouter } from "next/router";
import qs, { ParseOptions, StringifiableRecord } from "query-string";
import { useCallback } from "react";

export const parseUrlOptions: ParseOptions = {
  parseNumbers: true,
  parseBooleans: true,
  arrayFormat: "bracket",
  arrayFormatSeparator: "|",
};

type LocationBase = { url?: string; query?: StringifiableRecord };

export const useLocation = () => {
  const router = useRouter();

  const push = useCallback(
    ({
      url,
      query,
      replace,
    }: LocationBase & {
      replace?: boolean;
    }) => {
      const newUrl = qs.stringifyUrl(
        { url: url ?? router.pathname, query: query ?? {} },
        parseUrlOptions
      );

      if (replace) router.replace(newUrl);
      else router.push(newUrl);
    },
    []
  );

  const replace = useCallback(
    ({ url, query }: LocationBase) => {
      push({ url, query, replace: true });
    },
    [push]
  );

  return {
    router,
    push,
    replace,
    ...qs.parseUrl(router.asPath, parseUrlOptions),
  };
};
