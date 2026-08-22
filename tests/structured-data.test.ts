import test from "node:test";
import assert from "node:assert/strict";
import { buildStructuredData } from "../lib/structured-data";
import { CONTACT, SITE_URL } from "../lib/site-profile";

type Node = Record<string, any>;

const graph = () => buildStructuredData()["@graph"] as Node[];
const nodeOfType = (type: string) =>
  graph().find((node) => node["@type"] === type) as Node;

test("the graph contains Organization, Person and WebSite nodes", () => {
  for (const type of ["Organization", "Person", "WebSite"]) {
    assert.ok(nodeOfType(type), `missing ${type} node`);
  }
});

test("Organization declares a PostalAddress", () => {
  const address = nodeOfType("Organization").address;

  assert.equal(address["@type"], "PostalAddress");
  assert.equal(address.addressLocality, CONTACT.addressLocality);
  assert.equal(address.addressCountry, CONTACT.addressCountry);
  assert.ok(address.addressRegion);
});

test("Organization declares contactPoints with a type and a channel", () => {
  const contactPoints = nodeOfType("Organization").contactPoint as Node[];

  assert.ok(Array.isArray(contactPoints) && contactPoints.length > 0);
  for (const point of contactPoints) {
    assert.equal(point["@type"], "ContactPoint");
    assert.ok(point.contactType, "contactType is required");
    assert.equal(point.email, CONTACT.email);
    assert.equal(point.telephone, CONTACT.phone);
  }
});

test("Organization is identifiable and linked to its profiles", () => {
  const organization = nodeOfType("Organization");

  assert.equal(organization.url, SITE_URL);
  assert.ok(organization.name);
  assert.ok(organization.logo?.url?.startsWith(SITE_URL));
  assert.ok(
    (organization.sameAs as string[]).some((url) => url.includes("github.com"))
  );
});

test("Person and Organization cross-reference by @id", () => {
  const organization = nodeOfType("Organization");
  const person = nodeOfType("Person");

  assert.equal(person.worksFor["@id"], organization["@id"]);
  assert.equal(organization.founder["@id"], person["@id"]);
});

test("Person also carries contact details and an address", () => {
  const person = nodeOfType("Person");

  assert.equal(person.email, CONTACT.email);
  assert.equal(person.address["@type"], "PostalAddress");
  assert.ok(Array.isArray(person.contactPoint));
});

test("the document is JSON-serialisable with the schema.org context", () => {
  const document = buildStructuredData();

  assert.equal(document["@context"], "https://schema.org");
  assert.doesNotThrow(() => JSON.parse(JSON.stringify(document)));
});
