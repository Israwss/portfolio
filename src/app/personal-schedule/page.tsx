import React from "react";
import {
  Column,
  Row,
  Heading,
  Text,
  Tag,
  Line,
} from "@once-ui-system/core";

// ===== CONFIG =====
const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LABEL: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
};

const DAY_START_MIN = 7 * 60;
const DAY_END_MIN = 21 * 60;

const COLORS = [
  "#3B82F6",
  "#F59E0B",
  "#10B981",
  "#EF4444",
  "#8B5CF6",
  "#14B8A6",
  "#F472B6",
  "#06B6D4",
  "#84CC16",
];

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const colorFor = (title: string) => {
  let h = 0;
  for (let i = 0; i < title.length; i++) h = (h * 31 + title.charCodeAt(i)) >>> 0;
  return COLORS[h % COLORS.length];
};

type RawEvent = {
  title: string;
  days: Array<typeof DAY_ORDER[number]>;
  start: string;
  end: string;
  group?: string;
};

const RAW: RawEvent[] = [
  { title: "Administración de Proyectos TIC", days: ["Mon", "Wed"], start: "19:00", end: "21:00", group: "FI" },
  { title: "Administración de Servicios de Internet", days: ["Tue", "Thu"], start: "07:00", end: "09:00", group: "FI" },
  { title: "Computación Gráfica e IHC", days: ["Tue", "Thu"], start: "13:00", end: "15:00", group: "FI" },
  { title: "Lab. Computación Gráfica e IHC", days: ["Tue"], start: "15:00", end: "17:00", group: "FI" },
  { title: "Fundamentos de Sistemas Embebidos", days: ["Wed", "Fri"], start: "11:30", end: "13:00", group: "FI" },
  { title: "Fund. de Sistemas Embebidos (extra)", days: ["Mon"], start: "11:00", end: "13:00", group: "FI" },
  { title: "Org. y Arq. de Computadoras (Lab)", days: ["Sat"], start: "07:00", end: "09:00", group: "FI" },
  { title: "Org. y Arq. de Computadoras", days: ["Sat"], start: "10:00", end: "13:00", group: "FI" },
  { title: "Redes de Datos Seguras", days: ["Mon", "Tue", "Thu"], start: "17:00", end: "19:00", group: "FI" },
  { title: "Análisis multivariado y modelos lineales", days: ["Tue", "Thu"], start: "08:00", end: "09:30", group: "CD" },
  { title: "Análisis multivariado y modelos lineales", days: ["Fri"], start: "09:00", end: "11:00", group: "CD" },
  { title: "Aprendizaje de máquinas", days: ["Tue"], start: "11:30", end: "13:30", group: "CD" },
  { title: "Aprendizaje de máquinas", days: ["Thu"], start: "12:00", end: "13:00", group: "CD" },
  { title: "Aprendizaje de máquinas", days: ["Fri"], start: "11:00", end: "13:00", group: "CD" },
  { title: "Datos masivos II", days: ["Mon", "Wed"], start: "09:30", end: "11:00", group: "CD" },
  { title: "Datos masivos II", days: ["Thu"], start: "10:00", end: "12:00", group: "CD" },
  { title: "Intro a finanzas y empresa", days: ["Mon"], start: "07:00", end: "09:00", group: "CD" },
  { title: "Intro a finanzas y empresa", days: ["Wed"], start: "07:00", end: "09:00", group: "CD" },
  { title: "Intro a finanzas y empresa", days: ["Fri"], start: "08:00", end: "09:00", group: "CD" },
  { title: "Minería de datos", days: ["Tue", "Thu"], start: "13:30", end: "16:00", group: "CD" },
  { title: "Procesamiento de lenguaje natural", days: ["Mon"], start: "11:00", end: "13:00", group: "CD" },
  { title: "Procesamiento de lenguaje natural", days: ["Wed"], start: "11:00", end: "14:00", group: "CD" },
];

type DayEvent = {
  id: string;
  title: string;
  day: typeof DAY_ORDER[number];
  startMin: number;
  endMin: number;
  color: string;
  group?: string;
  col?: number;
  colCount?: number;
};

const expandEvents = (raw: RawEvent[]): DayEvent[] => {
  const list: DayEvent[] = [];
  raw.forEach((r, idx) => {
    const color = colorFor(r.title);
    r.days.forEach((d) => {
      list.push({
        id: `${idx}-${d}-${r.start}`,
        title: r.title,
        day: d,
        startMin: toMin(r.start),
        endMin: toMin(r.end),
        color,
        group: r.group,
      });
    });
  });
  return list;
};

