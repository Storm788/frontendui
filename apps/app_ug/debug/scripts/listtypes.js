import { parse, Kind } from 'https://cdn.skypack.dev/graphql';

const GQLENDPOINT = '/api/gql';
const SDL_QUERY   = 'query GetSDL { _service { sdl } }';

// Recursively peel off NON_NULL / LIST wrappers until NamedType
function unwrap(type) {
  if (!type) return null;
  if (
    type.kind === Kind.NON_NULL_TYPE ||
    type.kind === Kind.LIST_TYPE
  ) {
    return unwrap(type.type);
  }
  // must be NamedTypeNode
  return type;
}

// Returns an array of unique return-type names for all Query fields
// that have zero arguments
function getZeroArgReturnTypes(doc) {
  const queryDef = doc.definitions.find(
    d => d.kind === Kind.OBJECT_TYPE_DEFINITION && d.name.value === 'Query'
  );
  if (!queryDef || !queryDef.fields) {
    return [];
  }

  return Array.from(new Set(
    queryDef.fields
      // keep fields with zero args OR all args are optional
      .filter(f => {
        const args = f.arguments || [];
        return args.length === 0
            || args.every(arg => arg.type.kind !== Kind.NON_NULL_TYPE);
      })
      // unwrap to the NamedType
      .map(f => {
        const named = unwrap(f.type);
        return named && named.name ? named.name.value : null;
      })
      .filter(Boolean)  // drop nulls/empty
  ));
}

async function bootstrap() {
  // 1) fetch the SDL
  const resp = await fetch(GQLENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: SDL_QUERY })
  });
  const { data, errors } = await resp.json();
  if (errors) {
    console.error('SDL fetch errors:', errors);
    return;
  }

  // 2) parse into AST
  const doc = parse(data._service.sdl, { noLocation: true });

  // 3) compute the zero-arg return types
  const types = getZeroArgReturnTypes(doc);

  // 4) render into UL
  const ul = document.getElementById('type-list');
  types.forEach(typeName => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = typeName;
    ul.appendChild(li);
  });
}

bootstrap().catch(console.error);