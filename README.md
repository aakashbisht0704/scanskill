# scanskill

Generate a `SKILL.md` file that teaches AI coding agents how to behave correctly inside your project.

AI editors often write _technically valid but context-wrong_ code — wrong patterns, wrong architecture, wrong conventions.

**scanskill fixes that in one command.**

It detects your project framework and injects structured behavioral rules that AI tools understand.

---

## Why this exists

Modern AI IDEs rely on repository context.

Without explicit instructions, the AI:

- mixes client/server logic
- ignores framework conventions
- writes anti-pattern code
- hallucinates structure

`scanskill` adds a `SKILL.md` so the agent understands _how this project wants code written_.

Think of it as onboarding documentation — but for AI.

---

## Usage

Run inside any project:

```bash
npx scanskill
```

That’s it.

A `SKILL.md` file will be created in the project root.

---

## Supported frameworks

- Next.js
- React
- React Native / Expo
- Flutter

More coming soon.

---

## What the file does

The generated `SKILL.md` contains:

- architecture rules
- coding conventions
- framework constraints
- preferred patterns
- things the AI must avoid

It does **not** teach the framework.
It defines how code should be written in _this repo_.

---

## Compatible with

Works with AI editors and agents that read repository context files, including:

- Cursor
- VS Code AI extensions
- Antigravity-style agents
- CLI coding agents

---

## Example workflow

Before:

> AI writes generic framework code

After:

> AI writes code matching project conventions immediately

No prompting needed.

---

## Roadmap

- More frameworks
- Configurable templates
- Multi-IDE profiles
- Custom project overrides

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## License

MIT
