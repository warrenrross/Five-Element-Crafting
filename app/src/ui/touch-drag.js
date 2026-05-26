/**
 * touch-drag.js
 *
 * Pointer-event based drag-and-drop that works on touch screens.
 * Coexists with native HTML5 drag-drop: when the OS supports it
 * (i.e. mouse), this layer stays out of the way by only kicking in
 * for pointerType === "touch" (and "pen" for stylus tablets).
 *
 * Usage:
 *
 *   makeTouchDraggable(sourceEl, {
 *     getPayload: () => ({ kind: "phase", id: "wood" }),
 *     makeGhost: () => sourceEl.cloneNode(true),
 *     onDragStart: () => sourceEl.classList.add("dragging"),
 *     onDragEnd:   () => sourceEl.classList.remove("dragging"),
 *     dispatch: (payload, { clientX, clientY, targetEl }) => { ... },
 *   });
 *
 * `dispatch` is called once on a successful release. The receiver
 * decides whether the targetEl is meaningful (a workspace entity,
 * a pathology token, the workspace background, or nothing).
 *
 * For touch users, we also support a long-press affordance so a
 * stationary touch picks up the drag without scrolling the page.
 */

const MOVE_THRESHOLD = 6;          // px before we consider it a drag
const LONG_PRESS_MS = 180;         // delay before drag arms on touch
const SCROLL_GUARD_MS = 80;        // after pointerdown, if no movement,
                                   // assume it's a tap, not a drag

let activeDrag = null;             // singleton — only one drag at a time

export function makeTouchDraggable(sourceEl, opts) {
  const {
    getPayload,
    makeGhost,
    onDragStart = () => {},
    onDragEnd = () => {},
    dispatch,
    touchOnly = true, // if false, also handles mouse — usually we let
                      // native HTML5 drag-drop own mouse, so default true.
  } = opts;

  sourceEl.addEventListener("pointerdown", (ev) => {
    // Mouse path is owned by native drag-drop; skip unless touchOnly=false.
    if (touchOnly && ev.pointerType === "mouse") return;
    if (activeDrag) return;
    if (ev.button !== undefined && ev.button !== 0) return;

    // Don't preventDefault yet — we want taps and scrolls to still work
    // until we know this is a drag.
    const startX = ev.clientX;
    const startY = ev.clientY;
    const startedAt = performance.now();
    let armed = false;
    let ghost = null;
    let lastTargetEl = null;
    let lastHighlightEl = null;

    // Long-press timer: if the user holds without moving, arm anyway.
    const longPressTimer = setTimeout(() => {
      if (!activeDrag) arm(startX, startY);
    }, LONG_PRESS_MS);

    function arm(x, y) {
      if (armed) return;
      armed = true;
      clearTimeout(longPressTimer);

      ghost = makeGhost ? makeGhost() : sourceEl.cloneNode(true);
      ghost.classList.add("touch-drag-ghost");
      // Inline styles so we don't rely on CSS being loaded.
      Object.assign(ghost.style, {
        position: "fixed",
        left: "0",
        top: "0",
        pointerEvents: "none",
        zIndex: "9999",
        opacity: "0.85",
        transform: `translate(${x - 36}px, ${y - 36}px)`,
        transition: "none",
      });
      document.body.appendChild(ghost);

      onDragStart();
      activeDrag = { sourceEl, ghost };

      // Prevent the page from scrolling while we drag.
      document.body.style.touchAction = "none";
    }

    function move(ev2) {
      if (!armed) {
        const dx = Math.abs(ev2.clientX - startX);
        const dy = Math.abs(ev2.clientY - startY);
        if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
          arm(ev2.clientX, ev2.clientY);
        } else if (performance.now() - startedAt < SCROLL_GUARD_MS) {
          return; // still in tap/scroll window
        }
        if (!armed) return;
      }

      ev2.preventDefault();
      ghost.style.transform = `translate(${ev2.clientX - 36}px, ${ev2.clientY - 36}px)`;

      // Find what's under the finger. Temporarily hide the ghost so
      // elementFromPoint returns the real target.
      ghost.style.visibility = "hidden";
      const under = document.elementFromPoint(ev2.clientX, ev2.clientY);
      ghost.style.visibility = "";

      const targetEl = resolveDropTarget(under);
      if (targetEl !== lastTargetEl) {
        if (lastHighlightEl) lastHighlightEl.classList.remove("drop-target");
        if (targetEl && targetEl !== sourceEl) {
          targetEl.classList.add("drop-target");
          lastHighlightEl = targetEl;
        } else {
          lastHighlightEl = null;
        }
        lastTargetEl = targetEl;
      }
    }

    function up(ev2) {
      clearTimeout(longPressTimer);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", cancel);

      if (!armed) {
        // Was a tap, not a drag — let the click handler do its thing.
        return;
      }

      if (ghost) ghost.remove();
      if (lastHighlightEl) lastHighlightEl.classList.remove("drop-target");
      document.body.style.touchAction = "";
      onDragEnd();
      activeDrag = null;

      // Determine the final drop target.
      let targetEl = lastTargetEl;
      if (!targetEl) {
        // Try once more at release point in case elementFromPoint hadn't
        // fired between the last move and the up.
        const under = document.elementFromPoint(ev2.clientX, ev2.clientY);
        targetEl = resolveDropTarget(under);
      }

      const payload = getPayload();
      dispatch(payload, {
        clientX: ev2.clientX,
        clientY: ev2.clientY,
        targetEl,
      });
    }

    function cancel() {
      clearTimeout(longPressTimer);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", cancel);
      if (ghost) ghost.remove();
      if (lastHighlightEl) lastHighlightEl.classList.remove("drop-target");
      document.body.style.touchAction = "";
      onDragEnd();
      activeDrag = null;
    }

    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", cancel);
  });
}

/**
 * Walk up from `el` to find the nearest meaningful drop target:
 *   - a .workspace-entity
 *   - a .pathology-token
 *   - the #workspace itself
 * Returns null if none of those are ancestors.
 */
function resolveDropTarget(el) {
  if (!el) return null;
  return (
    el.closest(".workspace-entity") ||
    el.closest(".pathology-token") ||
    el.closest("#workspace") ||
    null
  );
}
