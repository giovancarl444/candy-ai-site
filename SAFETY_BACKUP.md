# Git Safety Backup

## Approved Design Baseline

The approved design baseline is retained as both an annotated Git tag and a dedicated remote backup branch. The paired references protect the completed source, handoff documentation, and visual specification before the next round of design changes.

| Reference type | Name | Purpose |
| --- | --- | --- |
| Annotated tag | `design-baseline-2026-08-15` | A named, stable marker for the approved source state. |
| Remote backup branch | `backup/design-baseline-2026-08-15` | A readily discoverable recovery branch that mirrors the tag target. |

## Interactive Release Backup

The completed interactive and mobile-refinement release is protected independently from the earlier design-only baseline. It retains the promotion controls, local search and filters, saved profile states, detail drawer, activity feedback, and mobile dock navigation as a complete recovery point.

| Reference type | Name | Purpose |
| --- | --- | --- |
| Annotated tag | `interactive-release-2026-08-15` | A stable marker for the completed interactive release. |
| Remote backup branch | `backup/interactive-release-2026-08-15` | A discoverable recovery branch that mirrors the interactive-release tag target. |

## Safe Recovery Methods

For a **single unwanted change**, use `git revert <commit>` on the active development branch. This creates a new inverse commit and preserves shared history.

For a **design experiment that needs review without touching the active branch**, create a comparison branch from the baseline:

```bash
git fetch origin --tags
git switch -c review/design-baseline design-baseline-2026-08-15
```

For a **full source recovery**, create a new branch from the safety baseline, review it, then merge or deploy that branch through the normal workflow:

```bash
git fetch origin --tags
git switch -c restore/interactive-release interactive-release-2026-08-15
```

For the managed preview, pair source recovery with the project management interface's checkpoint rollback when a full deployed rollback is required. Avoid destructive history rewrites; this project’s recovery flow relies on additive reverts, recovery branches, and managed checkpoints.
