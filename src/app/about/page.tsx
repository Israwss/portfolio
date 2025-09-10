import React from "react";
import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
  Line,
} from "@once-ui-system/core";
import { baseURL } from "@/resources";

// ===== CV DATA (derived from your resume) =====
const CV = {
  name: "Israel Martínez Jiménez",
  role: "Computer Engineering & Data Science Student",
  email: "israel.martinez12w@gmail.com",
  phone: "+52 55 48 87 67 35",
  location: "Mexico City, MX",
  avatar: "/images/avatar.jpg", // optional; replace if you have one
  about:
    "I am passionate about technology and innovation. I continuously learn and explore new advances while building practical solutions across automation, data analysis, and artificial intelligence. My academic path and hands‑on projects have given me a solid foundation to contribute to cutting‑edge, data‑driven products.",
  education: [
    {
      title: "B.S. in Data Science",
      place: "IIMAS, UNAM",
      timeframe: "Expected Jun 2026",
    },
    {
      title: "B.S. in Computer Engineering",
      place: "FI, UNAM",
      timeframe: "Expected Nov 2025",
    },
    {
      title: "Data Scientist C2",
      place: "Santander Scholarships",
      timeframe: "Certificate",
    },
    {
      title: "Macro AI Training",
      place: "Red de Macro Universidades de América Latina y el Caribe",
      timeframe: "Program",
    },
  ],
  certifications: [
    "Python Institute – PCAP",
    "Google Data Analytics",
    "Smartsheet Product Certification",
    "MongoDB Developer",
  ],
  languages: ["Spanish (Native)", "English (Advanced)"],
  experience: [
    {
      company: "HSBC",
      role: "Data Scientist Intern",
      timeframe: "Aug 2024 – Present",
      bullets: [
        "Support data gathering, cleaning, and analysis for detection of suspicious activity (fraud & AML).",
        "Contribute to ML models for anomaly detection and analytics reporting.",
        "Collaborate with compliance teams on customer profiling, process automation, and monitoring under KYC/AML frameworks.",
      ],
    },
    {
      company: "Grupo Salinas",
      role: "Data Analyst Intern",
      timeframe: "Nov 2023 – Jul 2024",
      bullets: [
        "Designed and maintained dashboards for decision‑making across key business areas.",
        "Analyzed and validated multiple data layers/cubes; identified trends and patterns in large data flows.",
        "Solved business questions using data‑driven techniques and clear communication.",
      ],
    },
    {
      company: "Vantisoft",
      role: "Automation Engineer Intern",
      timeframe: "Jun 2022 – Oct 2023",
      bullets: [
        "Wrote and tested scripts in Python, Bash, and PowerShell to automate repetitive processes.",
        "Created detailed documentation: runbooks, troubleshooting tips, and best practices.",
        "Executed tests to validate automated solutions against requirements and standards.",
      ],
    },
  ],
  skills: [
    {
      title: "Programming & Data",
      tags: ["Python", "SQL", "Linux", "Git", "Docker"],
    },
    {
      title: "Python Libraries",
      tags: [
        "NumPy",
        "Pandas",
        "Polars",
        "PySpark",
        "scikit‑learn",
        "TensorFlow",
        "PyTorch",
        "spaCy",
        "NLTK",
        "Transformers",
      ],
    },
    {
      title: "Data Visualization",
      tags: ["Power BI", "Tableau", "Matplotlib", "Seaborn", "Plotly"],
    },
    {
      title: "Databases",
      tags: ["MongoDB", "PostgreSQL", "MySQL", "BigQuery"],
    },
    {
      title: "Productivity",
      tags: ["Excel (Advanced)", "Smartsheet"],
    },
  ],
};