const layoutDay = (events: DayEvent[]): DayEvent[] => {
  const sorted = [...events].sort((a, b) => a.startMin - b.startMin || (b.endMin - a.startMin) - (a.endMin - a.startMin));
  type Cluster = { events: DayEvent[]; maxEnd: number };
  const clusters: Cluster[] = [];

  for (const ev of sorted) {
    let cluster = clusters.find((c) => ev.startMin < c.maxEnd);
    if (!cluster) {
      cluster = { events: [], maxEnd: ev.endMin };
      clusters.push(cluster);
    }
    cluster.events.push(ev);
    cluster.maxEnd = Math.max(cluster.maxEnd, ev.endMin);
  }

  for (const c of clusters) {
    const colEnds: number[] = [];
    for (const ev of c.events) {
      let assigned = false;
      for (let col = 0; col < colEnds.length; col++) {
        if (ev.startMin >= colEnds[col]) {
          ev.col = col;
          colEnds[col] = ev.endMin;
          assigned = true;
          break;
        }
      }
      if (!assigned) {
        ev.col = colEnds.length;
        colEnds.push(ev.endMin);
      }
      ev.colCount = colEnds.length;
    }
  }
  return sorted;
};

const useWeekLayout = (raw: RawEvent[]) => {
  const expanded = expandEvents(raw);
  const byDay: Record<string, DayEvent[]> = Object.fromEntries(DAY_ORDER.map((d) => [d, [] as DayEvent[]]));
  expanded.forEach((e) => byDay[e.day].push(e));
  DAY_ORDER.forEach((d) => (byDay[d] = layoutDay(byDay[d])));
  return byDay;
};

const DayColumn: React.FC<{ day: string; events: DayEvent[] }> = ({ day, events }) => {
  const rangeMin = DAY_END_MIN - DAY_START_MIN;
  return (
    <Column style={{ position: "relative", borderLeft: "1px solid var(--oc-neutral-200)", background: "var(--oc-neutral-50)", flex: 1 }}>
      <Row horizontal="center" paddingY="8" style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--oc-neutral-50)" }}>
        <Text variant="label-strong-m">{DAY_LABEL[day]}</Text>
      </Row>
      <div style={{ position: "relative", flex: 1, minHeight: 800 }}>
        {events.map((ev) => {
          const topPct = ((ev.startMin - DAY_START_MIN) / rangeMin) * 100;
          const heightPct = ((ev.endMin - ev.startMin) / rangeMin) * 100;
          const colCount = ev.colCount ?? 1;
          const col = ev.col ?? 0;
          const gap = 4;
          const widthPct = 100 / colCount;
          const leftPct = widthPct * col;
          return (
            <div
              key={ev.id}
              style={{
                position: "absolute",
                top: `${topPct}%`,
                left: `calc(${leftPct}% + ${gap / 2}px)`,
                width: `calc(${widthPct}% - ${gap}px)`,
                height: `${heightPct}%`,
                background: ev.color,
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                padding: 6,
                color: "white",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {ev.title}
            </div>
          );
        })}
      </div>
    </Column>
  );
};

const TimeColumn: React.FC = () => {
  const labels: string[] = [];
  for (let t = DAY_START_MIN; t <= DAY_END_MIN; t += 60) {
    labels.push(`${String(Math.floor(t / 60)).padStart(2, "0")}:00`);
  }
  return (
    <Column style={{ width: 60, alignItems: "flex-end", paddingRight: 4 }}>
      {labels.map((lbl) => (
        <Text key={lbl} variant="label-default-s" style={{ height: 60, marginBottom: 60 }}>
          {lbl}
        </Text>
      ))}
    </Column>
  );
};

export default function PersonalSchedulePage() {
  const byDay = useWeekLayout(RAW);

  return (
    <Column maxWidth="xl" paddingTop="24" gap="24" style={{ margin: "0 auto" }}>
      <Heading variant="display-strong-m" align="center">Personal Schedule</Heading>
      <Text onBackground="neutral-weak" align="center">
        Weekly view (Mon–Sat). Overlapping classes are displayed side‑by‑side.
      </Text>
      <Line />
      <Row style={{ alignItems: "stretch", justifyContent: "center" }} gap="0">
        <TimeColumn />
        <Row fillWidth gap="8" style={{ alignItems: "stretch", maxWidth: "1000px" }}>
          {DAY_ORDER.map((d) => (
            <DayColumn key={d} day={d} events={byDay[d]} />
          ))}
        </Row>
      </Row>
    </Column>
  );
}
