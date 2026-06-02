# Estapar B2B Portal

Portal web B2B para gerenciamento de serviços de estacionamento, permitindo visualizar garagens, configurar planos de mensalidade e gerenciar credenciados.

---

## Tecnologias

- **React 19** com TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilização
- **React Router DOM** para navegação
- **@ebay/nice-modal-react** para gerenciamento de modais
- **@heroicons/react** para ícones
- **focus-trap-react** para acessibilidade em modais
- **json-server-auth** como API mock
- **bcryptjs** para hash de senhas
- **Jest** + **Testing Library** para testes unitários
- **Playwright** para testes E2E

---

## Pré-requisitos

- React.js 19+
- Node.js 20+
- npm 9+

---

## Instalação

```bash
npm install
```

---

## Scripts

| Comando                 | Descrição                             |
| ----------------------- | ------------------------------------- |
| `npm run dev`           | Inicia Vite e json-server em paralelo |
| `npm run build`         | Gera o build de produção              |
| `npm run test`          | Executa os testes unitários com Jest  |
| `npm run test:coverage` | Gera um relatório de cobertura        |
| `npm run test:watch   ` | Executa os testes em modo watch       |

---

## Arquitetura

### Autenticação

O fluxo de autenticação utiliza `localStorage` para persistência do token e do usuário. O `AuthContext` expõe `login`, `logout` e `user` para toda a aplicação. Rotas protegidas são controladas pelo componente `PrivateRoute`.

```
Login → POST /api/login → token + user salvos no localStorage → redirect /home
F5   → getStoredUser() lê localStorage → usuário já autenticado
Logout → limpa localStorage → redirect /login
```

### Modais

Os modais são registrados centralmente em `src/modals/index.ts` via `NiceModal.register` e podem ser abertos de qualquer ponto da aplicação via `NiceModal.show(MODAL_IDS.NOME, props)`.

```ts
// Exemplo de uso
NiceModal.show(MODAL_IDS.CONFIRMATION, {
  title: 'Excluir plano',
  confirmLabel: 'Excluir',
  variant: 'danger',
  onConfirm: () => deletePlan(id),
});
```

### Paginação e filtros

A listagem de garagens suporta paginação server-side e filtros por `isDigital` e busca por nome. O debounce de 400ms é aplicado no campo de busca para evitar requisições a cada keystroke.

---

## API Mock

O projeto utiliza `json-server` como API mock. O arquivo `db.json` na raiz contém os dados iniciais.

### Endpoints disponíveis

| Método | Endpoint                  | Descrição               |
| ------ | ------------------------- | ----------------------- |
| `POST` | `/api/login`              | Autenticação            |
| `POST` | `/api/register`           | Cadastro de usuário     |
| `GET`  | `/api/garages`            | Listagem de garagens    |
| `GET`  | `/api/garages/:id`        | Detalhes de uma garagem |
| `POST` | `/api/garages`            | Criação de garagem      |
| `PUT`  | `/api/garages/:id`        | Edição de garagem       |
| `GET`  | `/api/plans?garageId=:id` | Planos de uma garagem   |
| `POST` | `/api/plans`              | Criação de plano        |
| `PUT`  | `/api/plans/:id`          | Edição de plano         |
| `GET`  | `/api/users`              | Listagem de usuários    |

### Parâmetros de paginação e filtro

```
GET /api/garages?_page=1&_limit=10&isDigital=true&name_like=acyr
```

---

## Testes

### Unitários (Jest)

```bash
npm run test
```

Os testes cobrem services, hooks, e componentes. O arquivo de setup está em `src/setupTests.ts`.

Configuração em `jest.config.ts` com `ts-jest` e `jest-environment-jsdom`. Arquivo `tsconfig.test.json` separado com `module: CommonJS` para compatibilidade com Jest.

### E2E (Playwright)

```bash
npm run dev:mock      # em um terminal
npm run test:e2e      # em outro terminal
```

Os testes E2E ficam em `e2e/` e cobrem fluxos completos em browser real, incluindo responsividade via `setViewportSize`.

---

## CI/CD

O projeto conta com um workflow de GitHub Actions configurado em `.github/workflows/`:

- **`unit-tests.yml`** — executa os testes unitários com Jest a cada Pull Request

---

## Acessibilidade

- Navegação por teclado com `focus-trap-react` nos modais
- `aria-label`, `aria-modal`, `aria-expanded`, `aria-haspopup` e `role` aplicados corretamente
- Textos ocultos via `sr-only` para leitores de tela
- Indicadores de foco visíveis via `focus-visible`
- Contraste e semântica HTML respeitados

---

## Credenciais de acesso (desenvolvimento)

| E-mail            | Senha    | Perfil |
| ----------------- | -------- | ------ |
| `ana@email.com`   | `123456` | admin  |
| `bruno@email.com` | `123456` | user   |
