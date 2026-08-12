import { type ComponentProps } from "solid-js"

export const Mark = (props: { class?: string }) => {
  return (
    <svg
      data-component="logo-mark"
      classList={{ [props.class ?? ""]: !!props.class }}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path data-slot="logo-logo-mark-shadow" d="M12 16H4V8H12V16Z" fill="var(--icon-weak-base)" />
      <path data-slot="logo-logo-mark-o" d="M12 4H4V16H12V4ZM16 20H0V0H16V20Z" fill="var(--icon-strong-base)" />
    </svg>
  )
}

export const Splash = (props: Pick<ComponentProps<"svg">, "ref" | "class">) => {
  return (
    <svg
      ref={props.ref}
      data-component="logo-splash"
      classList={{ [props.class ?? ""]: !!props.class }}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M60 80H20V40H60V80Z" fill="var(--icon-base)" />
      <path d="M60 20H20V80H60V20ZM80 100H0V0H80V100Z" fill="var(--icon-strong-base)" />
    </svg>
  )
}

export const Logo = (props: { class?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 498 42"
      fill="none"
      classList={{ [props.class ?? ""]: !!props.class }}
    >
      <g>
        {/* L */}
        <path d="M6 24h12v6H6z" fill="var(--icon-weak-base)" />
        <path d="M0 6h6v30H0z M6 30h18v6H6z" fill="var(--icon-base)" />
        {/* E */}
        <path d="M54 24v6H36v-6h18z" fill="var(--icon-weak-base)" />
        <path d="M54 24H36v6h18v6H30V6h24v18zm-18-6h12v-6H36v6z" fill="var(--icon-base)" />
        {/* N */}
        <path d="M78 36h-12V18h12v18z" fill="var(--icon-weak-base)" />
        <path d="M78 12H66v24h-6V6h18v6zm6 24h-6V12h6v24z" fill="var(--icon-base)" />
        {/* S */}
        <path d="M114 24v6h-18v-6h18z" fill="var(--icon-weak-base)" />
        <path d="M114 6v12h-18v6h18v12h-24v-6h18v-6h-18V6h24z" fill="var(--icon-base)" />
        {/* E */}
        <path d="M144 24v6h-18v-6h18z" fill="var(--icon-weak-base)" />
        <path d="M144 24h-18v6h18v6h-24V6h24v18zm-18-6h12v-6h-12v6z" fill="var(--icon-base)" />
        {/* T */}
        <path d="M168 24v6h-6v-6h6z" fill="var(--icon-weak-base)" />
        <path d="M174 6v6h-6v24h-6V12h-6V6h18z" fill="var(--icon-base)" />
        {/* E */}
        <path d="M204 24v6h-18v-6h18z" fill="var(--icon-weak-base)" />
        <path d="M204 24h-18v6h18v6h-24V6h24v18zm-18-6h12v-6h-12v6z" fill="var(--icon-base)" />
        {/* K */}
        <path d="M222 18v6h-6v-6h6z" fill="var(--icon-weak-base)" />
        <path d="M216 6h-6v30h6V24h6v12h6V24h-6v-6h6V6h-6v12h-6V6z" fill="var(--icon-base)" />
        {/* - */}
        <path d="M244 18h10v6h-10z" fill="var(--icon-base)" />
        {/* O */}
        <path d="M282 30h-12V18h12v12z" fill="var(--icon-weak-base)" />
        <path d="M282 12h-12v18h12V12zm6 24h-24V6h24v30z" fill="var(--icon-strong-base)" />
        {/* P */}
        <path d="M312 30h-12V18h12v12z" fill="var(--icon-weak-base)" />
        <path d="M312 12h-12v18h12V12zm6 24h-18v6h-6V6h24v30z" fill="var(--icon-strong-base)" />
        {/* E */}
        <path d="M348 24v6h-18v-6h18z" fill="var(--icon-weak-base)" />
        <path d="M348 24h-18v6h18v6h-24V6h24v18zm-18-6h12v-6h-12v6z" fill="var(--icon-strong-base)" />
        {/* N */}
        <path d="M372 36h-12V18h12v18z" fill="var(--icon-weak-base)" />
        <path d="M372 12h-12v24h-6V6h18v6zm6 24h-6V12h6v24z" fill="var(--icon-strong-base)" />
        {/* C */}
        <path d="M408 30h-18V18h18v12z" fill="var(--icon-weak-base)" />
        <path d="M408 12h-18v18h18v6h-24V6h24v6z" fill="var(--icon-strong-base)" />
        {/* O */}
        <path d="M438 30h-12V18h12v12z" fill="var(--icon-weak-base)" />
        <path d="M438 12h-12v18h12V12zm6 24h-24V6h24v30z" fill="var(--icon-strong-base)" />
        {/* D */}
        <path d="M468 30h-12V18h12v12z" fill="var(--icon-weak-base)" />
        <path d="M468 12h-12v18h12V12zm6 24h-24V6h18v-6h6v36z" fill="var(--icon-strong-base)" />
        {/* E */}
        <path d="M498 24v6h-18v-6h18z" fill="var(--icon-weak-base)" />
        <path d="M498 24h-18v6h18v6h-24V6h24v18zm-18-6h12v-6h-12v6z" fill="var(--icon-strong-base)" />
      </g>
    </svg>
  )
}