// ===== Metadata =====
export async function generateMetadata() {
  return Meta.generate({
    title: `${CV.name} – CV`,
    description: `${CV.role} | ${CV.location}`,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(CV.name + " – CV")}`,
    path: "/cv",
  });
}

// Small pill component
const Pill: React.FC<{ icon: string; children: React.ReactNode; href?: string }> = ({ icon, children, href }) => (
  <Row
    background="neutral-alpha-weak"
    border="neutral-medium"
    radius="full"
    padding="6"
    gap="8"
    vertical="center"
    as={href ? ("a" as any) : ("div" as any)}
    href={href}
    style={{ textDecoration: "none" }}
  >
    <Icon name={icon} />
    <Text variant="label-default-m">{children}</Text>
  </Row>
);

// ===== Page =====
export default function CVPage() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={`${CV.name} – CV`}
        description={`${CV.role} | ${CV.location}`}
        path="/cv"
        image={`/api/og/generate?title=${encodeURIComponent(CV.name + " – CV")}`}
        author={{ name: CV.name, url: `${baseURL}/cv`, image: CV.avatar }}
      />

      {/* Header */}
      <Column gap="8" align="center" horizontal="center">
        <Avatar size="xl" src={CV.avatar} />
        <Heading variant="display-strong-l" align="center">{CV.name}</Heading>
        <Text variant="display-default-xs" onBackground="neutral-weak" align="center">
          {CV.role}
        </Text>
        <Row gap="8" wrap horizontal="center" paddingTop="8">
          <Pill icon="mail" href={`mailto:${CV.email}`}>{CV.email}</Pill>
          <Pill icon="phone" href={`tel:${CV.phone.replace(/\s|-/g, "")}`}>{CV.phone}</Pill>
          <Pill icon="globe" >{CV.location}</Pill>
        </Row>
      </Column>

      <Line />

      {/* About */}
      <Column gap="8">
        <Heading variant="heading-strong-l">About me</Heading>
        <Text variant="body-default-m">{CV.about}</Text>
      </Column>

      {/* Education */}
      <Column gap="12">
        <Heading variant="heading-strong-l">Education</Heading>
        <Column gap="12">
          {CV.education.map((e, i) => (
            <Row key={i} fillWidth horizontal="between">
              <Column>
                <Text variant="label-strong-m">{e.title}</Text>
                <Text onBackground="neutral-weak">{e.place}</Text>
              </Column>
              <Text onBackground="neutral-weak">{e.timeframe}</Text>
            </Row>
          ))}
        </Column>
      </Column>

      {/* Certifications */}
      <Column gap="12">
        <Heading variant="heading-strong-l">Certifications</Heading>
        <Column as="ul" gap="8">
          {CV.certifications.map((c, i) => (
            <Text as="li" key={i} variant="body-default-m">{c}</Text>
          ))}
        </Column>
      </Column>

      {/* Languages */}
      <Column gap="8">
        <Heading variant="heading-strong-l">Languages</Heading>
        <Row wrap gap="8">
          {CV.languages.map((l, i) => (
            <Tag key={i} size="l">{l}</Tag>
          ))}
        </Row>
      </Column>

      {/* Experience */}
      <Column gap="16">
        <Heading variant="heading-strong-l">Experience</Heading>
        <Column gap="24">
          {CV.experience.map((x, i) => (
            <Column key={i} gap="8" fillWidth>
              <Row fillWidth horizontal="between" vertical="end">
                <Text variant="heading-strong-m">{x.company}</Text>
                <Text onBackground="neutral-weak">{x.timeframe}</Text>
              </Row>
              <Text variant="label-default-m" onBackground="brand-weak">{x.role}</Text>
              <Column as="ul" gap="8">
                {x.bullets.map((b, j) => (
                  <Text as="li" key={j} variant="body-default-m">{b}</Text>
                ))}
              </Column>
            </Column>
          ))}
        </Column>
      </Column>

      {/* Skills */}
      <Column gap="16">
        <Heading variant="heading-strong-l">Skills</Heading>
        <Column gap="24">
          {CV.skills.map((s, i) => (
            <Column key={i} gap="8">
              <Text variant="label-strong-m">{s.title}</Text>
              <Row wrap gap="8">
                {s.tags.map((t, j) => (
                  <Tag key={`${i}-${j}`} size="l">{t}</Tag>
                ))}
              </Row>
            </Column>
          ))}
        </Column>
      </Column>

      <Line />

      <Text onBackground="neutral-weak" align="center">
        Last updated: {new Date().toLocaleDateString()}
      </Text>
    </Column>
  );
}
