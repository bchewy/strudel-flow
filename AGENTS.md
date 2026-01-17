# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the React + TypeScript application.
- `src/components/` holds UI building blocks, including `nodes/`, `edges/`, `workflow/`, and `ui/` (shadcn/ui).
- `src/hooks/` contains custom hooks, `src/store/` holds Zustand state, and `src/lib/` groups Strudel/graph utilities.
- `src/data/` stores static data and theme CSS, `src/types/` holds shared types.
- `public/` is for static assets (e.g., `public/favicon.ico`, `public/strudel-flow-og.png`).
- Entry points are `index.html` and `src/main.tsx`; Vite config lives in `vite.config.js`.

## Build, Test, and Development Commands
Use `pnpm` (see `package.json`), though npm/yarn/bun equivalents work.

- `pnpm dev` — start the Vite dev server with HMR.
- `pnpm build` — run `tsc` typecheck, then build to `dist/`.
- `pnpm preview` — serve the production build locally.
- `pnpm lint` — run ESLint over `src/`.

## Coding Style & Naming Conventions
- TypeScript is in strict mode; prefer explicit typing when inference is unclear.
- Formatting follows Prettier: 2-space indentation, single quotes, semicolons.
- Filenames are kebab-case; hooks use `use-*.tsx`, nodes often use `*-node.tsx`.
- Import from `src` via the `@/` alias (e.g., `@/components/workflow`).

## Testing Guidelines
- No automated test framework or coverage target is configured (`package.json` has no `test` script).
- Validate changes with `pnpm lint` and `pnpm build` until tests are added.

## Commit & Pull Request Guidelines
- Recent commits mostly follow Conventional Commits (e.g., `feat: ...`, `fix(scope): ...`, `chore(deps): ...`).
- PRs should include a concise summary, testing notes (e.g., `pnpm lint`, `pnpm build`), and screenshots/GIFs for UI changes. Link issues when applicable.
