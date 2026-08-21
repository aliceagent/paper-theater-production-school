---
name: paper-theater-production-school
description: A tactile, evidence-led instructional publication for paper-cut Mandarin filmmaking.
colors:
  primary: "#17324A"
  secondary: "#335E72"
  accent: "#D35F48"
  background: "#F4EFE5"
  surface: "#FFFCF6"
  surface-raised: "#E7EEF0"
  text-primary: "#152A3A"
  text-secondary: "#596972"
  border: "#C8D2D2"
  success: "#2D7463"
  dark-background: "#0F1C25"
  dark-surface: "#172A35"
  dark-text: "#EAF0EE"
typography:
  heading:
    fontFamily: "Avenir Next, Ubuntu Sans, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 750
    lineHeight: 1.02
  body:
    fontFamily: "Avenir Next, Ubuntu Sans, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.65
  mono:
    fontFamily: "IBM Plex Mono, Ubuntu Mono, ui-monospace, monospace"
    fontSize: "0.8rem"
    lineHeight: 1.5
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
rounded:
  card: "18px"
  control: "10px"
  pill: "999px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  media-frame:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.card}"
    padding: "{spacing.sm}"
---

# Overview

The site should feel like a well-equipped studio bench: tactile, calm, exact, and full of evidence. It is an instructional publication, not a software landing page.

# Colors

Warm paper is paired with cool ink blue and one coral accent. Green is reserved for approved states. Dark mode preserves the same hierarchy with cool charcoal surfaces.

# Typography

Use a sturdy sans display and highly readable sans body. Chinese examples use the system CJK fallback. Technical metadata uses mono sparingly.

# Layout

Use an asymmetric hero, a sticky desktop lesson index, full-width media stages, progressive disclosure, and alternating editorial layouts. Mobile collapses to one column with an in-flow lesson menu.

# Elevation

Only media, floating navigation, and interactive controls receive shadows. Text content relies on spacing and hairlines.

# Shapes

Cards are softly rounded at 18px. Controls use 10px or full-pill geometry. No mixed decorative radius system.

# Components

Primary actions use ink blue. Secondary actions use paper white with a visible border. Media frames reserve aspect ratio before loading.

# Do's and Don'ts

- Do show real production evidence.
- Do explain why a gate exists before listing commands.
- Do use captions that state what changed.
- Do not use generic AI gradients, fake dashboards, or decorative statistics.
- Do not autoplay audio.
- Do not publish secrets, raw credentials, or unapproved future motion.
