import { API_ENDPOINTS, API_POLICY, type ApiParameter } from "./api-catalog";
import { CONTACT, OWNER, SITE_NAME, SITE_URL, absoluteUrl } from "./site-profile";

/**
 * Builds the OpenAPI 3.1 document for the public read-only API from the same
 * catalogue the /developers page renders, so the spec cannot drift from the
 * documentation an agent reads next to it.
 */

type OpenApiParameter = {
  name: string;
  in: "query" | "path";
  required: boolean;
  description: string;
  schema: ApiParameter["schema"];
  example?: string;
};

const toParameters = (
  params: ApiParameter[] | undefined,
  location: "query" | "path"
): OpenApiParameter[] =>
  (params ?? []).map((param) => ({
    name: param.name,
    in: location,
    required: location === "path",
    description: param.description,
    schema: param.schema,
    ...(param.example ? { example: param.example } : {}),
  }));

export function buildOpenApiDocument() {
  const paths: Record<string, unknown> = {};

  for (const endpoint of API_ENDPOINTS) {
    const parameters = [
      ...toParameters(endpoint.pathParams, "path"),
      ...toParameters(endpoint.query, "query"),
    ];

    paths[endpoint.path] = {
      get: {
        operationId: endpoint.operationId,
        summary: endpoint.summary,
        description: endpoint.description,
        ...(parameters.length ? { parameters } : {}),
        responses: {
          "200": {
            description: "Success.",
            content: {
              "application/json": {
                schema: { type: "object", additionalProperties: true },
              },
            },
          },
          "404": {
            description: "No resource matches the request.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { error: { type: "string" } },
                },
              },
            },
          },
        },
      },
    };
  }

  return {
    openapi: "3.1.0",
    info: {
      title: `${SITE_NAME} public API`,
      version: "1.0.0",
      summary: `Read-only API behind ${SITE_URL}, the portfolio of ${OWNER.name}.`,
      description: [
        `Public, read-only endpoints exposing the portfolio, work history, education, events, products, open source repositories and blog of ${OWNER.name} (${OWNER.nameFa}).`,
        "",
        `Authentication: ${API_POLICY.authentication}`,
        `Writes: ${API_POLICY.writes}`,
        `Rate limits: ${API_POLICY.rateLimit}`,
        `Formats: ${API_POLICY.formats}`,
      ].join("\n"),
      contact: {
        name: OWNER.name,
        email: CONTACT.email,
        url: absoluteUrl("/contact"),
      },
      license: { name: "MIT", identifier: "MIT" },
    },
    servers: [{ url: SITE_URL, description: "Production" }],
    externalDocs: {
      description: `${SITE_NAME} developer resources`,
      url: absoluteUrl("/developers"),
    },
    paths,
  };
}
