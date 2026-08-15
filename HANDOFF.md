# Complete Project Handoff

**Project:** Discover — dark editorial discovery interface  
**Source repository:** `giovancarl444/candy-ai-site`  
**Current managed preview:** `https://candydisco-afzx5sns.manus.space`  
**Last application checkpoint before this transfer record:** `7fc2fac4`

## Portable Source Contents

The Git repository contains the complete editable source required to run and develop the frontend locally. This includes the React application in `client/`, the static-compatible Express entry point in `server/`, TypeScript and Vite configuration, package manifests and lockfile, and the project design records (`ideas.md` and `reference-notes.md`). A fresh environment can restore dependencies with `pnpm install`, run development with `pnpm dev`, and validate production output with `pnpm check && pnpm build`.

| Item | Transfer status | Recovery guidance |
| --- | --- | --- |
| React application source and CSS | Included in Git | Clone the repository and run `pnpm install`. |
| Package manifest and lockfile | Included in Git | Use the committed `pnpm-lock.yaml` for reproducible package resolution. |
| Vite and TypeScript configuration | Included in Git | No platform-specific replacement is required. |
| Design and reference notes | Included in Git | Review `ideas.md` before changing the visual system. |
| Local development scripts | Included in Git | Use the scripts in `package.json`. |

## Platform-Managed Items Not Stored in Git

The following dependencies cannot be meaningfully transferred as repository files because they are managed by the current application environment. Their references remain in source where applicable, but the backing resources require replacement or reconfiguration when moving to a separate host.

| Managed item | Why it is not part of the Git push | What to do if migrating |
| --- | --- | --- |
| `/manus-storage/` image URLs | These original visual assets are hosted by the current managed web application rather than inside the repository. | Download or regenerate equivalent assets, upload them to the destination host, then replace the corresponding URL strings in `client/src/pages/Home.tsx` and `client/src/index.css`. |
| Managed preview domain | The active `candydisco-afzx5sns.manus.space` domain is deployment configuration, not source code. | Configure a domain and hosting target at the chosen destination. |
| Application checkpoint `7fc2fac4` | A checkpoint records managed project history and is separate from the Git commit graph. | Use the Git commit history for source recovery; retain the checkpoint in the project management interface for platform rollback. |
| Auto-injected environment variables | Runtime analytics, OAuth, and platform configuration are supplied by the managed environment and are intentionally not committed. | Create destination-specific environment variables only if the selected hosting or analytics stack requires them. |
| Installed dependency directory, build output, and logs | `node_modules/`, `dist/`, and `.manus-logs/` are generated artifacts rather than hand-authored source. | Restore packages with `pnpm install` and rebuild with `pnpm build`; do not commit logs. |

## Asset Reference Index

The current interface uses three managed visual URLs. They are referenced in source as follows.

| Usage | Managed source path |
| --- | --- |
| Summer banner | `/manus-storage/summer-discovery-banner_4835f043.jpg` |
| Creator promotion card | `/manus-storage/creator-promo_8d3a9501.jpg` |
| Private room promotion card | `/manus-storage/private-room-promo_21967039.jpg` |
| Header brand symbol | `/manus-storage/discover-symbol_9d1479e3.png` |

## Verification Record

The application passed TypeScript validation and a production build before the handoff record was created. The desktop and mobile layouts were visually checked at 1280×720 and 375×812 respectively. The repository remains the portable source of truth; the managed platform keeps the deployment-specific image hosting, domain configuration, and checkpoint history.
