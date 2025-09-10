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
} from "@once-ui-system/core";
import { baseURL, about, person} from "@/resources";
import styles from "@/components/about/about.module.scss";
import React from "react";
import { Posts } from "@/components/blog/Posts";
import { blog } from "@/resources";


export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];

  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            position="sticky"
            top="64"
            s={{ position: "relative" }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}

        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          {/* Intro */}
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
          </Column>

         {/* Who are you */}
<Column marginBottom="32" gap="8">
  <Heading variant="heading-strong-l">Who are you?</Heading>
  <Text variant="body-default-m">
    I am a student pursuing degrees in both Computer Engineering and Data Science at the same
    time. I see myself as a curious, creative, and ambitious person, constantly seeking new
    opportunities to grow and expand my knowledge.
  </Text>
</Column>

{/* What do you like */}
<Column marginBottom="32" gap="8">
  <Heading variant="heading-strong-l">What do you like?</Heading>
  <Text variant="body-default-m">
    I have a deep love for mathematics and enjoy facing complex, challenging problems. I am
    fascinated by discovering patterns hidden in the world around us, and I thrive when working
    on projects that push me to think critically and creatively.
  </Text>
</Column>

{/* Hobbies */}
<Column marginBottom="32" gap="8">
  <Heading variant="heading-strong-l">Hobbies</Heading>
  <Text variant="body-default-m">
    Outside of academics, I enjoy playing video games, watching movies—being a true cinephile—,
    reading, listening to music, and exploring art in all its forms. These hobbies not only
    inspire me but also help me maintain balance and creativity in my daily life.
  </Text>
</Column>

        </Column>
      </Row>
    </Column>
  );
}
