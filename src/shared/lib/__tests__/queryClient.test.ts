import { QueryClient } from "@tanstack/react-query";

import { queryClient } from "../queryClient";

describe("queryClient", () => {
  it("exports a QueryClient instance", () => {
    expect(queryClient).toBeInstanceOf(QueryClient);
  });
});
