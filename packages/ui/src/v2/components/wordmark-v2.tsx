import { createUniqueId, type ComponentProps } from "solid-js"

export function WordmarkV2(props: Pick<ComponentProps<"svg">, "class">) {
  const mask = createUniqueId()
  const maskGradient = createUniqueId()

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1551 129"
      fill="none"
      classList={{ [props.class ?? ""]: !!props.class }}
    >
      <g opacity="0.6">
        <g mask={`url(#${mask})`}>
          <g opacity="0.16">
            {/* L */}
            <path opacity="0.7" d="M18.4615 73.2857H55.3846V91.7143H18.4615V73.2857ZM73.8462 110.143H0V18H18.4615V91.7143H73.8462V110.143Z" fill="currentColor" />
            {/* E */}
            <path opacity="0.7" d="M166.1539 73.2857H110.7692V91.7143H166.1539V110.143H92.3077V18H166.1539V36.4286H110.7692V54.8571H147.6923V73.2857Z" fill="currentColor" />
            {/* N */}
            <path opacity="0.7" d="M203.0769 36.4286H240V110.143H258.4616V18H184.6154V110.143H203.0769V36.4286Z" fill="currentColor" />
            {/* S */}
            <path opacity="0.7" d="M350.7693 18V54.8571H295.3846V73.2857H350.7693V110.143H276.9231V73.2857H332.3077V54.8571H276.9231V18H350.7693Z" fill="currentColor" />
            {/* E */}
            <path opacity="0.7" d="M443.077 73.2857H387.6923V91.7143H443.077V110.143H369.2308V18H443.077V36.4286H387.6923V54.8571H424.6154V73.2857Z" fill="currentColor" />
            {/* T */}
            <path opacity="0.7" d="M535.3847 18V36.4286H507.6923V110.143H489.2308V36.4286H461.5385V18H535.3847Z" fill="currentColor" />
            {/* E */}
            <path opacity="0.7" d="M627.6924 73.2857H572.3077V91.7143H627.6924V110.143H553.8462V18H627.6924V36.4286H572.3077V54.8571H609.2308V73.2857Z" fill="currentColor" />
            {/* K */}
            <path opacity="0.7" d="M646.1538 18H664.6153V54.8571H683.0769V18H701.5384V54.8571H683.0769V73.2857H720V110.143H701.5384V73.2857H664.6153V110.143H646.1538V18Z" fill="currentColor" />
            {/* - */}
            <path opacity="0.7" d="M756.923 54.8571H793.8461V73.2857H756.923V54.8571Z" fill="currentColor" />
            {/* O */}
            <path opacity="0.7" d="M886.1538 36.4286H849.2307V91.7143H886.1538V36.4286ZM904.6154 110.143H830.7692V18H904.6154V110.143Z" fill="currentColor" />
            {/* P */}
            <path opacity="0.7" d="M941.5384 91.7143H978.4615V36.4286H941.5384V91.7143ZM996.9231 110.143H941.5384V128.571H923.0769V18H996.9231V110.143Z" fill="currentColor" />
            {/* E */}
            <path opacity="0.7" d="M1089.2308 73.2857H1033.8461V91.7143H1089.2308V110.143H1015.3846V18H1089.2308V36.4286H1033.8461V54.8571H1070.7692V73.2857Z" fill="currentColor" />
            {/* N */}
            <path opacity="0.7" d="M1163.0769 36.4286H1200V110.143H1218.4615V18H1144.6153V110.143H1163.0769V36.4286Z" fill="currentColor" />
            {/* C */}
            <path opacity="0.7" d="M1273.8462 36.4286H1218.4615V91.7143H1273.8462V110.143H1200V18H1273.8462V36.4286Z" fill="currentColor" />
            {/* O */}
            <path opacity="0.7" d="M1347.6923 36.4286H1310.7692V91.7143H1347.6923V36.4286ZM1366.1538 110.143H1292.3077V18H1366.1538V110.143Z" fill="currentColor" />
            {/* D */}
            <path opacity="0.7" d="M1440 36.8571H1403.0769V92.1429H1440V36.8571ZM1458.4615 110.571H1384.6154V18.4286H1440V0H1458.4615V110.571Z" fill="currentColor" />
            {/* E */}
            <path opacity="0.7" d="M1550.7692 73.2857H1495.3846V91.7143H1550.7692V110.143H1476.9231V18H1550.7692V36.4286H1495.3846V54.8571H1532.3077V73.2857Z" fill="currentColor" />
          </g>
        </g>
      </g>
      <defs>
        <mask id={mask} style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="1551" height="129">
          <rect width="1551" height="129" fill={`url(#${maskGradient})`} />
        </mask>
        <linearGradient id={maskGradient} x1="775" y1="68" x2="775" y2="129" gradientUnits="userSpaceOnUse">
          <stop stop-color="white" stop-opacity="0.7" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
