import type { TIcon } from "../../../types";
import type { OverflowTab } from "../../useOverflowTabs";

export type Tab = OverflowTab & { icon: TIcon; label: string };
