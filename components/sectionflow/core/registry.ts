'use client';

import type { TransitionComponent, TransitionResolver } from './types';
import { CardStack } from '../transitions/card-stack';
import { WaveReveal } from '../transitions/wave-reveal';
import { CircularPortal } from '../transitions/circular-portal';
import { SpotlightReveal } from '../transitions/spotlight-reveal';

/* ──────────────────────────────────────────────────────────────────────────
 * v2 transition registry
 *
 * Maps a string slug to a TransitionComponent implementing the v2 handle
 * contract. `<Section transition="circular-portal" />` resolves through here.
 * A transition passed directly as a component (`transition={CircularPortal}`)
 * bypasses the lookup.
 *
 * Every entry implements the v2 handle contract: it writes MotionValues into
 * the `outgoing` / `incoming` layer handles it receives (and optionally
 * returns an effect overlay). No transition owns, clones, or renders section
 * content.
 *
 * Per-transition viewing phase: a component may attach a static `timing` field
 * ({ rest?, duration? }) to lengthen or shorten its reading/animation windows
 * for that edge only. The stage honours it via the per-edge timing table.
 * ──────────────────────────────────────────────────────────────────────── */

// ── Mask reveal ────────────────────────────────────────────────────────────

// ── Split & fragment ───────────────────────────────────────────────────────
// ── 3D / perspective ───────────────────────────────────────────────────────

// ── Scroll ─────────────────────────────────────────────────────────────────

// ── Particles / premium ────────────────────────────────────────────────────

/**
 * Viewing-phase profiles. Mask reveals and content-heavy handoffs benefit from
 * a longer reading window so the outgoing section is fully legible before the
 * effect begins; quick slides can use a shorter one. Attached via the static
 * `timing` field the stage reads per edge.
 */
const LONG_HOLD = { rest: 160 } as const;
const SHORT_HOLD = { rest: 60 } as const;

(CircularPortal as TransitionComponent).timing = LONG_HOLD;

(SpotlightReveal as TransitionComponent).timing = LONG_HOLD;

export const transitionRegistry: Record<string, TransitionComponent> = {
  'spotlight-reveal': SpotlightReveal,
  'circular-portal': CircularPortal,
  'wave-reveal': WaveReveal,
  'card-stack': CardStack,
};

/** Resolve a TransitionResolver (string slug or component) to a component. */
export function resolveTransition(
  resolver: TransitionResolver,
): TransitionComponent | null {
  if (typeof resolver === 'string') {
    return transitionRegistry[resolver] ?? null;
  }
  return resolver;
}
