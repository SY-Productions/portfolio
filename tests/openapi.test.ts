import test from "node:test";
import assert from "node:assert/strict";
import { buildOpenApiDocument } from "../lib/openapi";
import { API_ENDPOINTS } from "../lib/api-catalog";
import { CONTACT, SITE_URL } from "../lib/site-profile";

type Node = Record<string, any>;

test("declares OpenAPI 3.1 with the production server", () => {
  const doc = buildOpenApiDocument() as Node;

  assert.equal(doc.openapi, "3.1.0");
  assert.deepEqual(doc.servers[0].url, SITE_URL);
  assert.ok(doc.info.title.includes("API"));
  assert.equal(doc.info.contact.email, CONTACT.email);
});

test("documents every catalogued endpoint as a GET operation", () => {
  const paths = buildOpenApiDocument().paths as Node;

  assert.equal(Object.keys(paths).length, API_ENDPOINTS.length);
  for (const endpoint of API_ENDPOINTS) {
    const operation = paths[endpoint.path]?.get;
    assert.ok(operation, `missing operation for ${endpoint.path}`);
    assert.equal(operation.operationId, endpoint.operationId);
    assert.ok(operation.responses["200"]);
  }
});

test("operationIds are unique", () => {
  const ids = API_ENDPOINTS.map((endpoint) => endpoint.operationId);

  assert.equal(new Set(ids).size, ids.length);
});

test("path templates are declared as required path parameters", () => {
  const paths = buildOpenApiDocument().paths as Node;

  for (const [path, item] of Object.entries(paths)) {
    const templated = (path.match(/\{\w+\}/g) ?? []).map((token) =>
      token.slice(1, -1)
    );
    const declared = ((item as Node).get.parameters ?? []) as Node[];

    for (const name of templated) {
      const parameter = declared.find((param) => param.name === name);
      assert.ok(parameter, `${path} does not declare {${name}}`);
      assert.equal(parameter.in, "path");
      assert.equal(parameter.required, true);
    }
  }
});

test("query parameters are optional and typed", () => {
  const paths = buildOpenApiDocument().paths as Node;

  for (const item of Object.values(paths)) {
    for (const parameter of (((item as Node).get.parameters ?? []) as Node[])) {
      if (parameter.in !== "query") continue;
      assert.equal(parameter.required, false);
      assert.ok(parameter.schema?.type, `${parameter.name} has no schema type`);
      assert.ok(parameter.description);
    }
  }
});

test("the document is JSON-serialisable", () => {
  assert.doesNotThrow(() => JSON.parse(JSON.stringify(buildOpenApiDocument())));
});
