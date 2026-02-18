# Contributing to scanskill

Thanks for helping improve AI code understanding across projects.

The goal of scanskill is simple:

> Provide clear behavioral instructions to coding agents.

Keep contributions minimal, predictable, and framework-accurate.

---

## Adding support for a new framework

1. Create a template
   `src/templates/<framework>.md`

2. Add detection logic
   `src/detectors/frameworkDetector.ts`

3. Add mapping
   `src/generators/writeSkills.ts`

4. Build and test

```bash
npm run build
```

Then test inside a real project using:

```bash
npx ../scanskill-*.tgz
```

---

## Template rules

Templates are NOT tutorials.

They must:

- be concise
- be declarative
- describe behavior, not explanation
- avoid teaching basics
- focus on code generation guidance

Good:

> Prefer server components unless interactivity required

Bad:

> Server components are a feature introduced in Next.js 13...

---

## Style guidelines

- No emojis
- No marketing text
- No personal opinions
- No long paragraphs
- Use bullet rules
- Keep under ~120 lines

---

## What not to add

- setup instructions
- installation steps
- learning resources
- external links
- opinions about libraries

The file exists for machines, not humans.

---

## Reporting issues

Please include:

- framework
- expected behavior
- generated behavior
- minimal reproduction project

---

## Development

```bash
npm install
npm run build
```

The build copies templates into `dist/`.

---

## Philosophy

A good template should make AI output correct on the **first generation** without additional prompting.
