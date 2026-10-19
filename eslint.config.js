import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

// Client code (React islands and client scripts in .astro files) must not
// import server code. Type-only imports are erased, so they are allowed.
const NO_SERVER_IMPORTS = {
  group: ["**/server/**"],
  allowTypeImports: true,
  message: "Client code must not import server code (docs/architecture.md).",
};

export default defineConfig(
  globalIgnores([
    "dist/",
    ".astro/",
    "playwright-report/",
    "test-results/",
    "Assets/",
    "docs/",
  ]),

  // Every file: the recommended JS rules, and typescript-eslint with type
  // information.
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Astro components, with the a11y rules (eslint-plugin-astro loads
  // eslint-plugin-jsx-a11y-x for them). astro-eslint-parser can't give
  // typescript-eslint the types of imported .astro files, so .astro files
  // are linted without type information; `astro check` type-checks them.
  astro.configs["flat/recommended"],
  astro.configs["flat/jsx-a11y-recommended"],
  {
    files: ["**/*.astro", "**/*.astro/*.{js,ts}"],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // React islands. The original eslint-plugin-jsx-a11y doesn't support
  // ESLint 10 yet, so the -x fork is used; its config sets no `files`.
  {
    files: ["**/*.tsx"],
    plugins: { "jsx-a11y-x": jsxA11y },
    languageOptions: {
      parserOptions: jsxA11y.configs.recommended.parserOptions,
    },
    rules: jsxA11y.configs.recommended.rules,
  },
  {
    files: ["**/*.tsx"],
    extends: [reactHooks.configs.flat.recommended],
  },

  // Project rules (docs/architecture.md).
  {
    rules: {
      "no-console": "error",
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "error",
    },
  },

  // Layer boundaries: dependencies point downwards only.
  {
    files: ["src/**/*.tsx", "src/**/*.astro/*.{js,ts}", "src/**/client/**"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        { patterns: [NO_SERVER_IMPORTS] },
      ],
    },
  },
  {
    files: ["src/components/ui/**"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            NO_SERVER_IMPORTS,
            {
              group: [
                "**/features/**",
                "**/views/**",
                "**/layouts/**",
                "**/pages/**",
              ],
              message:
                "UI components must not import features or routes (docs/architecture.md).",
            },
          ],
        },
      ],
    },
  },

  // Plain JavaScript (config files, scripts, Claude Code hooks) runs in Node
  // and is linted without type information.
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["scripts/**"],
    rules: { "no-console": "off" },
  },
);
